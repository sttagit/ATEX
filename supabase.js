// src/supabase.js
// ─── Supabase client + todas las funciones de DB/Storage ─────────────────────
// Reemplaza los valores de SUPABASE_URL y SUPABASE_ANON_KEY con los de tu proyecto
// Supabase > Settings > API

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ── CONFIG ────────────────────────────────────────────────────────────────────
// Estas variables se inyectan desde vercel.json / .env en producción.
// En desarrollo local, edítalas directamente aquí o usa un .env.
export const SUPABASE_URL  = window.__SUPABASE_URL__  || 'https://nyqqaaqxjdmedggpkxbj.supabase.co/rest/v1/';
export const SUPABASE_ANON = window.__SUPABASE_ANON__ || 'sb_publishable_mtcCcCdVScjQQHtIQxUpYQ_awU9gt_j';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── AUTH ──────────────────────────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── REGISTROS ─────────────────────────────────────────────────────────────────

/** Obtiene todos los registros (todos los inspectores) */
export async function getAllRegistros() {
  const { data, error } = await supabase
    .from('registros')
    .select('*, profiles(full_name)')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Obtiene solo los registros del inspector logueado */
export async function getMisRegistros(inspectorId) {
  const { data, error } = await supabase
    .from('registros')
    .select('*')
    .eq('inspector_id', inspectorId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Obtiene un registro por equipo_id (puede haber varias versiones de inspectores) */
export async function getRegistroByEquipo(equipoId) {
  const { data, error } = await supabase
    .from('registros')
    .select('*, profiles(full_name)')
    .eq('equipo_id', equipoId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data; // array — puede haber múltiples inspectores
}

/** Upsert: crea o actualiza el registro del inspector actual para ese equipo */
export async function upsertRegistro(payload) {
  // Buscar si ya existe un registro del mismo inspector+equipo
  const { data: existing } = await supabase
    .from('registros')
    .select('id')
    .eq('equipo_id', payload.equipo_id)
    .eq('inspector_id', payload.inspector_id)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from('registros')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('registros')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export async function deleteRegistro(id) {
  const { error } = await supabase.from('registros').delete().eq('id', id);
  if (error) throw error;
}

/** Resumen estadístico de todos los registros */
export async function getResumenStats() {
  const { data, error } = await supabase
    .from('registros')
    .select('equipo_id, conformidad, zona, inspector_id, profiles(full_name)');
  if (error) throw error;

  const total    = data.length;
  const conf     = data.filter(r => r.conformidad === 'C').length;
  const nc       = data.filter(r => r.conformidad === 'NC').length;
  const obs      = data.filter(r => r.conformidad === 'OBS').length;
  const na       = data.filter(r => r.conformidad === 'NA').length;
  const byZona   = { '20': 0, '21': 0, '22': 0, 'NG': 0, '': 0 };
  data.forEach(r => { byZona[r.zona || ''] = (byZona[r.zona || ''] || 0) + 1; });

  return { total, conf, nc, obs, na, byZona, raw: data };
}

/** Inspectores con sus conteos */
export async function getResumenInspectores() {
  const { data, error } = await supabase
    .from('resumen_inspectores')
    .select('*');
  if (error) throw error;
  return data;
}

// ── STORAGE: FOTOS ────────────────────────────────────────────────────────────
const BUCKET = 'atex-fotos';

/** Sube un archivo File y retorna el path en Storage */
export async function uploadFoto(userId, equipoId, file) {
  const ext  = file.name.split('.').pop();
  const path = `${userId}/${equipoId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;
  return path;
}

/** Genera una URL firmada válida por 1 hora */
export async function getFotoUrl(path) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 3600);
  if (error) throw error;
  return data.signedUrl;
}

/** Genera URLs firmadas para un array de paths */
export async function getFotoUrls(paths) {
  if (!paths || !paths.length) return [];
  const promises = paths.map(p => getFotoUrl(p));
  return Promise.all(promises);
}

/** Elimina una foto del bucket */
export async function deleteFoto(path) {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
