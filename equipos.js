// src/equipos.js
// Catálogo completo de equipos — CCU Chile · Planta Temuco · Edificio Molino
// Fuente: CeCCU-TEM-ELA-MAN 006 Rev.07 (Nov 2017)

export const EQUIPOS = [
  // ── PISO 1 ────────────────────────────────────────────────────────────────
  { id:'e001', nombre:'Redlers y elevadores de capacho',         piso:'1', grupo:'Transporte',          zona_ref:'21' },
  { id:'e002', nombre:'Cono salida silos de malta',              piso:'1', grupo:'Almacenamiento',       zona_ref:''   },
  { id:'e003', nombre:'Cono salida silos de arroz',              piso:'1', grupo:'Almacenamiento',       zona_ref:''   },
  { id:'e004', nombre:'Compuertas de silos de malta',            piso:'1', grupo:'Válvulas/Compuertas',  zona_ref:''   },
  { id:'e005', nombre:'Compuertas de silos de malta y arroz',    piso:'1', grupo:'Válvulas/Compuertas',  zona_ref:''   },
  { id:'e006', nombre:'Transporte preparación de carga e intersilos', piso:'1', grupo:'Transporte',     zona_ref:'21' },
  { id:'e007', nombre:'Succión de polvos descarga de malta (x2)', piso:'1', grupo:'Aspiración de polvos', zona_ref:'21'},
  { id:'e008', nombre:'Redler transporte descarga de malta',     piso:'1', grupo:'Transporte',          zona_ref:'21' },
  { id:'e009', nombre:'Agua proceso al premacerador',            piso:'1', grupo:'Servicios',            zona_ref:'NG' },

  // ── PISO 2 ────────────────────────────────────────────────────────────────
  { id:'e010', nombre:'Compresor tolva polvo recepción malta',   piso:'2', grupo:'Compresor',            zona_ref:'22' },
  { id:'e011', nombre:'Tolva de polvo (parte inferior)',         piso:'2', grupo:'Contenedor de polvo',  zona_ref:'20' },
  { id:'e012', nombre:'Ciclón filtro manga recepción de arroz',  piso:'2', grupo:'Filtración de polvo',  zona_ref:'21' },
  { id:'e013', nombre:'Tolva harina de malta (parte inferior)',  piso:'2', grupo:'Contenedor de polvo',  zona_ref:'20' },
  { id:'e014', nombre:'Tolva harina de arroz (parte inferior)',  piso:'2', grupo:'Contenedor de polvo',  zona_ref:'20' },
  { id:'e015', nombre:'Elevador de capachos (despedradora → acondicionador)', piso:'2', grupo:'Transporte', zona_ref:'21' },
  { id:'e016', nombre:'Filtro separador mangas descarga de arroz', piso:'2', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e017', nombre:'Tolva polvos malta a silos de orujo',     piso:'2', grupo:'Contenedor de polvo',  zona_ref:'20' },

  // ── PISO 3 ────────────────────────────────────────────────────────────────
  { id:'e018', nombre:'Compresor polvo sistema recepción arroz', piso:'3', grupo:'Compresor',            zona_ref:'22' },
  { id:'e019', nombre:'Tolva de polvo / Tolva de malta (parte inf.)', piso:'3', grupo:'Contenedor de polvo', zona_ref:'20' },
  { id:'e020', nombre:'Molino parte inferior — descarga tolva a redler', piso:'3', grupo:'Molienda',     zona_ref:'21' },
  { id:'e021', nombre:'Despedradora de malta',                   piso:'3', grupo:'Limpieza de grano',    zona_ref:'21' },
  { id:'e022', nombre:'Tolva de arroz',                          piso:'3', grupo:'Almacenamiento',       zona_ref:'21' },
  { id:'e023', nombre:'Compuerta silo batch',                    piso:'3', grupo:'Válvulas/Compuertas',  zona_ref:''   },
  { id:'e024', nombre:'Tolva de harina de malta',                piso:'3', grupo:'Contenedor de polvo',  zona_ref:'20' },

  // ── PISO 4 ────────────────────────────────────────────────────────────────
  { id:'e025', nombre:'Molino de malta (6 cilindros — 11 ton/h)', piso:'4', grupo:'Molienda',            zona_ref:'21' },
  { id:'e026', nombre:'Silo batch malta (parte inferior — 11,5 t)', piso:'4', grupo:'Contenedor de polvo', zona_ref:'20' },
  { id:'e027', nombre:'Molino de arroz (2 cilindros — 5 ton/h)', piso:'4', grupo:'Molienda',             zona_ref:'21' },
  { id:'e028', nombre:'Succión de polvos molino de malta',        piso:'4', grupo:'Aspiración de polvos', zona_ref:'21' },
  { id:'e029', nombre:'Succión de polvos malta a humectación',    piso:'4', grupo:'Aspiración de polvos', zona_ref:'21' },

  // ── PISO 5 ────────────────────────────────────────────────────────────────
  { id:'e030', nombre:'Filtro manga tolva de recepción (parte inf.)', piso:'5', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e031', nombre:'Tornillo acondicionador / humectador (11 ton/h)', piso:'5', grupo:'Acondicionamiento', zona_ref:'22' },
  { id:'e032', nombre:'Silo Batch malta (parte superior)',        piso:'5', grupo:'Contenedor de polvo',  zona_ref:'20' },
  { id:'e033', nombre:'Filtro manga polvo equipos malta (parte inf.)', piso:'5', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e034', nombre:'Filtro manga polvo equipos arroz (parte inf.)', piso:'5', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e035', nombre:'Despedradora de arroz (8 ton/h)',          piso:'5', grupo:'Limpieza de grano',    zona_ref:'21' },
  { id:'e036', nombre:'Filtro manga arroz a molienda (parte inf.) + desvíos', piso:'5', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e037', nombre:'Succión de polvos despedradora de arroz',  piso:'5', grupo:'Aspiración de polvos', zona_ref:'21' },

  // ── PISO 6 ────────────────────────────────────────────────────────────────
  { id:'e038', nombre:'Filtro manga polvo tolva recepción (parte sup.)', piso:'6', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e039', nombre:'Redlers alimentación criba circular de malta', piso:'6', grupo:'Transporte',       zona_ref:'21' },
  { id:'e040', nombre:'Criba circular de malta / limpiadora (20 ton/h)', piso:'6', grupo:'Limpieza de grano', zona_ref:'21' },
  { id:'e041', nombre:'Filtro manga polvo equipos malta (parte sup.)', piso:'6', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e042', nombre:'Filtro manga polvo equipos arroz (parte sup.)', piso:'6', grupo:'Filtración de polvo', zona_ref:'22' },
  { id:'e043', nombre:'Compresor sistema neumático arroz a molienda + filtro ciclón', piso:'6', grupo:'Compresor', zona_ref:'22' },
  { id:'e044', nombre:'Elevador alimentación criba circular de arroz', piso:'6', grupo:'Transporte',      zona_ref:'21' },
  { id:'e045', nombre:'Criba circular arroz (20 ton/h)',           piso:'6', grupo:'Limpieza de grano',   zona_ref:'21' },
  { id:'e046', nombre:'Ventilador filtro manga polvo equipos malta', piso:'6', grupo:'Ventilación',        zona_ref:'22' },
  { id:'e047', nombre:'Ventilador filtro manga polvo equipos arroz', piso:'6', grupo:'Ventilación',       zona_ref:'22' },
  { id:'e048', nombre:'Filtro separador mangas ambiente arroz y malta', piso:'6', grupo:'Filtración de polvo', zona_ref:'22' },

  // ── PISO 7 ────────────────────────────────────────────────────────────────
  { id:'e049', nombre:'Terminación elevador de malta',            piso:'7', grupo:'Transporte',          zona_ref:'21' },
  { id:'e050', nombre:'Terminación elevador de arroz',            piso:'7', grupo:'Transporte',          zona_ref:'21' },
  { id:'e051', nombre:'Balanza en línea malta (50 ton/h)',         piso:'7', grupo:'Pesaje',              zona_ref:'21' },
  { id:'e052', nombre:'Balanza en línea arroz',                   piso:'7', grupo:'Pesaje',              zona_ref:'21' },
  { id:'e053', nombre:'Silos de malta (6 silos — 600 ton total)', piso:'7', grupo:'Almacenamiento',       zona_ref:'20' },
  { id:'e054', nombre:'Terminación sistema extracción polvo tolva recepción', piso:'7', grupo:'Aspiración de polvos', zona_ref:'21' },
  { id:'e055', nombre:'Succión polvos distribuidor malta a silos', piso:'7', grupo:'Aspiración de polvos', zona_ref:'21' },
  { id:'e056', nombre:'Succión polvos arroz a intersilos',         piso:'7', grupo:'Aspiración de polvos', zona_ref:'21' },

  // ── HANGAR / PATIO ────────────────────────────────────────────────────────
  { id:'e057', nombre:'Tolva de recepción malta (6 m³ — 2.300 kg)', piso:'hangar', grupo:'Contenedor de polvo', zona_ref:'21' },
  { id:'e058', nombre:'Pre-limpiadora malta',                     piso:'hangar', grupo:'Limpieza de grano', zona_ref:'21' },
  { id:'e059', nombre:'Transportadores de cadena recepción malta (50 ton/h)', piso:'hangar', grupo:'Transporte', zona_ref:'21' },
  { id:'e060', nombre:'Elevador de capachos recepción malta (50 ton/h)', piso:'hangar', grupo:'Transporte', zona_ref:'21' },
  { id:'e061', nombre:'Sistema neumático aspiración arroz (30 ton/h)', piso:'hangar', grupo:'Transporte',  zona_ref:'21' },
  { id:'e062', nombre:'Silos de arroz / intersilos (325 ton)',     piso:'hangar', grupo:'Almacenamiento',  zona_ref:'20' },
];

export const FLOOR_LABELS = {
  '1':      'Primer piso',
  '2':      'Segundo piso',
  '3':      'Tercer piso',
  '4':      'Cuarto piso',
  '5':      'Quinto piso',
  '6':      'Sexto piso',
  '7':      'Séptimo piso',
  'hangar': 'Hangar / Patio de recepción',
};

export const ZONE_META = {
  '20': { label:'Zona 20', color:'#7c3aed', bg:'#ede9fe', text:'#5b21b6', desc:'Nube explosiva permanente o frecuente' },
  '21': { label:'Zona 21', color:'#d97706', bg:'#fef3c7', text:'#92400e', desc:'Nube probable en operación normal' },
  '22': { label:'Zona 22', color:'#059669', bg:'#d1fae5', text:'#065f46', desc:'Nube improbable o de corta duración' },
  'NG': { label:'No peligroso', color:'#6b7280', bg:'#f3f4f6', text:'#374151', desc:'Sin riesgo de atmósfera explosiva' },
  '':   { label:'Sin clasificar', color:'#9ca3af', bg:'#f9fafb', text:'#6b7280', desc:'Pendiente de clasificación' },
};

export const CONF_META = {
  'C':   { label:'Conforme',       color:'#059669', bg:'#d1fae5', text:'#065f46' },
  'NC':  { label:'No conforme',    color:'#dc2626', bg:'#fee2e2', text:'#991b1b' },
  'OBS': { label:'Observación',    color:'#d97706', bg:'#fef3c7', text:'#92400e' },
  'NA':  { label:'No aplica',      color:'#6b7280', bg:'#f3f4f6', text:'#374151' },
};

export const EPL_OPTIONS = [
  'EPL Da / Cat. 1D — Protección muy alta',
  'EPL Db / Cat. 2D — Protección alta',
  'EPL Dc / Cat. 3D — Protección mejorada',
  'Sin marcado Ex — requiere reemplazo',
  'Marcado no visible / ilegible',
  'Equipo no eléctrico / mecánico',
];

export function getEquipoById(id) {
  return EQUIPOS.find(e => e.id === id);
}

export function getEquiposByPiso(piso) {
  if (piso === 'all') return EQUIPOS;
  return EQUIPOS.filter(e => e.piso === piso);
}
