import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  GitCompare, 
  Sparkles, 
  Smartphone, 
  MapPin, 
  Award, 
  Coins, 
  ShieldCheck, 
  Sliders
} from 'lucide-react';
import type { MaterialCategory } from '../../types/dashboard';

export const MatchRankingView: React.FC = () => {
  const { 
    facility, 
    materials, 
    computedReliabilityScore, 
    computedTier,
    calculateRateScore, 
    calculateProximityScore, 
    calculateMatchScore,
    setActiveFormulaModal
  } = useDashboard();

  // Test Simulation state for collector lot
  const [testMaterial, setTestMaterial] = useState<MaterialCategory>('li_battery');
  const [testDistance, setTestDistance] = useState<number>(3.5);
  const [testWeight, setTestWeight] = useState<number>(14.5);

  const selectedMat = materials.find(m => m.id === testMaterial) || materials[0];

  // Component Scores
  const rateScore = calculateRateScore(selectedMat.offered_rate, selectedMat.fair_price);
  const reliabilityScore = computedReliabilityScore;
  const proximityScore = calculateProximityScore(testDistance, facility.service_radius_km);
  const isCategoryAccepted = facility.accepted_materials.includes(testMaterial);
  const authorizationScore = (facility.is_authorized && isCategoryAccepted) ? 1.0 : 0.0;

  // Composite Match Score
  const totalMatchScore = calculateMatchScore(rateScore, reliabilityScore, proximityScore, authorizationScore);

  // Simulated Competitor Recyclers
  const competitorRecyclers = [
    {
      name: 'Bengal Eco Recovery Ltd.',
      distance: (testDistance + 4.2).toFixed(1),
      rate: selectedMat.fair_price - 10,
      tier: 'Tier B',
      score: Math.max(0.4, Number((totalMatchScore - 0.09).toFixed(2))),
      isMe: false
    },
    {
      name: facility.name,
      distance: testDistance.toFixed(1),
      rate: selectedMat.offered_rate,
      tier: computedTier,
      score: totalMatchScore,
      isMe: true
    },
    {
      name: 'Midnapore Green Dismantlers',
      distance: (testDistance + 9.5).toFixed(1),
      rate: selectedMat.fair_price + 5,
      tier: 'Tier A',
      score: Math.min(0.95, Number((totalMatchScore - 0.04).toFixed(2))),
      isMe: false
    },
    {
      name: 'Kolkata E-Waste Hub',
      distance: (testDistance + 18.0).toFixed(1),
      rate: selectedMat.fair_price,
      tier: 'Tier B+',
      score: Math.max(0.3, Number((totalMatchScore - 0.18).toFixed(2))),
      isMe: false
    }
  ].sort((a, b) => b.score - a.score);

  const myRank = competitorRecyclers.findIndex(r => r.isMe) + 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Match & Ranking — Dual Linked Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time verification showing how recycler parameters translate directly into the collector's mobile ranking interface.
          </p>
        </div>


      </div>

      {/* Philosophy Callout for Judges */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-start space-x-3 text-xs text-slate-600">
        <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-indigo-700">The One-Platform Dual-View Proof:</strong> The left panel shows your facility's internal mathematical scoring breakdown. The right panel shows the live mobile screen that an informal collector sees in the field. Both sides share the exact same underlying variables — same rate (₹{selectedMat.offered_rate}), same reliability tier ({computedTier}), and same distance ({testDistance} km).
        </div>
      </div>

      {/* Simulator Test Bar */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
            Simulate Collector Field Lot & Location
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Test how changes alter your matching score
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Pick Material */}
          <div>
            <label className="block text-slate-400 text-[11px] mb-1">Collector's E-Waste Lot</label>
            <select
              value={testMaterial}
              onChange={(e) => setTestMaterial(e.target.value as MaterialCategory)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
            >
              {materials.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (Fair: ₹{m.fair_price}/kg)
                </option>
              ))}
            </select>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-500 text-xs font-semibold">Collector Distance from Facility</span>
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="0.5"
                  max={facility.service_radius_km + 5}
                  step="0.5"
                  value={testDistance}
                  onChange={(e) => setTestDistance(parseFloat(e.target.value))}
                  className="w-16 text-right font-mono text-sm font-bold text-indigo-600 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">km</span>
              </div>
            </div>
          </div>

          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-500 text-xs font-semibold">Lot Weight</span>
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="0.5"
                  value={testWeight}
                  onChange={(e) => setTestWeight(parseFloat(e.target.value))}
                  className="w-16 text-right font-mono text-sm font-bold text-violet-600 focus:outline-none"
                />
                <span className="text-xs font-semibold text-slate-500">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Linked Panels: (A) Score Breakdown vs (B) Collector Live Mobile Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Panel A: Recycler's Own Computed Match Score (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-indigo-500" />
                (A) Your Facility Match Score Breakdown
              </h3>
              <p className="text-xs text-slate-400">
                Formula-weighted contribution for {selectedMat.name}
              </p>
            </div>

            {/* Rank Indicator */}
            <div className="text-right">
              <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono">
                Ranked #{myRank} of {competitorRecyclers.length}
              </span>
            </div>
          </div>

          {/* Score Header Dial */}
          <div className="flex items-center space-x-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-200">
              <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-2xl font-black font-mono text-indigo-600">
                  {totalMatchScore.toFixed(2)}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase">Match Score</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-sm font-bold text-slate-700">
                {authorizationScore > 0 ? 'High Match Probability' : 'Category Excluded (Hard Gate)'}
              </div>
              <p className="text-slate-500 leading-snug text-[11px]">
                {authorizationScore > 0 
                  ? `Your rate of ₹${selectedMat.offered_rate}/kg and ${testDistance} km proximity puts you at rank #${myRank} for this collector's lot.`
                  : `You have disabled intake for ${selectedMat.name} in Service Area settings, setting authorization score to 0.`}
              </p>
            </div>
          </div>

          {/* 4 Factor Contribution Bars */}
          <div className="space-y-4 text-xs">
            {/* 1. Rate Score (35%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-indigo-500" />
                  Rate Competitiveness (35% Weight)
                </span>
                <span className="font-mono text-slate-600">
                  {rateScore.toFixed(2)} × 0.35 = <strong className="text-indigo-600">+{(0.35 * rateScore).toFixed(3)}</strong>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${rateScore * 100}%`,
                    background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)'
                  }}
                />
              </div>
            </div>

            {/* 2. Reliability Score (30%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  Facility Reliability (30% Weight)
                </span>
                <span className="font-mono text-slate-600">
                  {reliabilityScore.toFixed(2)} × 0.30 = <strong className="text-emerald-600">+{(0.30 * reliabilityScore).toFixed(3)}</strong>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${reliabilityScore * 100}%`,
                    background: 'linear-gradient(90deg, #10B981 0%, #06B6D4 100%)'
                  }}
                />
              </div>
            </div>

            {/* 3. Proximity Score (25%) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  Proximity Distance (25% Weight)
                </span>
                <span className="font-mono text-slate-600">
                  {proximityScore.toFixed(2)} × 0.25 = <strong className="text-amber-600">+{(0.25 * proximityScore).toFixed(3)}</strong>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${proximityScore * 100}%`,
                    background: 'linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)'
                  }}
                />
              </div>
              <div className="text-[10px] text-slate-400 flex justify-between font-mono">
                <span>{testDistance} km distance</span>
                <span>Radius: {facility.service_radius_km} km</span>
              </div>
            </div>

            {/* 4. Authorization Score (10% Hard Gate) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-500" />
                  CPCB License & Category Auth (10% Gate)
                </span>
                <span className="font-mono text-slate-600">
                  {authorizationScore.toFixed(1)} × 0.10 = <strong className="text-violet-600">+{(0.10 * authorizationScore).toFixed(3)}</strong>
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${authorizationScore > 0 ? 'bg-violet-500' : 'bg-red-400'}`}
                  style={{ width: `${authorizationScore * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Panel B: Collector-Facing Live Mobile Preview (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-indigo-500" />
            (B) Live Collector Mobile Interface
          </div>

          {/* Simulated Mobile Mockup */}
          <div className="w-full max-w-[340px] bg-slate-800 border-4 border-slate-700 rounded-[36px] p-4 shadow-2xl shadow-slate-300 relative overflow-hidden text-xs">
            {/* Phone Speaker & Camera Notch */}
            <div className="w-28 h-4 bg-slate-700 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>

            {/* Collector Mobile App Screen Content */}
            <div className="space-y-3 font-sans">
              {/* Mobile Header */}
              <div className="pb-2 border-b border-slate-600 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold">Matched Recyclers Near You</div>
                  <div className="text-xs font-bold text-slate-100">{testWeight} kg • {selectedMat.name.split('(')[0]}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  Live
                </span>
              </div>

              {/* Ranked Recycler Cards in Collector App */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-0.5">
                {competitorRecyclers.map((rec, idx) => {
                  const isHighlighted = rec.isMe;

                  return (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border transition-all text-xs relative ${
                        isHighlighted 
                          ? 'bg-gradient-to-br from-indigo-900/80 to-slate-900 border-indigo-400 shadow-md shadow-indigo-900/60' 
                          : 'bg-slate-700/40 border-slate-600 text-slate-400'
                      }`}
                    >
                      {/* Best Match Badge */}
                      {idx === 0 && (
                        <div className="absolute -top-1.5 right-2 px-1.5 py-0.2 rounded-full bg-indigo-500 text-white text-[9px] font-black uppercase tracking-wider">
                          Best Match
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <div className={`font-bold text-xs flex items-center gap-1 ${isHighlighted ? 'text-indigo-300' : 'text-slate-200'}`}>
                            <span>#{idx + 1} {rec.name}</span>
                            {isHighlighted && (
                              <span className="text-[9px] px-1 rounded bg-indigo-500/30 text-indigo-300 font-normal">You</span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>📍 {rec.distance} km</span>
                            <span>⭐ {rec.tier}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`font-mono font-bold text-xs block ${isHighlighted ? 'text-indigo-300' : 'text-slate-200'}`}>
                            ₹{rec.rate}/kg
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            Total: ₹{Math.round(rec.rate * testWeight).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {isHighlighted && (
                        <div className="mt-2 pt-2 border-t border-indigo-700/50 flex items-center justify-between text-[10px]">
                          <span className="text-indigo-300 font-mono font-semibold">
                            Instant Advance: ₹{Math.round(rec.rate * testWeight * (computedTier === 'Tier A' ? 0.9 : 0.8)).toLocaleString('en-IN')}
                          </span>
                          <button className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px]">
                            Accept
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-[10px] text-center text-slate-500">
                Informal E-Waste Collector Mobile View (PWA)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
