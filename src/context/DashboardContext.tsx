import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  Language, 
  MaterialRate, 
  MaterialCategory,
  LotItem, 
  ReliabilityMetrics, 
  FacilityProfile, 
  ZoneData, 
  ActivityLogItem 
} from '../types/dashboard';
import { 
  initialFacility, 
  initialMaterials, 
  initialLots, 
  initialReliability, 
  zoneBreakdown, 
  initialActivityLog 
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface DashboardContextType {
  // Lang & System
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  pendingSyncCount: number;
  syncOfflineData: () => void;
  
  // Navigation & Active View
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Data
  facility: FacilityProfile;
  updateFacility: (updates: Partial<FacilityProfile>) => void;
  materials: MaterialRate[];
  updateMaterialRate: (id: MaterialCategory, newRate: number) => void;
  lots: LotItem[];
  activityLog: ActivityLogItem[];
  reliability: ReliabilityMetrics;
  updateReliabilityMetrics: (updates: Partial<ReliabilityMetrics>) => void;
  zones: ZoneData[];
  
  // Computed Metrics
  computedReliabilityScore: number; // 0..1
  computedTier: 'Tier A' | 'Tier B+' | 'Tier B' | 'Tier C';
  computedAdvancePct: number; // 0..1
  activeAnomalyCount: number;
  totalPaidOut: number;
  pendingSettlementTotal: number;
  lotsReceivedCount: number;
  
  // Actions
  confirmHandover: (lotId: string, receivedWeight: number, isAnomalyAcknowledged?: boolean) => boolean;
  resolveAnomaly: (lotId: string, action: 'confirm_variance' | 'dispute') => void;
  selectedLotForCert: LotItem | null;
  setSelectedLotForCert: (lot: LotItem | null) => void;
  selectedLotForHandover: LotItem | null;
  setSelectedLotForHandover: (lot: LotItem | null) => void;
  activeFormulaModal: string | null;
  setActiveFormulaModal: (formulaId: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Formulas Helpers
  calculateRateScore: (offered: number, fair: number) => number;
  calculateProximityScore: (distanceKm: number, radiusKm: number) => number;
  calculateMatchScore: (
    rateScore: number, 
    relScore: number, 
    proxScore: number, 
    authScore: number
  ) => number;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  const [facility, setFacility] = useState<FacilityProfile>(() => {
    const saved = localStorage.getItem('sih_facility');
    return saved ? JSON.parse(saved) : initialFacility;
  });
  
  const [materials, setMaterials] = useState<MaterialRate[]>(() => {
    const saved = localStorage.getItem('sih_materials');
    return saved ? JSON.parse(saved) : initialMaterials;
  });
  
  const [lots, setLots] = useState<LotItem[]>(() => {
    const saved = localStorage.getItem('sih_lots');
    return saved ? JSON.parse(saved) : initialLots;
  });
  
  const [reliability, setReliability] = useState<ReliabilityMetrics>(() => {
    const saved = localStorage.getItem('sih_reliability');
    return saved ? JSON.parse(saved) : initialReliability;
  });
  
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>(() => {
    const saved = localStorage.getItem('sih_activity');
    return saved ? JSON.parse(saved) : initialActivityLog;
  });
  
  const [zones] = useState<ZoneData[]>(zoneBreakdown);
  
  const [selectedLotForCert, setSelectedLotForCert] = useState<LotItem | null>(null);
  const [selectedLotForHandover, setSelectedLotForHandover] = useState<LotItem | null>(null);
  const [activeFormulaModal, setActiveFormulaModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Translations
  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('sih_facility', JSON.stringify(facility));
  }, [facility]);

  useEffect(() => {
    localStorage.setItem('sih_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('sih_lots', JSON.stringify(lots));
  }, [lots]);

  useEffect(() => {
    localStorage.setItem('sih_reliability', JSON.stringify(reliability));
  }, [reliability]);

  useEffect(() => {
    localStorage.setItem('sih_activity', JSON.stringify(activityLog));
  }, [activityLog]);

  // FORMULA 1: Settlement Speed Score = max(0, 1 - avg_settlement_hours/48)
  const settlementSpeedScore = useMemo(() => {
    return Math.max(0, 1 - (reliability.avg_settlement_hours / 48));
  }, [reliability.avg_settlement_hours]);

  // FORMULA 2: Composite Reliability Score = 0.40*on_time + 0.35*honored + 0.15*(1-dispute) + 0.10*speed
  const computedReliabilityScore = useMemo(() => {
    const score = (0.40 * reliability.on_time_rate) +
                  (0.35 * reliability.honored_rate) +
                  (0.15 * (1 - reliability.dispute_rate)) +
                  (0.10 * settlementSpeedScore);
    return Math.min(1, Math.max(0, Number(score.toFixed(4))));
  }, [reliability, settlementSpeedScore]);

  // FORMULA 3: Reliability Tier
  const computedTier = useMemo((): 'Tier A' | 'Tier B+' | 'Tier B' | 'Tier C' => {
    if (computedReliabilityScore >= 0.90) return 'Tier A';
    if (computedReliabilityScore >= 0.80) return 'Tier B+';
    if (computedReliabilityScore >= 0.65) return 'Tier B';
    return 'Tier C';
  }, [computedReliabilityScore]);

  // FORMULA 4: Advance %
  const computedAdvancePct = useMemo((): number => {
    if (computedReliabilityScore >= 0.90) return 0.90;
    if (computedReliabilityScore >= 0.80) return 0.80;
    if (computedReliabilityScore >= 0.65) return 0.60;
    return 0.40;
  }, [computedReliabilityScore]);

  // Rate Score formula: min(1, offered_rate / fair_price)
  const calculateRateScore = (offered: number, fair: number): number => {
    if (fair <= 0) return 1;
    return Math.min(1, Math.max(0, offered / fair));
  };

  // Proximity Score formula: max(0, 1 - distance_km / service_radius_km)
  const calculateProximityScore = (distanceKm: number, radiusKm: number): number => {
    if (radiusKm <= 0) return 0;
    return Math.max(0, 1 - (distanceKm / radiusKm));
  };

  // Overall Match Score formula: 0.35*rate + 0.30*rel + 0.25*prox + 0.10*auth
  const calculateMatchScore = (
    rateScore: number, 
    relScore: number, 
    proxScore: number, 
    authScore: number
  ): number => {
    if (authScore === 0) return 0; // Hard Gate
    const total = (0.35 * rateScore) + 
                  (0.30 * relScore) + 
                  (0.25 * proxScore) + 
                  (0.10 * authScore);
    return Math.min(1, Math.max(0, Number(total.toFixed(4))));
  };

  // Aggregated KPIs
  const activeAnomalyCount = useMemo(() => {
    return lots.filter(l => l.status === 'anomaly_review' || (l.anomaly_flag && l.status !== 'settled')).length;
  }, [lots]);

  const totalPaidOut = useMemo(() => {
    return lots.reduce((acc, lot) => {
      if (lot.status === 'settled' && lot.final_value) {
        return acc + lot.final_value;
      }
      if (lot.status === 'advance_paid' && lot.advance_paid) {
        return acc + lot.advance_paid;
      }
      return acc;
    }, 145000);
  }, [lots]);

  const pendingSettlementTotal = useMemo(() => {
    return lots.reduce((acc, lot) => {
      if (lot.status === 'advance_paid' && lot.quoted_value && lot.advance_paid) {
        return acc + (lot.quoted_value - lot.advance_paid);
      }
      if (lot.status === 'pending_handover' && lot.quoted_value) {
        return acc + lot.quoted_value;
      }
      return acc;
    }, 0);
  }, [lots]);

  const lotsReceivedCount = useMemo(() => {
    return lots.filter(l => l.status === 'settled' || l.status === 'advance_paid').length + 42;
  }, [lots]);

  // Action: Update Material Rate
  const updateMaterialRate = (id: MaterialCategory, newRate: number) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          offered_rate: newRate,
          price_history: [
            ...m.price_history.slice(0, -1),
            { date: 'Today (Live)', price: newRate }
          ]
        };
      }
      return m;
    }));
    
    const mat = materials.find(m => m.id === id);
    const newLog: ActivityLogItem = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'match',
      title: 'Rate Updated',
      description: `Updated ${mat?.name || id} offered rate to ₹${newRate}/kg. Match ranks recalculated.`
    };
    setActivityLog(prev => [newLog, ...prev.slice(0, 19)]);
    showToast(t('rate_updated_toast'));
  };

  const updateReliabilityMetrics = (updates: Partial<ReliabilityMetrics>) => {
    setReliability(prev => ({ ...prev, ...updates }));
  };

  const updateFacility = (updates: Partial<FacilityProfile>) => {
    setFacility(prev => ({ ...prev, ...updates }));
    showToast('Facility settings and matching filters updated successfully!');
  };

  const confirmHandover = (lotId: string, receivedWeight: number, isAnomalyAcknowledged = false): boolean => {
    const lot = lots.find(l => l.id === lotId);
    if (!lot) return false;

    const weightDeviationPct = Math.abs(receivedWeight - lot.quoted_weight) / lot.quoted_weight * 100;
    const isWeightAnomaly = weightDeviationPct > 10;

    const rate = lot.offered_rate || lot.quoted_rate;
    const finalVal = Math.round(receivedWeight * rate);
    const advanceAmount = Math.round(finalVal * computedAdvancePct);
    const balance = finalVal - advanceAmount;

    const certId = `CPCB-DISP-2026-${lot.id.replace('LOT-', '')}`;

    let nextStatus: LotItem['status'] = 'settled';
    let isFlagged = lot.anomaly_flag;
    let anomalyReason = lot.anomaly_reason;

    if (isWeightAnomaly && !isAnomalyAcknowledged) {
      nextStatus = 'anomaly_review';
      isFlagged = true;
      anomalyReason = `Weight received (${receivedWeight} kg) deviates by ${weightDeviationPct.toFixed(1)}% from quoted (${lot.quoted_weight} kg). Held for inspection.`;
    }

    const updatedLot: LotItem = {
      ...lot,
      received_weight: receivedWeight,
      final_value: finalVal,
      advance_pct: isWeightAnomaly ? 0 : computedAdvancePct,
      advance_paid: isWeightAnomaly ? 0 : advanceAmount,
      balance_amount: isWeightAnomaly ? 0 : balance,
      status: nextStatus,
      anomaly_flag: isFlagged,
      anomaly_reason: anomalyReason,
      anomaly_deviation_pct: isWeightAnomaly ? Number(weightDeviationPct.toFixed(1)) : lot.anomaly_deviation_pct,
      cert_id: !isWeightAnomaly ? certId : undefined
    };

    setLots(prev => prev.map(l => l.id === lotId ? updatedLot : l));

    const newLog: ActivityLogItem = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: isWeightAnomaly ? 'anomaly' : 'handover',
      title: isWeightAnomaly ? 'Weight Anomaly Flagged' : 'Handover confirmed & settled',
      description: isWeightAnomaly 
        ? `${lot.id}, ${lot.material_name}, weight mismatch ${receivedWeight}kg vs quoted ${lot.quoted_weight}kg (${weightDeviationPct.toFixed(1)}% dev)`
        : `${lot.id}, ${lot.material_name}, ${receivedWeight} kg verified. ₹${finalVal} total settlement.`,
      lot_id: lot.id,
      amount: isWeightAnomaly ? 0 : finalVal
    };

    setActivityLog(prev => [newLog, ...prev.slice(0, 19)]);

    if (isOffline) {
      setPendingSyncCount(prev => prev + 1);
      showToast('Handover saved in offline cache! Will sync when connection is restored.');
    } else {
      showToast(isWeightAnomaly ? t('weight_deviation_warning') : t('handover_success'));
    }

    return true;
  };

  const resolveAnomaly = (lotId: string, action: 'confirm_variance' | 'dispute') => {
    const lot = lots.find(l => l.id === lotId);
    if (!lot) return;

    if (action === 'confirm_variance') {
      const rate = lot.offered_rate || lot.quoted_rate;
      const weight = lot.received_weight || lot.quoted_weight;
      const finalVal = Math.round(weight * rate);
      const advanceAmount = Math.round(finalVal * computedAdvancePct);
      const balance = finalVal - advanceAmount;

      const updated: LotItem = {
        ...lot,
        status: 'settled',
        anomaly_flag: false,
        final_value: finalVal,
        advance_pct: computedAdvancePct,
        advance_paid: advanceAmount,
        balance_amount: balance,
        cert_id: `CPCB-DISP-2026-${lot.id.replace('LOT-', '')}`
      };

      setLots(prev => prev.map(l => l.id === lotId ? updated : l));

      const log: ActivityLogItem = {
        id: `act-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'advance',
        title: 'Anomaly Approved & Advance Released',
        description: `${lot.id} variance accepted. Instant advance ₹${advanceAmount} (${(computedAdvancePct * 100).toFixed(0)}%) released.`,
        lot_id: lot.id,
        amount: advanceAmount
      };
      setActivityLog(prev => [log, ...prev.slice(0, 19)]);
      showToast(t('anomaly_resolved'));
    } else {
      const updated: LotItem = {
        ...lot,
        status: 'disputed',
        anomaly_flag: true
      };
      setLots(prev => prev.map(l => l.id === lotId ? updated : l));
      showToast('Lot marked as disputed. Sent to arbitration committee.');
    }
  };

  const syncOfflineData = () => {
    setPendingSyncCount(0);
    showToast('Offline cache synced with central server! All records uploaded.');
  };

  return (
    <DashboardContext.Provider value={{
      lang,
      setLang,
      t,
      isOffline,
      setIsOffline,
      pendingSyncCount,
      syncOfflineData,
      activeTab,
      setActiveTab,
      facility,
      updateFacility,
      materials,
      updateMaterialRate,
      lots,
      activityLog,
      reliability,
      updateReliabilityMetrics,
      zones,
      computedReliabilityScore,
      computedTier,
      computedAdvancePct,
      activeAnomalyCount,
      totalPaidOut,
      pendingSettlementTotal,
      lotsReceivedCount,
      confirmHandover,
      resolveAnomaly,
      selectedLotForCert,
      setSelectedLotForCert,
      selectedLotForHandover,
      setSelectedLotForHandover,
      activeFormulaModal,
      setActiveFormulaModal,
      toastMessage,
      showToast,
      calculateRateScore,
      calculateProximityScore,
      calculateMatchScore
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
