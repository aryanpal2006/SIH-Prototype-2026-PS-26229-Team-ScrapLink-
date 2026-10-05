import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';
import { initialReliability } from '../../data/mockData';

export const ReliabilityView: React.FC = () => {
  const { 
    reliability, 
    updateReliabilityMetrics, 
    computedReliabilityScore, 
    computedTier,
    computedAdvancePct
  } = useDashboard();

  // Reset to default
  const handleReset = () => {
    updateReliabilityMetrics(initialReliability);
  };

  const settlementSpeedScore = Math.max(0, 1 - (reliability.avg_settlement_hours / 48));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Facility Reliability & Trust Rating
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Composite score powering both the collector matching rank and instant advance payout tier.
          </p>
        </div>


      </div>

      {/* Hero Composite Score Banner */}
      <div className="glass-panel p-6 rounded-3xl relative overflow-hidden border border-indigo-100">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-indigo-100 via-violet-50 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Score Gauge / Circular Dial */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="url(#indigoGradient)"
                  strokeWidth="10"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (364 * computedReliabilityScore)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black font-mono text-slate-800">
                  {(computedReliabilityScore * 100).toFixed(0)}
                </span>
                <span className="text-[11px] font-mono text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {computedTier} Certified
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Top 15% of recyclers in West Bengal region
            </p>
          </div>

          {/* Right: Tier Rules & Double-Duty Explanation */}
          <div className="md:col-span-8 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-500" />
                Double-Duty Metric Architecture
              </h3>
              <p className="text-[13px] text-slate-800 leading-relaxed font-medium">
                One single reliability number drives <strong>both systems</strong> without redundant data:
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pl-4 list-disc">
                <li>Powers <strong className="text-slate-900">30% weight</strong> in the collector-facing match ranking algorithm.</li>
                <li>Governs the <strong className="text-slate-900">instant advance payout rate</strong> for incoming lots (currently <strong className="text-indigo-700">{(computedAdvancePct * 100).toFixed(0)}%</strong>).</li>
              </ul>
            </div>

            {/* Tier Thresholds Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className={`p-3 rounded-xl border text-center ${computedTier === 'Tier A' ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md' : 'bg-white border-slate-300 text-slate-800'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">Tier A</div>
                <div className="font-mono text-base font-bold mt-1 text-slate-900">90–100</div>
                <div className={`text-[11px] mt-1 font-medium ${computedTier === 'Tier A' ? 'text-indigo-100' : 'text-slate-700'}`}>90% Advance</div>
              </div>
              <div className={`p-3 rounded-xl border text-center ${computedTier === 'Tier B+' ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md' : 'bg-white border-slate-300 text-slate-800'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">Tier B+</div>
                <div className="font-mono text-base font-bold mt-1 text-slate-900">80–89</div>
                <div className={`text-[11px] mt-1 font-medium ${computedTier === 'Tier B+' ? 'text-indigo-100' : 'text-slate-700'}`}>80% Advance</div>
              </div>
              <div className={`p-3 rounded-xl border text-center ${computedTier === 'Tier B' ? 'bg-indigo-600 border-indigo-600 text-white font-bold shadow-md' : 'bg-white border-slate-300 text-slate-800'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">Tier B</div>
                <div className="font-mono text-base font-bold mt-1 text-slate-900">65–79</div>
                <div className={`text-[11px] mt-1 font-medium ${computedTier === 'Tier B' ? 'text-indigo-100' : 'text-slate-700'}`}>60% Advance</div>
              </div>
              <div className={`p-3 rounded-xl border text-center ${computedTier === 'Tier C' ? 'bg-red-500 border-red-500 text-white font-bold shadow-md' : 'bg-white border-slate-300 text-slate-800'}`}>
                <div className="text-[11px] uppercase font-bold tracking-wider">Tier C</div>
                <div className="font-mono text-base font-bold mt-1 text-slate-900">&lt;65</div>
                <div className={`text-[11px] mt-1 font-medium ${computedTier === 'Tier C' ? 'text-red-100' : 'text-slate-700'}`}>40% Advance</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Sub-Metrics Interactive Simulator */}
      <div className="glass-panel p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Sub-Metric Composition & Live Simulation
            </h3>
            <p className="text-xs text-slate-400">
              Drag the sliders below to simulate how operational performance affects the composite score and payout tier.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Sub-metric 1: On-Time Pickups (40%) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">1. On-Time Pickups Rate (Weight: 40%)</span>
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="50"
                  max="100"
                  step="1"
                  value={Math.round(reliability.on_time_rate * 100)}
                  onChange={(e) => updateReliabilityMetrics({ on_time_rate: parseFloat(e.target.value) / 100 })}
                  className="w-12 text-right font-mono text-sm font-bold text-emerald-600 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">%</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex justify-end mt-2">
              <span className="text-slate-500 font-mono">Weighted Contribution: +{(0.40 * reliability.on_time_rate * 100).toFixed(1)} pts</span>
            </div>
          </div>

          {/* Sub-metric 2: Transactions Honored (35%) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">2. Transactions Honored (Weight: 35%)</span>
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="50"
                  max="100"
                  step="1"
                  value={Math.round(reliability.honored_rate * 100)}
                  onChange={(e) => updateReliabilityMetrics({ honored_rate: parseFloat(e.target.value) / 100 })}
                  className="w-12 text-right font-mono text-sm font-bold text-indigo-600 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">%</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex justify-end mt-2">
              <span className="text-slate-500 font-mono">Weighted Contribution: +{(0.35 * reliability.honored_rate * 100).toFixed(1)} pts</span>
            </div>
          </div>

          {/* Sub-metric 3: Dispute Rate (15%) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">3. Dispute Rate (Weight: 15% as 1 − dispute)</span>
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={(reliability.dispute_rate * 100).toFixed(1)}
                  onChange={(e) => updateReliabilityMetrics({ dispute_rate: parseFloat(e.target.value) / 100 })}
                  className="w-14 text-right font-mono text-sm font-bold text-amber-600 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">%</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex justify-end mt-2">
              <span className="text-slate-500 font-mono">Contribution: +{(0.15 * (1 - reliability.dispute_rate) * 100).toFixed(1)} pts</span>
            </div>
          </div>

          {/* Sub-metric 4: Settlement Speed (10%) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">4. Avg Settlement Speed (Weight: 10%)</span>
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="1"
                  max="48"
                  step="1"
                  value={reliability.avg_settlement_hours}
                  onChange={(e) => updateReliabilityMetrics({ avg_settlement_hours: parseFloat(e.target.value) })}
                  className="w-12 text-right font-mono text-sm font-bold text-violet-600 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">hours</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 flex justify-end mt-2">
              <span className="text-slate-500 font-mono">Contribution: +{(0.10 * settlementSpeedScore * 100).toFixed(1)} pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
