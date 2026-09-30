import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  Scale, 
  User, 
  Clock, 
  ShieldCheck
} from 'lucide-react';

export const IncomingLotsView: React.FC = () => {
  const { 
    lots, 
    setSelectedLotForHandover, 
    setSelectedLotForCert,
    computedAdvancePct
  } = useDashboard();

  const pendingLots = lots.filter(l => l.status === 'pending_handover');
  const recentCompletedLots = lots.filter(l => l.status === 'settled' || l.status === 'advance_paid').slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Incoming Lots & Verifiable Handover
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Digital custody transfer console with calibrated scale intake and real-time &gt;10% weight deviation traceability check.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold font-mono">
            {pendingLots.length} Pending Handover
          </span>
        </div>
      </div>

      {/* Traceability Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <Scale className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-700">Live Traceability Gate:</strong> When physical handover occurs, clicking <strong>"Confirm Handover"</strong> opens the digital scale entry. If the physical scale weight deviates by &gt;10% from the collector's quote, the platform triggers a live warning banner and automatically routes the lot to Anomaly Review.
        </div>
      </div>

      {/* Pending Lots Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider text-xs">
          Matched Lots Pending Physical Intake
        </h3>

        {pendingLots.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl text-slate-400 text-xs">
            No pending inward lots right now. New matched lots will automatically appear here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingLots.map((lot) => {
              const estAdvance = Math.round(lot.quoted_value * computedAdvancePct);

              return (
                <div 
                  key={lot.id} 
                  className="glass-card p-5 rounded-2xl hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 group relative"
                >
                  {/* Top Bar: Lot ID & Material Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {lot.id}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {lot.handover_date}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                      {lot.material_name}
                    </h4>

                    {/* Collector Info */}
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <User className="w-3.5 h-3.5 text-indigo-500" />
                          Collector:
                        </span>
                        <span className="font-semibold text-slate-700">{lot.collector_name}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Phone / Rating:</span>
                        <span className="text-slate-500 font-mono">{lot.collector_phone} (★ {lot.collector_rating})</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Location / Distance:</span>
                        <span className="text-indigo-500 font-mono">{lot.zone} ({lot.distance_km} km)</span>
                      </div>
                    </div>
                  </div>

                  {/* Lot Value & Weight Grid */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Quoted Weight</span>
                        <span className="text-sm font-bold text-slate-700 font-mono">
                          {lot.quoted_weight} kg
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Quoted Value</span>
                        <span className="text-sm font-bold text-emerald-600 font-mono">
                          ₹{lot.quoted_value.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
                      <span>Est. Instant Advance:</span>
                      <span className="font-mono font-bold text-slate-600">
                        ₹{estAdvance.toLocaleString('en-IN')} ({(computedAdvancePct * 100).toFixed(0)}%)
                      </span>
                    </div>

                    {/* Action Button: Confirm Handover */}
                    <button
                      onClick={() => setSelectedLotForHandover(lot)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Scale className="w-4 h-4" />
                      <span>Confirm Physical Handover</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recently Completed Handover Records */}
      <div className="pt-4 space-y-3">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider text-xs">
          Recent Completed Handover Manifests
        </h3>

        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Lot ID</th>
                  <th className="py-3 px-4">Collector</th>
                  <th className="py-3 px-4">Material</th>
                  <th className="py-3 px-4">Quoted vs Received Wt.</th>
                  <th className="py-3 px-4">Final Value</th>
                  <th className="py-3 px-4">Certificate</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {recentCompletedLots.map((lot) => (
                  <tr key={lot.id} className="hover:bg-slate-50 transition-colors font-sans">
                    <td className="py-3 px-4 font-mono font-bold text-indigo-600">{lot.id}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{lot.collector_name}</td>
                    <td className="py-3 px-4 text-slate-600">{lot.material_name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {lot.quoted_weight} kg → <span className="text-emerald-600 font-bold">{lot.received_weight || lot.quoted_weight} kg</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      ₹{(lot.final_value || lot.quoted_value).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedLotForCert(lot)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 underline font-mono flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Form 6 Manifest</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Settled & Transferred
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
