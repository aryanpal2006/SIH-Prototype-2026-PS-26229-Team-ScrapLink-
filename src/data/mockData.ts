import type { 
  MaterialRate, 
  LotItem, 
  ReliabilityMetrics, 
  FacilityProfile, 
  ZoneData, 
  ActivityLogItem 
} from '../types/dashboard';

export const initialFacility: FacilityProfile = {
  name: 'Kharagpur Metal Recovery',
  cpcb_id: 'CPCB/EW-REG/WB-2024/788',
  location: 'Plot 42, Nimpura Industrial Growth Centre, Kharagpur, West Bengal 721301',
  service_radius_km: 25,
  accepted_materials: [
    'copper_stripped',
    'copper_jacketed',
    'copper_granules',
    'aluminum_heatsink',
    'aluminum_casing',
    'pcb_populated',
    'pcb_lowgrade',
    'pcb_gold_fingers',
    'li_battery',
    'lead_acid',
    'nimh_battery',
    'crt',
    'lcd_panel',
    'plastics',
    'hard_plastic_abs',
    'steel_chassis',
    'capacitors_electrolytic',
    'transformers'
  ],
  pickup_lead_time: '24h (Standard)',
  daily_intake_capacity_kg: 500,
  is_authorized: true
};

export const initialMaterials: MaterialRate[] = [
  {
    id: 'copper_stripped',
    name: 'Copper cable — stripped',
    categoryGroup: 'Non-Ferrous Metals',
    offered_rate: 410,
    fair_price: 385,
    price_30d_ago: 365,
    market_median_rate: 385,
    unit: 'kg',
    demand_forecast_kg: 45.0,
    actual_received_kg: 33.2,
    price_history: [
      { date: 'Sep 01', price: 365 },
      { date: 'Sep 06', price: 372 },
      { date: 'Sep 12', price: 380 },
      { date: 'Sep 18', price: 395 },
      { date: 'Sep 24', price: 405 },
      { date: 'Sep 30', price: 410 }
    ]
  },
  {
    id: 'copper_jacketed',
    name: 'Copper cable — jacketed',
    categoryGroup: 'Non-Ferrous Metals',
    offered_rate: 344,
    fair_price: 340,
    price_30d_ago: 320,
    market_median_rate: 340,
    unit: 'kg',
    demand_forecast_kg: 30.0,
    actual_received_kg: 24.5,
    price_history: [
      { date: 'Sep 01', price: 320 },
      { date: 'Sep 06', price: 325 },
      { date: 'Sep 12', price: 330 },
      { date: 'Sep 18', price: 338 },
      { date: 'Sep 24', price: 340 },
      { date: 'Sep 30', price: 344 }
    ]
  },
  {
    id: 'pcb_populated',
    name: 'PCB — populated (Server / Motherboard)',
    categoryGroup: 'Circuit Boards',
    offered_rate: 280,
    fair_price: 330,
    price_30d_ago: 250,
    market_median_rate: 330,
    unit: 'kg',
    demand_forecast_kg: 35.0,
    actual_received_kg: 28.4,
    price_history: [
      { date: 'Sep 01', price: 250 },
      { date: 'Sep 06', price: 255 },
      { date: 'Sep 12', price: 260 },
      { date: 'Sep 18', price: 270 },
      { date: 'Sep 24', price: 275 },
      { date: 'Sep 30', price: 280 }
    ]
  },
  {
    id: 'pcb_lowgrade',
    name: 'PCB — low grade (TV / Radio / Power Supply)',
    categoryGroup: 'Circuit Boards',
    offered_rate: 80,
    fair_price: 95,
    price_30d_ago: 75,
    market_median_rate: 95,
    unit: 'kg',
    demand_forecast_kg: 20.0,
    actual_received_kg: 15.0,
    price_history: [
      { date: 'Sep 01', price: 75 },
      { date: 'Sep 06', price: 76 },
      { date: 'Sep 12', price: 78 },
      { date: 'Sep 18', price: 78 },
      { date: 'Sep 24', price: 80 },
      { date: 'Sep 30', price: 80 }
    ]
  },
  {
    id: 'li_battery',
    name: 'Li-ion battery pack (Laptops / EVs / Mobile)',
    categoryGroup: 'Batteries & Energy Storage',
    offered_rate: 145,
    fair_price: 145,
    price_30d_ago: 130,
    market_median_rate: 145,
    unit: 'kg',
    demand_forecast_kg: 25.0,
    actual_received_kg: 18.1,
    price_history: [
      { date: 'Sep 01', price: 130 },
      { date: 'Sep 06', price: 132 },
      { date: 'Sep 12', price: 138 },
      { date: 'Sep 18', price: 140 },
      { date: 'Sep 24', price: 142 },
      { date: 'Sep 30', price: 145 }
    ]
  },
  {
    id: 'lead_acid',
    name: 'Lead-acid battery (UPS / Automotive)',
    categoryGroup: 'Batteries & Energy Storage',
    offered_rate: 88,
    fair_price: 90,
    price_30d_ago: 104,
    market_median_rate: 90,
    unit: 'kg',
    demand_forecast_kg: 15.0,
    actual_received_kg: 12.5,
    price_history: [
      { date: 'Sep 01', price: 104 },
      { date: 'Sep 06', price: 100 },
      { date: 'Sep 12', price: 95 },
      { date: 'Sep 18', price: 92 },
      { date: 'Sep 24', price: 90 },
      { date: 'Sep 30', price: 88 }
    ]
  },
  {
    id: 'crt',
    name: 'CRT monitor / Display Glass',
    categoryGroup: 'Glass & Phosphors',
    offered_rate: 32,
    fair_price: 32,
    price_30d_ago: 32,
    market_median_rate: 32,
    unit: 'kg',
    demand_forecast_kg: 12.0,
    actual_received_kg: 9.2,
    price_history: [
      { date: 'Sep 01', price: 32 },
      { date: 'Sep 06', price: 32 },
      { date: 'Sep 12', price: 32 },
      { date: 'Sep 18', price: 32 },
      { date: 'Sep 24', price: 32 },
      { date: 'Sep 30', price: 32 }
    ]
  },
  {
    id: 'plastics',
    name: 'Mixed plastics (ABS / HIPS casing)',
    categoryGroup: 'Polymers',
    offered_rate: 18,
    fair_price: 22,
    price_30d_ago: 9.6,
    market_median_rate: 22,
    unit: 'kg',
    demand_forecast_kg: 8.0,
    actual_received_kg: 4.8,
    price_history: [
      { date: 'Sep 01', price: 9.6 },
      { date: 'Sep 06', price: 11.0 },
      { date: 'Sep 12', price: 13.5 },
      { date: 'Sep 18', price: 15.0 },
      { date: 'Sep 24', price: 17.0 },
      { date: 'Sep 30', price: 18.0 }
    ]
  },
  {
    id: 'copper_granules',
    name: 'Copper granules / chopped wire',
    categoryGroup: 'Non-Ferrous Metals',
    offered_rate: 395,
    fair_price: 390,
    price_30d_ago: 370,
    market_median_rate: 390,
    unit: 'kg',
    demand_forecast_kg: 20.0,
    actual_received_kg: 14.5,
    price_history: [
      { date: 'Sep 01', price: 370 },
      { date: 'Sep 06', price: 375 },
      { date: 'Sep 12', price: 380 },
      { date: 'Sep 18', price: 385 },
      { date: 'Sep 24', price: 390 },
      { date: 'Sep 30', price: 395 }
    ]
  },
  {
    id: 'aluminum_heatsink',
    name: 'Aluminum heatsink / extrusion (CPU / Power)',
    categoryGroup: 'Non-Ferrous Metals',
    offered_rate: 115,
    fair_price: 120,
    price_30d_ago: 108,
    market_median_rate: 120,
    unit: 'kg',
    demand_forecast_kg: 18.0,
    actual_received_kg: 11.2,
    price_history: [
      { date: 'Sep 01', price: 108 },
      { date: 'Sep 06', price: 110 },
      { date: 'Sep 12', price: 112 },
      { date: 'Sep 18', price: 114 },
      { date: 'Sep 24', price: 115 },
      { date: 'Sep 30', price: 115 }
    ]
  },
  {
    id: 'aluminum_casing',
    name: 'Aluminum casing / laptop shell',
    categoryGroup: 'Non-Ferrous Metals',
    offered_rate: 98,
    fair_price: 100,
    price_30d_ago: 90,
    market_median_rate: 100,
    unit: 'kg',
    demand_forecast_kg: 12.0,
    actual_received_kg: 7.8,
    price_history: [
      { date: 'Sep 01', price: 90 },
      { date: 'Sep 06', price: 92 },
      { date: 'Sep 12', price: 94 },
      { date: 'Sep 18', price: 96 },
      { date: 'Sep 24', price: 98 },
      { date: 'Sep 30', price: 98 }
    ]
  },
  {
    id: 'pcb_gold_fingers',
    name: 'PCB gold fingers / RAM / SIM strips',
    categoryGroup: 'Circuit Boards',
    offered_rate: 1250,
    fair_price: 1300,
    price_30d_ago: 1180,
    market_median_rate: 1300,
    unit: 'kg',
    demand_forecast_kg: 3.0,
    actual_received_kg: 1.8,
    price_history: [
      { date: 'Sep 01', price: 1180 },
      { date: 'Sep 06', price: 1200 },
      { date: 'Sep 12', price: 1220 },
      { date: 'Sep 18', price: 1235 },
      { date: 'Sep 24', price: 1245 },
      { date: 'Sep 30', price: 1250 }
    ]
  },
  {
    id: 'nimh_battery',
    name: 'NiMH battery pack (Power tools / Remotes)',
    categoryGroup: 'Batteries & Energy Storage',
    offered_rate: 62,
    fair_price: 65,
    price_30d_ago: 58,
    market_median_rate: 65,
    unit: 'kg',
    demand_forecast_kg: 8.0,
    actual_received_kg: 5.1,
    price_history: [
      { date: 'Sep 01', price: 58 },
      { date: 'Sep 06', price: 59 },
      { date: 'Sep 12', price: 60 },
      { date: 'Sep 18', price: 62 },
      { date: 'Sep 24', price: 62 },
      { date: 'Sep 30', price: 62 }
    ]
  },
  {
    id: 'lcd_panel',
    name: 'LCD / LED flat panel display',
    categoryGroup: 'Glass & Phosphors',
    offered_rate: 45,
    fair_price: 50,
    price_30d_ago: 42,
    market_median_rate: 50,
    unit: 'kg',
    demand_forecast_kg: 10.0,
    actual_received_kg: 6.4,
    price_history: [
      { date: 'Sep 01', price: 42 },
      { date: 'Sep 06', price: 43 },
      { date: 'Sep 12', price: 44 },
      { date: 'Sep 18', price: 44 },
      { date: 'Sep 24', price: 45 },
      { date: 'Sep 30', price: 45 }
    ]
  },
  {
    id: 'hard_plastic_abs',
    name: 'Hard plastic ABS (keyboards / monitors)',
    categoryGroup: 'Polymers',
    offered_rate: 14,
    fair_price: 16,
    price_30d_ago: 12,
    market_median_rate: 16,
    unit: 'kg',
    demand_forecast_kg: 6.0,
    actual_received_kg: 3.9,
    price_history: [
      { date: 'Sep 01', price: 12 },
      { date: 'Sep 06', price: 12 },
      { date: 'Sep 12', price: 13 },
      { date: 'Sep 18', price: 13 },
      { date: 'Sep 24', price: 14 },
      { date: 'Sep 30', price: 14 }
    ]
  },
  {
    id: 'steel_chassis',
    name: 'Steel chassis / server rack frame',
    categoryGroup: 'Ferrous Metals',
    offered_rate: 28,
    fair_price: 30,
    price_30d_ago: 26,
    market_median_rate: 30,
    unit: 'kg',
    demand_forecast_kg: 22.0,
    actual_received_kg: 16.3,
    price_history: [
      { date: 'Sep 01', price: 26 },
      { date: 'Sep 06', price: 27 },
      { date: 'Sep 12', price: 27 },
      { date: 'Sep 18', price: 28 },
      { date: 'Sep 24', price: 28 },
      { date: 'Sep 30', price: 28 }
    ]
  },
  {
    id: 'ferrous_mixed',
    name: 'Ferrous mixed scrap (iron / mild steel)',
    categoryGroup: 'Ferrous Metals',
    offered_rate: 22,
    fair_price: 24,
    price_30d_ago: 20,
    market_median_rate: 24,
    unit: 'kg',
    demand_forecast_kg: 30.0,
    actual_received_kg: 22.1,
    price_history: [
      { date: 'Sep 01', price: 20 },
      { date: 'Sep 06', price: 21 },
      { date: 'Sep 12', price: 21 },
      { date: 'Sep 18', price: 22 },
      { date: 'Sep 24', price: 22 },
      { date: 'Sep 30', price: 22 }
    ]
  },
  {
    id: 'capacitors_electrolytic',
    name: 'Electrolytic capacitors (bulk desoldered)',
    categoryGroup: 'Components',
    offered_rate: 55,
    fair_price: 60,
    price_30d_ago: 50,
    market_median_rate: 60,
    unit: 'kg',
    demand_forecast_kg: 5.0,
    actual_received_kg: 3.2,
    price_history: [
      { date: 'Sep 01', price: 50 },
      { date: 'Sep 06', price: 52 },
      { date: 'Sep 12', price: 53 },
      { date: 'Sep 18', price: 55 },
      { date: 'Sep 24', price: 55 },
      { date: 'Sep 30', price: 55 }
    ]
  },
  {
    id: 'transformers',
    name: 'Transformers / ballasts (copper core)',
    categoryGroup: 'Components',
    offered_rate: 72,
    fair_price: 75,
    price_30d_ago: 68,
    market_median_rate: 75,
    unit: 'kg',
    demand_forecast_kg: 7.0,
    actual_received_kg: 4.6,
    price_history: [
      { date: 'Sep 01', price: 68 },
      { date: 'Sep 06', price: 69 },
      { date: 'Sep 12', price: 70 },
      { date: 'Sep 18', price: 71 },
      { date: 'Sep 24', price: 72 },
      { date: 'Sep 30', price: 72 }
    ]
  },
  {
    id: 'toner_cartridge',
    name: 'Toner cartridge (laser printer)',
    categoryGroup: 'Consumables',
    offered_rate: 38,
    fair_price: 40,
    price_30d_ago: 35,
    market_median_rate: 40,
    unit: 'kg',
    demand_forecast_kg: 4.0,
    actual_received_kg: 2.5,
    price_history: [
      { date: 'Sep 01', price: 35 },
      { date: 'Sep 06', price: 36 },
      { date: 'Sep 12', price: 37 },
      { date: 'Sep 18', price: 37 },
      { date: 'Sep 24', price: 38 },
      { date: 'Sep 30', price: 38 }
    ]
  }
];

