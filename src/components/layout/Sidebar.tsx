import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  LayoutDashboard,
  Coins,
  TrendingUp,
  BarChart3,
  PackageCheck,
  Receipt,
  AlertTriangle,
  Award,
  MapPin,
  FileCheck2,
  GitCompare,
  Zap
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    t, 
    activeAnomalyCount, 
    computedReliabilityScore, 
    computedTier
  } = useDashboard();

  const navItems = [
    { id: 'overview', label: t('nav_overview'), icon: LayoutDashboard, num: '1' },
    { id: 'rates', label: t('nav_rates'), icon: Coins, num: '2' },
    { id: 'trends', label: t('nav_trends'), icon: TrendingUp, num: '3' },
    { id: 'demand', label: t('nav_demand'), icon: BarChart3, num: '4' },
    { id: 'incoming', label: t('nav_incoming'), icon: PackageCheck, num: '5', badge: '3 live' },
    { id: 'payments', label: t('nav_payments'), icon: Receipt, num: '6' },
    { 
      id: 'anomalies', 
      label: t('nav_anomalies'), 
      icon: AlertTriangle, 
      num: '7',
      alertCount: activeAnomalyCount 
    },
    { id: 'reliability', label: t('nav_reliability'), icon: Award, num: '8' },
    { id: 'service-area', label: t('nav_service_area'), icon: MapPin, num: '9' },
    { id: 'certificates', label: t('nav_certificates'), icon: FileCheck2, num: '10' },
    { id: 'match-ranking', label: t('nav_match_ranking'), icon: GitCompare, num: '11', isStar: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 select-none shadow-sm">
      {/* Navigation list */}
      <div className="py-4 px-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-8rem)]">
        <div className="px-3 pb-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          Operating Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  {item.num}
                </span>
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Alert Count or Live Badge */}
              {item.alertCount !== undefined && item.alertCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-100 border border-red-200 text-red-600 font-bold text-[10px] animate-pulse">
                  {item.alertCount}
                </span>
              )}
              {item.badge && !item.alertCount && (
                <span className="px-1.5 py-0.5 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-600 font-medium text-[9px]">
                  {item.badge}
                </span>
              )}
              {item.isStar && (
                <span className="px-1.5 py-0.5 rounded-md bg-violet-50 text-violet-600 border border-violet-200 text-[9px] font-bold">
                  Preview
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Reliability Pill */}
      <div className="p-3 border-t border-slate-200 bg-slate-50">
        <div 
          onClick={() => setActiveTab('reliability')}
          className="cursor-pointer p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              {computedTier}
            </span>
            <span className="text-xs font-bold text-indigo-600 font-mono">
              {(computedReliabilityScore * 100).toFixed(0)} / 100
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${computedReliabilityScore * 100}%`,
                background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)'
              }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>Advance Payout Tier</span>
            <span className="font-semibold text-slate-600">
              {(computedTier === 'Tier A' ? 90 : computedTier === 'Tier B+' ? 80 : computedTier === 'Tier B' ? 60 : 40)}% Instant
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
