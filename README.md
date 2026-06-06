# CpE Toolkit

A collection of interactive tools built for Computer Engineering students.
No backend, no login — just open it and use it.

🔗 **Live site:** https://cpe-toolkit.vercel.app

---

## Tools

### Phase 1 — Core Calculators
- **Binary Converter** — Convert between decimal, binary, hex, and octal instantly
- **Decimal ↔ Hex Converter** — Two-way live conversion with binary and HTML color output
- **Ohm's Law Calculator** — Enter any two of V, I, R, P and the rest are calculated
- **Unit Converter** — Length, mass, frequency, and data storage conversions

### Phase 2 — Logic & Systems
- **Truth Table Generator** — Type any Boolean expression (AND, OR, NOT, XOR, NAND, NOR) and get the full truth table
- **Logic Gate Simulator** — Toggle inputs and see gate outputs update in real time with visual diagrams
- **Number System Quiz** — Test your knowledge of binary, hex, and octal conversions

### Phase 3 — Advanced Tools
- **CPU Visualizer** — Step through the Fetch → Decode → Execute → Write Back cycle interactively
- **Circuit Notes** — Save, search, and organize notes about circuits and components (persists locally)

---

## Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework |
| Tailwind CSS v4 | Styling |
| Vercel | Deployment |
| GitHub | Version control |

---

## Features

- ⚡ Instant calculations — no submit button needed
- 🌙 Dark / light mode toggle
- 📱 Responsive — works on mobile and desktop
- 💾 Circuit notes saved to local storage
- 🚀 Deployed and publicly accessible

---

## Run locally

```bash
git clone https://github.com/caralimanvincezachary/cpe-toolkit.git
cd cpe-toolkit
npm install
npm run dev
```

Open http://localhost:5173

---

## About

Built as a first side project while studying Computer Engineering.
The goal was to create something useful, deploy it publicly, and learn React in the process.