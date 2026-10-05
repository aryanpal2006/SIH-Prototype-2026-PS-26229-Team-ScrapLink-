import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  CreditCard,
  AlertTriangle
} from 'lucide-react';

export const HandoverPaymentsView: React.FC = () => {
  const { 
    lots, 
    computedReliabilityScore, 
    computedTier, 
    computedAdvancePct,
    totalPaidOut,
    pendingSettlementTotal,
    setActiveTab
  } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Handover Settlement & Instant Advance Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time partial payout & instant-advance reconciliation for informal collectors.
          </p>
        </div>


      </div>

      {/* Advance Rule Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <CreditCard className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed space-y-1">
          <div>
            <strong className="text-slate-700">Instant-Advance Architecture (Unit Economics Innovation):</strong> Unlike traditional scrap dealers who delay payment for weeks, our system instantly releases up to <strong>90% advance</strong> upon digital scale verification, calibrated directly against the facility's <strong>Reliability Tier</strong>.
          </div>
          <div className="text-amber-700 flex items-center gap-1.5 font-medium bg-amber-50 px-2 py-1 rounded-lg">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Fraud Prevention: Anomaly-flagged lots are automatically held at <strong>0% advance</strong> until reviewed.</span>
          </div>
        </div>
      </div>

      {/* KPI Balance Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-slate-500 block font-sans text-[11px] mb-1">Total Payouts Settled</span>
          <span className="text-2xl font-black text-slate-800">
            ₹{totalPaidOut.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-600 block font-sans mt-1">100% UPI / Bank Escrow</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-slate-500 block font-sans text-[11px] mb-1">Pending Due / In Transit</span>
          <span className="text-2xl font-black text-amber-600">
            ₹{pendingSettlementTotal.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 block font-sans mt-1">Awaiting final weight inspection</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl">
          <span className="text-slate-500 block font-sans text-[11px] mb-1">Active Payout Tier</span>
          <span className="text-2xl font-black text-indigo-600 flex items-center gap-2">
            {computedTier}
            <span className="text-sm font-sans text-slate-500 font-normal">
              ({(computedAdvancePct * 100).toFixed(0)}% Advance)
            </span>
          </span>
          <span className="text-[10px] text-slate-400 block font-sans mt-1">Score: {(computedReliabilityScore * 100).toFixed(0)}/100</span>
        </div>
      </div>

      {/* Settlement Ledger Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Settlement Ledger Records
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {lots.length} Total Registered Lots
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px] font-mono">
                <th className="py-3 px-4">Lot ID</th>
                <th className="py-3 px-4">Collector</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4 text-right">Quoted Val</th>
                <th className="py-3 px-4 text-center">Advance %</th>
                <th className="py-3 px-4 text-right">Advance Paid</th>
                <th className="py-3 px-4 text-right">Final Val</th>
                <th className="py-3 px-4 text-right">Balance / Clawback</th>
                <th className="py-3 px-4 text-center">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {lots.map((lot) => {
                const isAnomalyHeld = lot.status === 'anomaly_review' || (lot.anomaly_flag && lot.advance_pct === 0);
                const isSettled = lot.status === 'settled';

                return (
                  <tr 
                    key={lot.id} 
                    className={`hover:bg-slate-50 transition-colors ${
                      isAnomalyHeld ? 'bg-red-50/50' : ''
                    }`}
                  >
                    {/* Lot ID */}
                    <td className="py-3.5 px-4 font-bold text-indigo-600">
                      {lot.id}
                    </td>

                    {/* Collector */}
                    <td className="py-3.5 px-4 font-sans text-slate-700">
                      <div>{lot.collector_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lot.collector_phone}</div>
                    </td>

                    {/* Material */}
                    <td className="py-3.5 px-4 font-sans text-slate-600">
                      {lot.material_name}
                    </td>

                    {/* Quoted Val */}
                    <td className="py-3.5 px-4 text-right font-bold text-slate-700">
                      ₹{lot.quoted_value.toLocaleString('en-IN')}
                    </td>

                    {/* Advance % */}
                    <td className="py-3.5 px-4 text-center">
                      {isAnomalyHeld ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-200">
                          0% (Held)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {(lot.advance_pct * 100).toFixed(0)}%
                        </span>
                      )}
                    </td>

                    {/* Advance Paid */}
                    <td className="py-3.5 px-4 text-right font-bold text-indigo-600">
                      ₹{(lot.advance_paid || 0).toLocaleString('en-IN')}
                    </td>

                    {/* Final Val */}
                    <td className="py-3.5 px-4 text-right font-bold text-slate-800">
                      {lot.final_value ? `₹${lot.final_value.toLocaleString('en-IN')}` : '—'}
                    </td>

                    {/* Balance / Clawback */}
                    <td className="py-3.5 px-4 text-right font-bold">
                      {lot.balance_amount !== undefined ? (
                        <span className={lot.balance_amount >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                          {lot.balance_amount >= 0 ? '+' : ''}₹{lot.balance_amount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center font-sans">
                      {isAnomalyHeld ? (
                        <button
                          onClick={() => setActiveTab('anomalies')}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors inline-flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>Review Anomaly</span>
                        </button>
                      ) : isSettled ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Pending Scale</span>
                        </span>
                      )}
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
