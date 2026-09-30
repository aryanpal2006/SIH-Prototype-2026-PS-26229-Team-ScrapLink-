import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Save,
  Clock,
  ShieldCheck,
  Info
} from 'lucide-react';
import type { MaterialCategory } from '../../types/dashboard';

export const ServiceAreaView: React.FC = () => {
  const { facility, updateFacility, materials } = useDashboard();

  const [radius, setRadius] = useState<number>(facility.service_radius_km);
  const [leadTime, setLeadTime] = useState<string>(facility.pickup_lead_time);
  const [dailyCapacity, setDailyCapacity] = useState<number>(facility.daily_intake_capacity_kg);
  const [acceptedMats, setAcceptedMats] = useState<MaterialCategory[]>(facility.accepted_materials);

  const toggleMaterial = (id: MaterialCategory) => {
    setAcceptedMats(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFacility({
      service_radius_km: radius,
      pickup_lead_time: leadTime,
      daily_intake_capacity_kg: dailyCapacity,
      accepted_materials: acceptedMats
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Service Area & Operational Intake Parameters
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dynamic logistics boundaries, accepted material gates, and daily throughput capacity.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-indigo-600 shadow-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>Hard-Filter Input for Collector Matching</span>
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-slate-700">Live Matching Gate:</strong> These settings are not static dataset columns — adjusting your service radius or accepted categories immediately determines whether your facility appears in an informal collector's ranked match results.
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-panel p-6 rounded-2xl space-y-6">
          {/* 1. Service Radius Slider */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  Service Radius (Logistics Boundary)
                </label>
                <p className="text-xs text-slate-400">
                  Collectors located beyond this radius are excluded (proximity score = 0).
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <input
                  type="number"
                  min="5"
                  max="50"
                  step="1"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-16 text-right font-mono text-lg font-bold text-indigo-600 focus:outline-none"
                />
                <span className="text-sm font-semibold text-slate-500">km</span>
              </div>
            </div>
          </div>

          {/* 2. Accepted Material Categories (Hard Gate) */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                Accepted Material Sub-Categories (Authorization Hard Gate)
              </label>
              <p className="text-xs text-slate-400">
                Only selected categories will match incoming lots. Deselecting a category sets authorization_score = 0.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              {materials.map((mat) => {
                const isSelected = acceptedMats.includes(mat.id);
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => toggleMaterial(mat.id)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate pr-2">{mat.name}</span>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-500' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Daily Intake Capacity & Lead Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {/* Daily Capacity Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-violet-500" />
                  Daily Intake Capacity
                </label>
                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                  <input
                    type="number"
                    min="100"
                    max="2000"
                    step="50"
                    value={dailyCapacity}
                    onChange={(e) => setDailyCapacity(parseInt(e.target.value))}
                    className="w-14 text-right font-mono text-sm font-bold text-violet-600 focus:outline-none"
                  />
                  <span className="text-xs font-semibold text-slate-500">kg/day</span>
                </div>
              </div>
            </div>

            {/* Pickup Lead Time Radio */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Pickup Dispatch Lead Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Same-day (<6h)', '24h (Standard)', '48h (Bulk Batch)'].map((lt) => {
                  const isCur = leadTime === lt;
                  return (
                    <button
                      key={lt}
                      type="button"
                      onClick={() => setLeadTime(lt)}
                      className={`py-2 px-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                        isCur
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {lt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Broadcast Parameters to Matching Engine</span>
          </button>
        </div>
      </form>
    </div>
  );
};
