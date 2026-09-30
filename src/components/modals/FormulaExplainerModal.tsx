import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  X, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';

export const FormulaExplainerModal: React.FC = () => {
  const { activeFormulaModal, setActiveFormulaModal } = useDashboard();

  if (!activeFormulaModal) return null;

  const formulas = [
    {
      module: '2. Rates & Benchmark',
      psClause: 'PS Clause: "current buying rates for different material categories" — recycler dataset\'s offered_rate field.',
      formula: 'rate_score = min(1, offered_rate / fair_price)',
      why: 'Directly incentivizes fair pricing — a recycler who lowballs sees their own score visibly drop rather than silently losing matches with no explanation.'
    },
    {
      module: '3. Price Trends',
      psClause: 'PS Clause: "identify basic price trends" — explicit requirement easy for teams to miss.',
      formula: 'change_% = (price_today − price_30d_ago) / price_30d_ago × 100',
      why: 'Reuses the exact same historical price dataset that feeds the collector\'s price board — one unified dataset serving dual roles.'
    },
    {
      module: '5. Incoming Lots (Traceability)',
      psClause: 'PS Clause: "digital and verifiable handover/transfer record."',
      formula: 'weight_deviation_% = |received_weight − quoted_weight| / quoted_weight × 100',
      why: 'A >10% deviation fires a live warning banner and flags the lot toward anomaly review in real-time.'
    },
    {
      module: '6. Handover & Payments (Instant Advance)',
      psClause: 'PS Clause: "earnings ledger showing transactions, payments, and pending dues."',
      formula: 'advance_% = 90% (if score ≥ 0.90) | 80% (if score ≥ 0.80) | 60% (if score ≥ 0.65) | 40% (otherwise)\n* Anomaly-flagged lots held at 0% until inspected',
      why: 'Solves the informal sector liquidity gap: makes formal recycling channels pay faster and safer than unregulated middlemen.'
    },
    {
      module: '7. Anomaly Review',
      psClause: 'PS Clause: "identification of abnormal or inconsistent transaction values."',
      formula: 'deviation_% = |price − category_median| / category_median × 100 (Flagged when deviation > 30%)',
      why: 'Solves the false-positive problem by providing clear explanations (cold start, condition discount) and operator confirmation actions.'
    },
    {
      module: '8. Composite Reliability Score',
      psClause: 'PS Clause: "trust signal and matching input in recycler dataset."',
      formula: 'reliability_score = 0.40×on_time_rate + 0.35×honored_rate + 0.15×(1−dispute_rate) + 0.10×settlement_speed_score\nwhere settlement_speed_score = max(0, 1 − avg_settlement_hours/48)',
      why: 'One score does double duty: powers matching rank AND governs the advance payout percentage tier.'
    },
    {
      module: '11. Match & Ranking',
      psClause: 'PS Clause: "identify and rank suitable authorized recyclers for a collector\'s lot."',
      formula: 'match_score = 0.35×rate_score + 0.30×reliability_score + 0.25×proximity_score + 0.10×authorization_score\nwhere proximity_score = max(0, 1 − distance_km / service_radius_km)\nauthorization_score = 1 if active & category accepted, else 0 (hard gate)',
      why: 'Proves the recycler and collector sides share the exact same underlying numbers rendered from dual perspectives.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setActiveFormulaModal(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Judge Criteria & Dataset Mapping
            </h2>
            <p className="text-xs text-slate-500">
              Every number shown on screen is computed from the 4 core datasets — nothing is decorative.
            </p>
          </div>
        </div>

        {/* Formulas List */}
        <div className="space-y-4">
          {formulas.map((f, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all space-y-3"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                  {f.module}
                </span>
                <span className="text-[11px] text-slate-500 block leading-relaxed">
                  {f.psClause}
                </span>
              </div>

              {/* Code Box */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-indigo-300 whitespace-pre-line leading-relaxed">
                {f.formula}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-700 leading-relaxed flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{f.why}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Pitch Closing Note */}
        <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-slate-500 italic">
          <strong className="text-slate-700 not-italic block mb-1">SIH Pitch Note:</strong>
          Weights used above (0.35 / 0.30 / 0.25 / 0.10 for matching; 0.40 / 0.35 / 0.15 / 0.10 for reliability) are reasoned starting points for the platform. In production, these are dynamically tuned against actual outcomes (successful handovers, collector repeat-use rate) as volume scales.
        </div>
      </div>
    </div>
  );
};
