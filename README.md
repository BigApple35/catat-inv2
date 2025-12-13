# 📘 Rangkumin.ai

Rangkumin.ai adalah aplikasi belajar berbasis AI yang dirancang untuk membantu pengguna belajar dengan lebih efektif, ringkas, dan terstruktur. Aplikasi ini mempermudah proses memahami materi dengan menyajikan rangkuman, flash card, dan quiz, sekaligus melacak progres pembelajaran pengguna.

---

## ✨ Fitur Utama

* **Rangkuman Otomatis**
  Mengubah materi belajar yang panjang menjadi rangkuman singkat dan mudah dipahami.

* **Flash Card Interaktif**
  Membantu mengingat poin-poin penting melalui flash card yang dihasilkan dari materi atau rangkuman.

* **Quiz Adaptif**
  Quiz dibuat berdasarkan materi dan rangkuman untuk menguji pemahaman pengguna.

* **Tracking Progres Belajar**
  Memonitor aktivitas belajar, hasil quiz, dan perkembangan pemahaman pengguna dari waktu ke waktu.

---

## 🎯 Tujuan

Rangkumin.ai bertujuan untuk:

* Membantu pelajar belajar lebih efisien
* Mengurangi waktu membaca materi panjang
* Meningkatkan daya ingat dan pemahaman
* Memberikan gambaran jelas tentang progres belajar

---

## 🚀 Manfaat

Dengan Rangkumin.ai, pengguna dapat:

* Belajar lebih fokus dan terarah
* Mengulang materi dengan cepat
* Mengukur kemampuan diri melalui quiz
* Konsisten dalam proses belajar

---

## 🧠 Cocok Untuk

* Pelajar dan mahasiswa
* Pembelajar mandiri
* Siapa saja yang ingin belajar lebih efektif dengan bantuan AI

---

## 📌 Catatan

Rangkumin.ai terus dikembangkan untuk menghadirkan pengalaman belajar yang semakin personal dan optimal.

---

> *Belajar tidak harus lama, yang penting paham.* ✨




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
