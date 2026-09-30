import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  FileText,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CertificateModal: React.FC = () => {
  const { selectedLotForCert, setSelectedLotForCert, facility } = useDashboard();

  if (!selectedLotForCert) return null;

  const lot = selectedLotForCert;
  const certId = lot.cert_id || `CPCB-DISP-2026-${lot.id.replace('LOT-', '')}`;

  const handlePrint = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedLotForCert(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header for Screen */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-slate-800">
              CPCB Form 6 Disposal & Traceability Certificate
            </h3>
          </div>
          <div className="flex items-center space-x-2 pr-8">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div 
          id="printable-certificate" 
          className="bg-white border-2 border-emerald-300 rounded-xl p-6 text-slate-700 relative overflow-hidden"
        >
          {/* Watermark Logo */}
          <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none select-none text-9xl font-black text-emerald-500">
            CPCB
          </div>

          {/* Official Header */}
          <div className="text-center pb-4 mb-4 border-b border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-base font-black tracking-wide text-emerald-700 uppercase">
              Central Pollution Control Board (CPCB)
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              FORM 6 [See rules 19(1) and 20(3)] — E-WASTE MANIFEST & CERTIFICATE OF AUTHORIZED RECYCLING
            </p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              Government of India • Ministry of Environment, Forest and Climate Change
            </p>
          </div>

          {/* Certificate Body */}
          <div className="space-y-4 text-xs">
            {/* Cert Meta */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-[11px]">
              <div>
                <span className="text-slate-400 block">Certificate Ref ID:</span>
                <span className="font-mono font-bold text-emerald-600">{certId}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date of Authorized Handover:</span>
                <span className="font-mono font-semibold text-slate-700">{lot.handover_date}</span>
              </div>
            </div>

            {/* Recycler Facility Details */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-indigo-500" />
                1. Authorized Recycling Facility
              </span>
              <div className="font-semibold text-slate-700">{facility.name}</div>
              <div className="text-[11px] text-slate-500">{facility.location}</div>
              <div className="text-[11px] font-mono text-indigo-600">CPCB Authorization ID: {facility.cpcb_id}</div>
            </div>

            {/* Collector / Handover Source */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                2. Registered Informal Collector / Supplier
              </span>
              <div className="font-semibold text-slate-700">{lot.collector_name}</div>
              <div className="text-[11px] text-slate-500">Contact: {lot.collector_phone} • Zone: {lot.zone}</div>
              <div className="text-[11px] font-mono text-slate-400">GPS Geotag: {lot.gps_coords}</div>
            </div>

            {/* Lot & Material Details */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                3. Material Categorization & Verified Weight
              </span>
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="pb-1">Lot ID</th>
                    <th className="pb-1">E-Waste Category</th>
                    <th className="pb-1">Quoted Wt.</th>
                    <th className="pb-1">Verified Net Wt.</th>
                    <th className="pb-1 text-right">Settled Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="py-2 text-indigo-600 font-bold">{lot.id}</td>
                    <td className="py-2 text-slate-700">{lot.material_name}</td>
                    <td className="py-2 text-slate-500">{lot.quoted_weight} kg</td>
                    <td className="py-2 text-emerald-600 font-bold">{lot.received_weight || lot.quoted_weight} kg</td>
                    <td className="py-2 text-right font-bold text-slate-800">
                      ₹{(lot.final_value || lot.quoted_value).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compliance Guarantee & QR Verification */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-[11px]">
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-white rounded border border-slate-300">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 block">CRYPTOGRAPHICALLY SIGNED</span>
                  <span className="text-[10px] text-slate-400 block font-mono">Hash: 8f2b3e41...c99a</span>
                  <span className="text-[9px] text-slate-400 block">Scan to verify against CPCB National Registry</span>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block border-b border-slate-300 pb-1 px-4 text-center">
                  <div className="text-[10px] font-serif italic text-emerald-600">Digitally Verified & Sealed</div>
                  <div className="text-[10px] font-bold text-slate-600 mt-1">Authorized Officer</div>
                  <div className="text-[9px] text-slate-400">{facility.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
