export type Language = 'en' | 'hi' | 'bn' | 'or' | 'ta' | 'mr';


export type MaterialCategory = 
  | 'copper_stripped'
  | 'copper_jacketed'
  | 'copper_granules'
  | 'aluminum_heatsink'
  | 'aluminum_casing'
  | 'pcb_populated'
  | 'pcb_lowgrade'
  | 'pcb_gold_fingers'
  | 'li_battery'
  | 'lead_acid'
  | 'nimh_battery'
  | 'crt'
  | 'lcd_panel'
  | 'plastics'
  | 'hard_plastic_abs'
  | 'steel_chassis'
  | 'ferrous_mixed'
  | 'capacitors_electrolytic'
  | 'transformers'
  | 'toner_cartridge';

export interface MaterialRate {
  id: MaterialCategory;
  name: string;
  categoryGroup: string;
  offered_rate: number;
  fair_price: number;
  price_30d_ago: number;
  price_history: { date: string; price: number }[];
  unit: string;
  demand_forecast_kg: number;
  actual_received_kg: number;
  market_median_rate: number;
}

export type LotStatus = 
  | 'pending_handover'
  | 'advance_paid'
  | 'settled'
  | 'anomaly_review'
  | 'disputed';

export interface LotItem {
  id: string;
  collector_name: string;
  collector_phone: string;
  collector_rating: number;
  material_id: MaterialCategory;
  material_name: string;
  quoted_weight: number;
  received_weight?: number;
  quoted_rate: number;
  offered_rate: number;
  quoted_value: number;
  final_value?: number;
  advance_pct: number;
  advance_paid: number;
  balance_amount?: number;
  status: LotStatus;
  handover_date: string;
  distance_km: number;
  zone: string;
  gps_coords: string;
  anomaly_flag: boolean;
  anomaly_reason?: string;
  anomaly_deviation_pct?: number;
  cert_id?: string;
  qr_code?: string;
}

export interface ReliabilityMetrics {
  on_time_rate: number; // 0.0 - 1.0 (40%)
  honored_rate: number; // 0.0 - 1.0 (35%)
  dispute_rate: number; // 0.0 - 1.0 (15% as 1 - dispute_rate)
  avg_settlement_hours: number; // e.g. 18.0 (10% as max(0, 1 - hours/48))
}

export interface FacilityProfile {
  name: string;
  cpcb_id: string;
  location: string;
  service_radius_km: number;
  accepted_materials: MaterialCategory[];
  pickup_lead_time: string;
  daily_intake_capacity_kg: number;
  is_authorized: boolean;
}

export interface ZoneData {
  zone_name: string;
  distance_band: string;
  lots_count: number;
  total_kg: number;
  avg_transit_hours: number;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  type: 'handover' | 'advance' | 'match' | 'anomaly' | 'settlement';
  title: string;
  description: string;
  lot_id?: string;
  amount?: number;
}
