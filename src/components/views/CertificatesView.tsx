import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  ShieldCheck, 
  Eye, 
  Info
} from 'lucide-react';

export const CertificatesView: React.FC = () => {
  const { lots, setSelectedLotForCert, facility } = useDashboard();

  // All completed or advance paid lots have valid certificates
  const certLots = lots.filter(l => l.status === 'settled' || l.status === 'advance_paid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Compliance & E-Waste Disposal Certificates
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Per-lot statutory Form 6 manifests with tamper-evident cryptographic hashes and CPCB registry verification.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-emerald-700 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CPCB Form 6 Certified Generator</span>
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-700">Why it matters for businesses & judges:</strong> This bridges the informal sector with corporate EPR (Extended Producer Responsibility) compliance. Each generated certificate provides verifiable proof that e-waste collected by informal pickers reached an authorized CPCB dismantler.
        </div>
      </div>

      {/* Certificates Grid / Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Issued Compliance Records ({certLots.length})
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Authorization ID: {facility.cpcb_id}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px] font-mono">
                <th className="py-3.5 px-4">Certificate ID</th>
                <th className="py-3.5 px-4">Lot ID & Material</th>
                <th className="py-3.5 px-4">Collector / Geotag</th>
                <th className="py-3.5 px-4">Verified Weight</th>
                <th className="py-3.5 px-4">Handover Date</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {certLots.map((lot) => {
                const certId = lot.cert_id || `CPCB-DISP-2026-${lot.id.replace('LOT-', '')}`;

                return (
                  <tr key={lot.id} className="hover:bg-slate-50 transition-colors">
                    {/* Cert ID */}
                    <td className="py-4 px-4 font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{certId}</span>
                    </td>

                    {/* Lot & Material */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-700">{lot.material_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lot.id}</div>
                    </td>

                    {/* Collector & GPS */}
                    <td className="py-4 px-4">
                      <div className="text-slate-700 font-medium">{lot.collector_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lot.gps_coords}</div>
                    </td>

                    {/* Verified Net Weight */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                      {lot.received_weight || lot.quoted_weight} kg
                    </td>

                    {/* Handover Date */}
                    <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                      {lot.handover_date}
                    </td>

                    {/* View Certificate Modal Trigger */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => setSelectedLotForCert(lot)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-xs transition-all inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View / Print</span>
                      </button>
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