export const initialLots: LotItem[] = [
  {
    id: 'LOT-4873',
    collector_name: 'Subhash Das',
    collector_phone: '+91 98321 88410',
    collector_rating: 4.9,
    material_id: 'copper_stripped',
    material_name: 'Copper cable — stripped',
    quoted_weight: 7.6,
    quoted_rate: 410,
    offered_rate: 410,
    quoted_value: 3116,
    advance_pct: 0.80,
    advance_paid: 2492,
    status: 'pending_handover',
    handover_date: '2026-09-30 08:30',
    distance_km: 3.2,
    zone: 'Kharagpur - West',
    gps_coords: '22.3412° N, 87.3195° E',
    anomaly_flag: false
  },
  {
    id: 'LOT-4874',
    collector_name: 'Animesh Ghosh',
    collector_phone: '+91 97334 12903',
    collector_rating: 4.7,
    material_id: 'pcb_populated',
    material_name: 'PCB — populated (Server)',
    quoted_weight: 2.8,
    quoted_rate: 280,
    offered_rate: 280,
    quoted_value: 784,
    advance_pct: 0.80,
    advance_paid: 627,
    status: 'pending_handover',
    handover_date: '2026-09-30 09:10',
    distance_km: 5.4,
    zone: 'MIDC Industrial Belt',
    gps_coords: '22.3290° N, 87.3512° E',
    anomaly_flag: false
  },
  {
    id: 'LOT-4417',
    collector_name: 'Tarun Mondal',
    collector_phone: '+91 98321 00214',
    collector_rating: 4.8,
    material_id: 'li_battery',
    material_name: 'Li-ion battery pack',
    quoted_weight: 4.2,
    quoted_rate: 145,
    offered_rate: 145,
    quoted_value: 609,
    advance_pct: 0.80,
    advance_paid: 487,
    status: 'pending_handover',
    handover_date: '2026-09-30 09:45',
    distance_km: 1.8,
    zone: 'IIT KGP Campus periphery',
    gps_coords: '22.3188° N, 87.3021° E',
    anomaly_flag: false
  },
  {
    id: 'LOT-4796',
    collector_name: 'Raju Mondal',
    collector_phone: '+91 98321 44512',
    collector_rating: 4.8,
    material_id: 'copper_stripped',
    material_name: 'Copper cable — stripped',
    quoted_weight: 9.5,
    received_weight: 9.5,
    quoted_rate: 410,
    offered_rate: 410,
    quoted_value: 3895,
    advance_pct: 0.80,
    advance_paid: 3116,
    final_value: 3895,
    balance_amount: 779,
    status: 'settled',
    handover_date: '2026-09-29 16:40',
    distance_km: 4.1,
    zone: 'Kharagpur - West',
    gps_coords: '22.3389° N, 87.3241° E',
    anomaly_flag: false,
    cert_id: 'CPCB-DISP-2026-4796'
  },
  {
    id: 'LOT-4760',
    collector_name: 'Pradip Mukherjee',
    collector_phone: '+91 94340 77123',
    collector_rating: 4.9,
    material_id: 'copper_stripped',
    material_name: 'Copper cable — stripped',
    quoted_weight: 6.4,
    received_weight: 6.4,
    quoted_rate: 410,
    offered_rate: 410,
    quoted_value: 2624,
    advance_pct: 0.80,
    advance_paid: 2099,
    final_value: 2624,
    balance_amount: 525,
    status: 'settled',
    handover_date: '2026-09-29 14:15',
    distance_km: 3.8,
    zone: 'Kharagpur - West',
    gps_coords: '22.3421° N, 87.3180° E',
    anomaly_flag: false,
    cert_id: 'CPCB-DISP-2026-4760'
  },
  {
    id: 'LOT-4741',
    collector_name: 'Debasish Roy',
    collector_phone: '+91 97321 66543',
    collector_rating: 4.6,
    material_id: 'lead_acid',
    material_name: 'Lead-acid battery',
    quoted_weight: 18.5,
    received_weight: 18.5,
    quoted_rate: 88,
    offered_rate: 88,
    quoted_value: 1628,
    advance_pct: 0.80,
    advance_paid: 1302,
    final_value: 1628,
    balance_amount: 326,
    status: 'settled',
    handover_date: '2026-09-28 11:20',
    distance_km: 9.2,
    zone: 'Tamluk',
    gps_coords: '22.2980° N, 87.9210° E',
    anomaly_flag: false,
    cert_id: 'CPCB-DISP-2026-4741'
  },
  {
    id: 'LOT-4712',
    collector_name: 'Sanjoy Murmu',
    collector_phone: '+91 99330 22189',
    collector_rating: 4.7,
    material_id: 'plastics',
    material_name: 'Mixed plastics',
    quoted_weight: 42.0,
    received_weight: 40.0,
    quoted_rate: 18,
    offered_rate: 18,
    quoted_value: 756,
    advance_pct: 0.80,
    advance_paid: 605,
    final_value: 720,
    balance_amount: 115,
    status: 'settled',
    handover_date: '2026-09-27 15:10',
    distance_km: 6.7,
    zone: 'MIDC Industrial Belt',
    gps_coords: '22.3340° N, 87.3620° E',
    anomaly_flag: false,
    cert_id: 'CPCB-DISP-2026-4712'
  },
  {
    id: 'LOT-8774',
    collector_name: 'Kallol Barman',
    collector_phone: '+91 98322 19823',
    collector_rating: 3.9,
    material_id: 'li_battery',
    material_name: 'Li-ion battery pack',
    quoted_weight: 14.0,
    quoted_rate: 65,
    offered_rate: 65,
    quoted_value: 910,
    advance_pct: 0.0,
    advance_paid: 0,
    status: 'anomaly_review',
    handover_date: '2026-09-30 06:45',
    distance_km: 7.2,
    zone: 'MIDC Industrial Belt',
    gps_coords: '22.3312° N, 87.3590° E',
    anomaly_flag: true,
    anomaly_reason: 'Offered rate ₹65/kg is -55.2% below category median ₹145/kg (threshold >30%). Possible damaged/swollen cells or incorrect classification.',
    anomaly_deviation_pct: 55.2
  },
  {
    id: 'LOT-9712',
    collector_name: 'Bimal Roy',
    collector_phone: '+91 94344 32901',
    collector_rating: 4.1,
    material_id: 'pcb_populated',
    material_name: 'PCB — populated (Server)',
    quoted_weight: 8.5,
    quoted_rate: 120,
    offered_rate: 120,
    quoted_value: 1020,
    advance_pct: 0.0,
    advance_paid: 0,
    status: 'anomaly_review',
    handover_date: '2026-09-29 18:30',
    distance_km: 11.5,
    zone: 'Tamluk',
    gps_coords: '22.2890° N, 87.9120° E',
    anomaly_flag: true,
    anomaly_reason: 'Offered rate ₹120/kg is -63.6% below category median ₹330/kg (threshold >30%). Heavy corrosion / missing IC components reported.',
    anomaly_deviation_pct: 63.6
  }
];

