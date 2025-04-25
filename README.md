# Demo Monorepo

Monorepo cu stack modern: **Turborepo**, **Next.js**, **TailwindCSS**, **shadcn/ui**, **Prisma**, **Supabase**.

## Structură

```
/
├── apps
│   └── web          # Aplicația principală (Next.js)
├── packages
│   ├── app-main     # Componente comune: Topbar, Leftbar, Login
│   ├── notes        # Aplicație basic de notițe
│   └── twiter       # Clone simplificat de Twitter
├── prisma
│   └── schema.prisma
├── turbo.json
├── tsconfig.base.json
└── package.json
```

## Setup

### 1. Instalează dependințele

Asigură-te că ai instalat `pnpm`, apoi:

```bash
pnpm install
```

### 2. Setup baza de date (Supabase)

- Creează un proiect pe [https://supabase.io](https://supabase.io)
- Copiază `SUPABASE_URL` și `SUPABASE_KEY` în fișierul `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
DATABASE_URL=postgresql://user:password@host:port/dbname
```

### 3. Rulează Prisma

```bash
npx prisma generate
npx prisma db push
```

### 4. Pornește aplicația

```bash
pnpm dev --filter web
```

Accesează `http://localhost:3000`

## Feature-uri

- **Autentificare cu Supabase**
- **Componente UI cu shadcn/ui**
- **Prisma pentru ORM și DB management**
- **TailwindCSS pentru styling**
- **Twitter Clone și Notes app ca module**
- **Partajare cod între pachete cu Turborepo**

---

Made with **love** și un stack modern.
