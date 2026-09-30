import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  Info
} from 'lucide-react';
import type { MaterialCategory } from '../../types/dashboard';

export const RatesBenchmarkView: React.FC = () => {
  const { 
    materials, 
    updateMaterialRate, 
    calculateRateScore, 
    t, 
    setActiveFormulaModal,
    setActiveTab
  } = useDashboard();

  // Local state for editing rates
  const [editingRates, setEditingRates] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    materials.forEach(m => {
      initial[m.id] = m.offered_rate;
    });
    return initial;
  });

  const [savingId, setSavingId] = useState<string | null>(null);

  const handleRateChange = (id: MaterialCategory, val: number) => {
    setEditingRates(prev => ({
      ...prev,
      [id]: Math.max(1, val)
    }));
  };

  const handleSaveRate = (id: MaterialCategory) => {
    setSavingId(id);
    const newRate = editingRates[id] || 0;
    setTimeout(() => {
      updateMaterialRate(id, newRate);
      setSavingId(null);
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header & Formula Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Buying Rates & Fair Price Benchmark
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Set your facility's buying rates per kg. Higher compliance with fair market benchmark raises your Rate Score and matching rank.
          </p>
        </div>


      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-indigo-700">Why it matters for judges:</strong> This mechanism directly incentivizes fair pricing in the informal e-waste market. A recycler who lowballs sees their own <code className="bg-indigo-100 px-1 rounded">rate_score</code> visibly drop in real time, explaining exactly why they receive fewer matched lots rather than silently losing out.
        </div>
      </div>

      {/* Rates Table / Grid */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Material Sub-Category</th>
                <th className="py-3.5 px-4">Fair Benchmark (₹/kg)</th>
                <th className="py-3.5 px-4">Your Offered Rate (₹/kg)</th>
                <th className="py-3.5 px-4 min-w-[200px]">Rate Score & Health</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {materials.map((mat) => {
                const currentVal = editingRates[mat.id] !== undefined ? editingRates[mat.id] : mat.offered_rate;
                const score = calculateRateScore(currentVal, mat.fair_price);
                const scorePct = Math.round(score * 100);
                const isChanged = currentVal !== mat.offered_rate;
                const isOptimal = score >= 1.0;

                return (
                  <tr key={mat.id} className="hover:bg-slate-50 transition-colors">
                    {/* Category Name */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-700 text-sm">{mat.name}</div>
                      <div className="text-[11px] text-slate-400">{mat.categoryGroup}</div>
                    </td>

                    {/* Fair Benchmark */}
                    <td className="py-4 px-4 font-mono">
                      <div className="text-slate-700 font-bold text-sm">
                        ₹{mat.fair_price}
                        <span className="text-[10px] text-slate-400 font-normal"> / kg</span>
                      </div>
                      <div className="text-[10px] text-slate-400">CPCB Govt Median</div>
                    </td>

                    {/* Offered Rate Editable Input */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="relative w-32">
                          <span className="absolute left-3 top-2 text-slate-400 font-bold font-mono">₹</span>
                          <input
                            type="number"
                            min="1"
                            value={currentVal}
                            onChange={(e) => handleRateChange(mat.id, parseFloat(e.target.value) || 0)}
                            className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 focus:border-indigo-400 rounded-lg text-slate-700 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
                          />
                        </div>
                        <span className="text-slate-400 text-xs">/ kg</span>
                      </div>
                    </td>

                    {/* Rate Score Bar */}
                    <td className="py-4 px-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-mono font-bold ${
                            isOptimal ? 'text-emerald-600' : scorePct >= 80 ? 'text-indigo-600' : 'text-amber-600'
                          }`}>
                            {score.toFixed(2)} ({scorePct}%)
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            isOptimal 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : scorePct >= 80 
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {isOptimal ? 'Fair & Competitive' : scorePct >= 80 ? 'Good' : 'Below Benchmark'}
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              width: `${scorePct}%`,
                              background: isOptimal 
                                ? 'linear-gradient(90deg, #10B981, #06B6D4)' 
                                : scorePct >= 80 
                                ? 'linear-gradient(90deg, #4F46E5, #06B6D4)'
                                : 'linear-gradient(90deg, #F59E0B, #EF4444)'
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Update Action */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleSaveRate(mat.id)}
                        disabled={savingId === mat.id || !isChanged}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isChanged
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                            : 'bg-slate-100 text-slate-400 cursor-default'
                        }`}
                      >
                        {savingId === mat.id ? t('saving') : isChanged ? t('update_rate') : 'Saved'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Linked Match Rank Preview Link */}
      <div className="p-4 rounded-2xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="text-slate-600">
          <strong className="text-slate-700 block">Want to see how your rates impact collector match ranking?</strong>
          Your updated rate scores immediately feed into the <strong>Match & Ranking Algorithm (35% weight)</strong>.
        </div>
        <button
          onClick={() => setActiveTab('match-ranking')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto shrink-0 shadow-md shadow-indigo-200"
        >
          <span>View Live Match Preview</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