export const initialReliability: ReliabilityMetrics = {
  on_time_rate: 0.92,
  honored_rate: 0.95,
  dispute_rate: 0.04,
  avg_settlement_hours: 18.0
};

export const zoneBreakdown: ZoneData[] = [
  {
    zone_name: 'Kharagpur — West',
    distance_band: '0-5 km',
    lots_count: 18,
    total_kg: 51,
    avg_transit_hours: 1.2
  },
  {
    zone_name: 'MIDC Industrial Belt',
    distance_band: '5-8 km',
    lots_count: 11,
    total_kg: 34,
    avg_transit_hours: 2.4
  },
  {
    zone_name: 'Tamluk Corridor',
    distance_band: '8-15 km',
    lots_count: 7,
    total_kg: 22,
    avg_transit_hours: 4.5
  },
  {
    zone_name: 'IIT KGP Campus periphery',
    distance_band: '0-2 km',
    lots_count: 4,
    total_kg: 9,
    avg_transit_hours: 0.8
  }
];

export const initialActivityLog: ActivityLogItem[] = [
  {
    id: 'act-1',
    timestamp: '08:42',
    type: 'handover',
    title: 'Handover confirmed',
    description: 'LOT-4985, PCB (populated), 4.1 kg verified at digital scale',
    lot_id: 'LOT-4985'
  },
  {
    id: 'act-2',
    timestamp: '08:15',
    type: 'advance',
    title: 'Advance released',
    description: 'LOT-4796, ₹3,116 (80% of quoted value) credited to Raju Mondal',
    lot_id: 'LOT-4796',
    amount: 3116
  },
  {
    id: 'act-3',
    timestamp: '07:30',
    type: 'match',
    title: 'New lot matched',
    description: 'LOT-4417, Li-ion battery pack, 4.2 kg matched via Smart Match Score 0.86',
    lot_id: 'LOT-4417'
  },
  {
    id: 'act-4',
    timestamp: '06:45',
    type: 'anomaly',
    title: 'Anomaly flagged',
    description: 'LOT-8774, Li-ion battery quoted ₹65/kg (55.2% below median). Advance held at 0%.',
    lot_id: 'LOT-8774'
  },
  {
    id: 'act-5',
    timestamp: 'Yesterday 17:10',
    type: 'settlement',
    title: 'Final settlement',
    description: 'LOT-4760, ₹525 final balance paid. CPCB Form 6 Certificate issued.',
    lot_id: 'LOT-4760',
    amount: 525
  }
];
