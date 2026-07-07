# Hello World - Vercel Node.js

Simple Hello World application untuk Vercel dengan Node.js runtime.

## Struktur Project

```
.
├── api/
│   └── hello.js          # Serverless function
├── package.json
├── vercel.json          # Konfigurasi Vercel
├── .gitignore
└── README.md
```

## Setup Lokal

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Test lokal dengan Vercel CLI:**
   ```bash
   npm run dev
   ```
   Akses di: `http://localhost:3000`

## Deploy ke Vercel

1. **Push ke GitHub:**
   ```bash
   git push
   ```

2. **Deploy via Vercel:**
   - Login ke [Vercel](https://vercel.com)
   - Import repository GitHub
   - Deploy dengan default settings

## Hasil

API akan return JSON response:
```json
{
  "message": "Hello, World! 👋",
  "timestamp": "2026-07-07T14:36:55.403+07:00",
  "environment": "production"
}
```

## Modifikasi

Edit `api/hello.js` untuk menambahkan logic yang lebih complex atau endpoint baru.