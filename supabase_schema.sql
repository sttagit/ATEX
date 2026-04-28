-- ============================================================
-- ATEX LEVANTAMIENTO — Supabase Schema
-- Pegar completo en: Supabase > SQL Editor > New Query
-- ============================================================

-- 1. TABLA DE PERFILES (extiende auth.users)
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  role        text default 'inspector',   -- 'inspector' | 'admin'
  plant       text default 'Planta Temuco',
  created_at  timestamptz default now()
);

-- Trigger: crear perfil automáticamente al registrar usuario
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. TABLA PRINCIPAL: REGISTROS DE EQUIPOS
create table if not exists public.registros (
  id            uuid default gen_random_uuid() primary key,
  equipo_id     text not null,
  equipo_nombre text not null,
  piso          text not null,
  grupo         text,

  -- Datos de placa
  marca         text,
  modelo        text,
  serie         text,
  potencia      text,
  marcado_ex    text,
  epl           text,
  temp_max      text,

  -- Clasificación ATEX
  zona          text,        -- '20' | '21' | '22' | 'NG'
  conformidad   text,        -- 'C' | 'NC' | 'OBS' | 'NA'

  -- Hallazgos
  hallazgo      text,
  accion        text,

  -- Fotos: array de paths en Storage
  fotos         text[] default '{}',

  -- Inspector que registró
  inspector_id  uuid references public.profiles(id) on delete set null,
  inspector_nombre text,

  -- Timestamps
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Índices
create index if not exists registros_equipo_id_idx on public.registros(equipo_id);
create index if not exists registros_inspector_idx on public.registros(inspector_id);
create index if not exists registros_zona_idx      on public.registros(zona);
create index if not exists registros_conf_idx      on public.registros(conformidad);

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_registros_updated_at on public.registros;
create trigger set_registros_updated_at
  before update on public.registros
  for each row execute procedure public.set_updated_at();

-- 3. RLS (Row Level Security)
alter table public.profiles  enable row level security;
alter table public.registros enable row level security;

-- Profiles: cada usuario ve/edita solo su perfil
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Registros: todos los autenticados ven todos los registros
create policy "registros_select_auth" on public.registros
  for select using (auth.role() = 'authenticated');

-- Registros: solo el inspector que creó puede editar/borrar
create policy "registros_insert_auth" on public.registros
  for insert with check (auth.role() = 'authenticated');

create policy "registros_update_own" on public.registros
  for update using (auth.uid() = inspector_id);

create policy "registros_delete_own" on public.registros
  for delete using (auth.uid() = inspector_id);

-- 4. STORAGE: bucket para fotos
-- Ejecutar también en: Storage > New bucket (o via SQL)
insert into storage.buckets (id, name, public)
values ('atex-fotos', 'atex-fotos', false)
on conflict (id) do nothing;

-- Policies de Storage
create policy "fotos_insert_auth" on storage.objects
  for insert with check (
    bucket_id = 'atex-fotos'
    and auth.role() = 'authenticated'
  );

create policy "fotos_select_auth" on storage.objects
  for select using (
    bucket_id = 'atex-fotos'
    and auth.role() = 'authenticated'
  );

create policy "fotos_delete_own" on storage.objects
  for delete using (
    bucket_id = 'atex-fotos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- 5. VISTA: resumen por inspector (útil para dashboard)
create or replace view public.resumen_inspectores as
select
  p.id,
  p.full_name,
  count(r.id)                                          as total,
  count(r.id) filter (where r.conformidad = 'C')       as conformes,
  count(r.id) filter (where r.conformidad = 'NC')      as no_conformes,
  count(r.id) filter (where r.conformidad = 'OBS')     as observaciones,
  count(r.id) filter (where r.conformidad = 'NA')      as no_aplica,
  max(r.updated_at)                                    as ultima_actividad
from public.profiles p
left join public.registros r on r.inspector_id = p.id
group by p.id, p.full_name;

-- ============================================================
-- FIN DEL SCHEMA
-- ============================================================
