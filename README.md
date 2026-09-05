English | [Português](README.pt.md)

# Custom CPF

[![CI](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Generates and validates Brazilian CPF numbers, right in your browser. Pin any digits you care about and it fills the rest randomly, computing valid check digits automatically — handy for testing forms and systems that require a CPF without using a real one.

**Live demo:** [custom-cpf.vercel.app](https://custom-cpf.vercel.app)

## Features

- **CPF generator**: fill in only the digits you want fixed, leave the rest blank for random ones
- **Automatic check digits**: the two verification digits are always computed correctly (standard CPF algorithm, mod 11)
- **CPF validator**: paste a CPF and instantly see if it's mathematically valid
- **Copy to clipboard**: one click to copy the generated CPF, formatted (`000.000.000-00`)
- **Fully random mode**: generate a valid CPF with no fixed digits at all
- 100% client-side — nothing is sent to a server

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- lucide-react (icons)

## Getting started

```bash
git clone https://github.com/obrenoalvim/custom-cpf.git
cd custom-cpf
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite (Vitest) |

## Disclaimer

This generator exists for **educational purposes and system testing only**. Do not use generated CPFs for fraudulent or illegal purposes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
