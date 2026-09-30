import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  X, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const HandoverModal: React.FC = () => {
  const { 
    selectedLotForHandover, 
    setSelectedLotForHandover, 
    confirmHandover, 
    computedAdvancePct
  } = useDashboard();

  const [receivedWeight, setReceivedWeight] = useState<number>(0);

  useEffect(() => {
    if (selectedLotForHandover) {
      setReceivedWeight(selectedLotForHandover.quoted_weight);
    }
  }, [selectedLotForHandover]);

  if (!selectedLotForHandover) return null;

  const lot = selectedLotForHandover;
  const deviationPct = Math.abs(receivedWeight - lot.quoted_weight) / lot.quoted_weight * 100;
  const isHighDeviation = deviationPct > 10;

  const calculatedFinalVal = Math.round(receivedWeight * (lot.offered_rate || lot.quoted_rate));
  const estimatedAdvance = isHighDeviation ? 0 : Math.round(calculatedFinalVal * computedAdvancePct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (receivedWeight <= 0) return;

    confirmHandover(lot.id, receivedWeight);
    if (!isHighDeviation) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    setSelectedLotForHandover(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Gradient Header Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={() => setSelectedLotForHandover(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-500">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Physical Handover Verification
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                {lot.id}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Digital scale intake record & real-time traceability check
            </p>
          </div>
        </div>

        {/* Collector & Lot Meta */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5 text-slate-400">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              Collector:
            </span>
            <span className="font-semibold text-slate-700">{lot.collector_name} ({lot.collector_phone})</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Material Sub-Category:</span>
            <span className="font-semibold text-indigo-600">{lot.material_name}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Quoted Rate / kg:</span>
            <span className="font-mono font-semibold text-slate-700">₹{lot.offered_rate || lot.quoted_rate} / kg</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span className="text-slate-400">Declared Quoted Weight:</span>
            <span className="font-mono font-bold text-amber-600">{lot.quoted_weight} kg</span>
          </div>
        </div>

        {/* Digital Scale Entry Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center justify-between">
              <span>Enter Verified Scale Weight (kg):</span>
              <span className="text-[11px] text-slate-400">Tare: 0.00 kg calibrated</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={receivedWeight}
                onChange={(e) => setReceivedWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 rounded-xl font-mono text-xl font-bold text-indigo-600 focus:outline-none tracking-wider"
                placeholder="0.0"
                autoFocus
              />
              <span className="absolute right-4 top-3.5 text-sm font-semibold text-slate-400">
                kg
              </span>
            </div>
          </div>

          {/* Real-Time Deviation Indicator */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono">
            <span className="text-slate-400">Deviation from Quoted:</span>
            <span className={`font-bold ${isHighDeviation ? 'text-red-500' : 'text-emerald-600'}`}>
              {deviationPct.toFixed(1)}% {receivedWeight > lot.quoted_weight ? '(Overweight)' : receivedWeight < lot.quoted_weight ? '(Underweight)' : '(Exact match)'}
            </span>
          </div>

          {/* High Deviation Real-Time Warning */}
          {isHighDeviation && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-600 animate-pulse">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <div>
                <span className="font-bold text-red-700">Traceability Alert: High Weight Deviation (&gt;10%)!</span>
                <p className="mt-0.5 text-red-500 text-[11px]">
                  This handover will be routed to the <strong>Anomaly Review Module</strong>. The instant advance will be held at 0% until inspected.
                </p>
              </div>
            </div>
          )}

          {/* Payout & Value Summary */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Final Total Value</span>
              <span className="text-base font-bold text-slate-800 font-mono">
                ₹{calculatedFinalVal.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Instant Advance ({(computedAdvancePct * 100).toFixed(0)}%)</span>
              <span className={`text-base font-bold font-mono ${isHighDeviation ? 'text-amber-500 line-through' : 'text-emerald-600'}`}>
                ₹{estimatedAdvance.toLocaleString('en-IN')}
              </span>
              {isHighDeviation && (
                <span className="block text-[10px] text-red-500 font-bold">Held at ₹0 (Anomaly)</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedLotForHandover(null)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm & Settle Lot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
