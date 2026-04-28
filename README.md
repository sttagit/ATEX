# ATEX Levantamiento — CCU Chile · Planta Temuco

Aplicación web para levantamiento de placas y registro de condiciones ATEX en equipos eléctricos y mecánicos del Edificio de Molino.

**Stack:** HTML + Vanilla JS · Supabase · GitHub · Vercel  
**Norma:** UNE-EN 60079-10-2:2010 (IEC 60079-10-2:2009)

---

## Estructura de archivos

```
atex-app/
├── index.html          ← Login (email/contraseña)
├── app.html            ← Levantamiento de equipos
├── resumen.html        ← Dashboard KPIs + inspectores
├── informe.html        ← Generación y exportación de informe
├── src/
│   ├── supabase.js     ← Cliente Supabase + todas las queries
│   ├── equipos.js      ← Catálogo de 62 equipos CCU Temuco
│   └── styles.css      ← Estilos globales
├── vercel.json         ← Configuración de rutas Vercel
└── README.md
```

---

## PASO 1 — Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) e ingresa a tu proyecto.
2. En el menú lateral, abre **SQL Editor** → **New query**.
3. Copia y pega **todo el contenido** de `supabase_schema.sql` y ejecuta (▶).
4. Ve a **Settings → API** y copia:
   - `Project URL` → reemplaza `TU_PROYECTO.supabase.co` en `src/supabase.js`
   - `anon public key` → reemplaza `TU_ANON_KEY` en `src/supabase.js`

```js
// src/supabase.js — líneas 12-13
export const SUPABASE_URL  = 'https://xxxxxxxxxxxx.supabase.co';
export const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

5. Ve a **Authentication → Settings** y activa **Email confirmations** (recomendado).

---

## PASO 2 — Subir a GitHub

```bash
# En tu terminal, dentro de la carpeta atex-app/
git init
git add .
git commit -m "feat: ATEX levantamiento app inicial"

# Crear repo en github.com (nombre sugerido: atex-ccu-temuco)
git remote add origin https://github.com/TU_USUARIO/atex-ccu-temuco.git
git branch -M main
git push -u origin main
```

---

## PASO 3 — Publicar en Vercel

1. Ve a [vercel.com](https://vercel.com) → **Add New Project**.
2. Importa el repositorio `atex-ccu-temuco` desde GitHub.
3. Configuración del proyecto:
   - **Framework Preset:** `Other`
   - **Root Directory:** `/` (sin cambiar)
   - **Build Command:** *(dejar vacío)*
   - **Output Directory:** *(dejar vacío)*
4. Haz clic en **Deploy**.
5. En 30 segundos tendrás una URL como `atex-ccu-temuco.vercel.app`.

> **Nota:** Cada `git push` a `main` redesplegará automáticamente.

---

## PASO 4 — Crear el primer usuario

1. Abre la URL de tu app en el navegador.
2. Haz clic en **REGISTRAR** e ingresa:
   - Nombre completo
   - Email
   - Contraseña (mínimo 8 caracteres)
3. Confirma el email (si tienes email confirmations activado).
4. Ingresa con **INGRESAR**.

Para crear más usuarios (otros inspectores), comparte la URL y cada uno se registra con su propio email.

---

## Uso de la aplicación

### Página de Equipos (`/app.html`)
- Filtra por piso (P1 a P7 + Hangar).
- Toca cualquier equipo para abrir el formulario de levantamiento.
- Registra: marca, modelo, N° serie, marcado Ex, EPL, zona ATEX, conformidad.
- Sube fotos de la placa directamente desde el celular.
- Los datos se sincronizan en tiempo real con Supabase.

### Página de Resumen (`/resumen.html`)
- KPIs: total inspeccionado, conformes, no conformes, observaciones.
- Avance porcentual sobre los 62 equipos del catálogo.
- Desglose por inspector con barra de progreso individual.
- Tabla de hallazgos filtrable por estado (NC / OBS / C / NA).

### Página de Informe (`/informe.html`)
- Completa los datos del informe (inspector, fecha, conclusiones).
- Tabla completa de todos los hallazgos registrados.
- Exportar como **JSON**, **CSV** o **Markdown** para generar el informe Word.

---

## Equipos incluidos en el catálogo

| Piso | Equipos | Ejemplos |
|------|---------|---------|
| P1   | 9  | Redlers, conos de silos, transportadores |
| P2   | 8  | Tolvas de polvo, ciclón, filtros manga |
| P3   | 7  | Despedradora malta, molino inf., tolvas |
| P4   | 5  | Molino malta 6 cil., molino arroz 2 cil. |
| P5   | 8  | Filtros manga, despedradora arroz, silo batch |
| P6   | 11 | Cribas circulares, ventiladores, compresores |
| P7   | 8  | Balanzas, elevadores, silos 600 t |
| Hangar | 6 | Tolva recepción, pre-limpiadora, neumático arroz |
| **Total** | **62** | |

---

## Zonas ATEX del catálogo

Las zonas de referencia se asignan según la norma UNE-EN 60079-10-2 y los documentos CeCCU-TEM-ELA-MAN 006 Rev.07:

- **Zona 20** → Interior de tolvas, silos, ciclones, filtros manga (nube continua)
- **Zona 21** → Puntos de llenado/vaciado, elevadores, cribas, balanzas
- **Zona 22** → Compresores, filtros separadores, áreas adyacentes

El inspector puede reclasificar cualquier equipo durante el levantamiento.

---

## Troubleshooting

| Problema | Solución |
|----------|---------|
| `Cannot read properties of undefined (reading 'user')` | Verificar que `SUPABASE_URL` y `SUPABASE_ANON` estén correctos en `supabase.js` |
| Error al subir fotos | Verificar que el bucket `atex-fotos` fue creado y las policies de Storage aplicadas |
| No puedo registrarme | Revisar que Email Auth esté activado en Supabase → Authentication → Providers |
| Pantalla en blanco en Vercel | Revisar que `vercel.json` esté en la raíz del repositorio |

---

## Licencia

Uso interno CCU Chile — Planta Temuco.  
Generado para cumplimiento UNE-EN 60079-10-2:2010.
