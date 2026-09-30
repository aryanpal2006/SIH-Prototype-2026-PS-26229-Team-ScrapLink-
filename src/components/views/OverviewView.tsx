import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  PackageCheck, 
  Coins, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { 
    t, 
    lotsReceivedCount, 
    totalPaidOut, 
    pendingSettlementTotal, 
    activeAnomalyCount,
    activityLog,
    materials,
    setActiveTab,
    lots
  } = useDashboard();

  // Find incoming lots that need attention
  const incomingLots = lots.filter(l => l.status === 'pending_handover');

  // Max volume for relative bar width
  const maxVolume = Math.max(...materials.map(m => m.actual_received_kg), 35);

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Facility Operating Overview
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              Live Console
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time operating snapshot for Kharagpur Metal Recovery (CPCB/EW-REG/WB-2024/788)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('incoming')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-md shadow-indigo-200 flex items-center gap-1.5"
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Process Inward Lots ({incomingLots.length})</span>
          </button>
        </div>
      </div>

      {/* 1. KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Lots Received */}
        <div 
          onClick={() => setActiveTab('incoming')}
          className="kpi-card p-4 rounded-2xl cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">{t('kpi_lots_received')}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">
            {lotsReceivedCount}
          </div>
          <div className="mt-1 flex items-center text-[11px] text-emerald-600 font-medium">
            <TrendingUp className="w-3 h-3 mr-1" />
            {t('kpi_lots_trend')}
          </div>
        </div>

        {/* KPI 2: Total Paid Out */}
        <div 
          onClick={() => setActiveTab('payments')}
          className="kpi-card p-4 rounded-2xl cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">{t('kpi_total_paid')}</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-mono tracking-tight">
            ₹{totalPaidOut.toLocaleString('en-IN')}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {t('kpi_avg_per_lot')}
          </div>
        </div>

        {/* KPI 3: Pending Settlement */}
        <div 
          onClick={() => setActiveTab('payments')}
          className="kpi-card p-4 rounded-2xl cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">{t('kpi_pending_settlement')}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono tracking-tight">
            ₹{pendingSettlementTotal.toLocaleString('en-IN')}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {t('kpi_pending_count')}
          </div>
        </div>

        {/* KPI 4: Active Anomaly Flags */}
        <div 
          onClick={() => setActiveTab('anomalies')}
          className="kpi-card p-4 rounded-2xl cursor-pointer group relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span className="font-semibold">{t('kpi_active_anomalies')}</span>
            <div className="p-2 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-100 transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-red-500 font-mono tracking-tight flex items-center gap-2">
            {activeAnomalyCount}
            {activeAnomalyCount > 0 && (
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-bold border border-red-200">
                Action Required
              </span>
            )}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {activeAnomalyCount > 0 ? 'Review >30% price or >10% weight variances' : 'No active anomalies'}
          </div>
        </div>
      </div>

      {/* Main Section Grid: Live Activity Feed (Left) & This Week's Volume by Category (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Activity Feed */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-sm font-bold text-slate-700">{t('activity_log_title')}</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Auto-refreshing stream
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {activityLog.map((log) => {
              const badgeColors = {
                handover: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                advance: 'bg-cyan-50 text-cyan-700 border-cyan-200',
                match: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                anomaly: 'bg-red-50 text-red-700 border-red-200',
                settlement: 'bg-teal-50 text-teal-700 border-teal-200'
              }[log.type];

              return (
                <div 
                  key={log.id} 
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${badgeColors}`}>
                        {log.title}
                      </span>
                      {log.lot_id && (
                        <span className="font-mono text-slate-400 font-semibold text-[11px]">
                          {log.lot_id}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-snug break-words">
                      {log.description}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: This Week's Volume by Category */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-700">{t('weekly_volume_title')}</h3>
            <span className="text-[11px] text-indigo-600 font-mono font-semibold">
              Total: {materials.reduce((acc, m) => acc + m.actual_received_kg, 0).toFixed(1)} kg
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {materials.map((mat) => {
              const widthPct = Math.round((mat.actual_received_kg / maxVolume) * 100);
              return (
                <div key={mat.id} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="truncate pr-2 font-medium">{mat.name}</span>
                    <span className="font-mono font-bold text-slate-700 shrink-0">
                      {mat.actual_received_kg} kg
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${widthPct}%`,
                        background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt to Rates */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Looking to increase inward volume?</span>
            <button
              onClick={() => setActiveTab('rates')}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              Adjust Rates <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
