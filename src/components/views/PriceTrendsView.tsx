import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Info
} from 'lucide-react';

export const PriceTrendsView: React.FC = () => {
  const { materials } = useDashboard();

  // Helper to render an SVG sparkline path
  const renderSparkline = (history: { date: string; price: number }[], isUp: boolean) => {
    if (!history || history.length < 2) return null;
    const prices = history.map(h => h.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const width = 140;
    const height = 36;
    const padding = 4;

    const points = prices.map((p, i) => {
      const x = padding + (i / (prices.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((p - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    }).join(' ');

    const strokeColor = isUp ? '#10B981' : '#EF4444';
    const fillColor = isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polygon
          points={`${padding},${height} ${points} ${width - padding},${height}`}
          fill={fillColor}
        />
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Historical Price Trends & Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            30-day commodity price trajectory across informal collection markets and metal recovery indices.
          </p>
        </div>


      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-700">Dataset Reusability:</strong> This view shares the exact same historical price dataset that feeds the waste collector's mobile price board — achieving complete data cohesion without redundant tables.
        </div>
      </div>

      {/* Trends Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Material Sub-Category</th>
                <th className="py-3.5 px-4">Past Price (30d Ago)</th>
                <th className="py-3.5 px-4">Current Price (Today)</th>
                <th className="py-3.5 px-4">30-Day Change %</th>
                <th className="py-3.5 px-4 text-center">Trajectory Sparkline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {materials.map((mat) => {
                const priceToday = mat.offered_rate;
                const pricePast = mat.price_30d_ago;
                const changePct = ((priceToday - pricePast) / pricePast) * 100;
                const isPositive = changePct >= 0;

                return (
                  <tr key={mat.id} className="hover:bg-slate-50 transition-colors">
                    {/* Material */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-700 text-sm">{mat.name}</div>
                      <div className="text-[11px] text-slate-400">{mat.categoryGroup}</div>
                    </td>

                    {/* Past Price */}
                    <td className="py-4 px-4 font-mono">
                      <span className="text-slate-500 text-sm font-semibold">
                        ₹{pricePast.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/ kg (Aug 31)</span>
                    </td>

                    {/* Current Price */}
                    <td className="py-4 px-4 font-mono">
                      <span className="text-slate-800 text-sm font-bold">
                        ₹{priceToday.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-indigo-500 block">/ kg (Sep 30)</span>
                    </td>

                    {/* Change % Badge */}
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono font-bold text-xs ${
                        isPositive 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {isPositive ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                        <span>{isPositive ? '+' : ''}{changePct.toFixed(1)}%</span>
                      </div>
                    </td>

                    {/* Sparkline Visual */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {renderSparkline(mat.price_history, isPositive)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
