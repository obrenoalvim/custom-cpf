<div align="center">

<img src=".github/logo.svg" alt="Custom CPF logo" width="120" height="120">

# Custom CPF

**Generate and validate Brazilian CPF numbers in your browser.**<br>
Pin the digits you care about and it fills the rest at random, with valid check digits. For testing forms and systems that require a CPF, without using a real one.

[![Live demo](https://img.shields.io/badge/Live_demo-open-34D399?style=for-the-badge&logo=vercel&logoColor=white)](https://custom-cpf.vercel.app)

[![CI](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/obrenoalvim/custom-cpf?style=flat&logo=github&color=34d399)](https://github.com/obrenoalvim/custom-cpf/stargazers)
[![100% client-side](https://img.shields.io/badge/privacy-100%25_client--side-34d399)](#features)

**English** · [Português](README.pt.md)

[Features](#features) · [Getting started](#getting-started) · [Scripts](#scripts) · [FAQ](#faq) · [Disclaimer](#disclaimer)

</div>

---

Generates and validates Brazilian CPF numbers, right in your browser. Pin any digits you care about and it fills the rest randomly, computing valid check digits automatically. Handy for testing forms and systems that require a CPF without using a real one.

## Features

- **CPF generator**: fill in only the digits you want fixed, leave the rest blank for random ones
- **Automatic check digits**: the two verification digits are always computed correctly (standard CPF algorithm, mod 11)
- **CPF validator**: paste a CPF and instantly see if it's mathematically valid
- **Copy to clipboard**: one click to copy the generated CPF, formatted (`000.000.000-00`)
- **Fully random mode**: generate a valid CPF with no fixed digits at all
- 100% client-side: nothing is sent to a server

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- lucide-react (icons)

## Getting started

Try it without installing anything at [custom-cpf.vercel.app](https://custom-cpf.vercel.app).

To run it locally:

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

---

## FAQ

**Does the validator check a CPF against a government database?**
No. It checks only the two check digits, so it tells you whether a number is mathematically valid, not whether it is registered to a person.

**Can I fix some digits and randomize the rest?**
Yes. Fill in the digits you want fixed, leave the others blank, and the generator fills them in and computes both check digits.

**Is anything sent to a server?**
No. Everything runs in your browser.

**Is a generated CPF safe to use as test data?**
The number is random with valid check digits, so a generated CPF may happen to belong to a real person. Use it only as test data and never as an identity.

## More web tools by the same author

- [**diff-viewer**](https://github.com/obrenoalvim/diff-viewer): compare two pieces of text and see what changed, in your browser.
- [**pdf-metadata-editor**](https://github.com/obrenoalvim/pdf-metadata-editor): edit a PDF's title, author and other details in your browser.
- [**status-hub**](https://github.com/obrenoalvim/status-hub): one grid for every status page you check.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and the [changelog](CHANGELOG.md).

## License

[MIT](LICENSE)

---

<div align="center">

If this saved you from typing fake CPFs by hand, a ⭐ helps other developers find it.

<sub>**Topics:** cpf · cpf-generator · cpf-validator · gerador-cpf · brazil · generator · validator · testing-tools · client-side · react · typescript</sub>

</div>
