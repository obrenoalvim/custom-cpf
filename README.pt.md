[English](README.md) | Português

# Custom CPF

[![CI](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Gera e valida CPFs brasileiros direto no navegador. Fixe os dígitos que quiser e o resto é preenchido aleatoriamente, calculando os dígitos verificadores automaticamente — útil para testar formulários e sistemas que exigem um CPF sem usar um de verdade.

**Demo ao vivo:** [custom-cpf.vercel.app](https://custom-cpf.vercel.app)

## Funcionalidades

- **Gerador de CPF**: preencha apenas os dígitos que deseja fixar, deixe o resto em branco para gerar aleatoriamente
- **Dígitos verificadores automáticos**: os dois dígitos de verificação são sempre calculados corretamente (algoritmo padrão de CPF, módulo 11)
- **Validador de CPF**: cole um CPF e veja instantaneamente se ele é matematicamente válido
- **Copiar para a área de transferência**: um clique para copiar o CPF gerado, já formatado (`000.000.000-00`)
- **Modo totalmente aleatório**: gera um CPF válido sem nenhum dígito fixado
- 100% client-side — nada é enviado para um servidor

## Tecnologias

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- lucide-react (ícones)

## Como começar

```bash
git clone https://github.com/obrenoalvim/custom-cpf.git
cd custom-cpf
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Scripts

| Comando | Descrição |
|---------|-------------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run test` | Roda a suíte de testes (Vitest) |

## Aviso

Este gerador existe **apenas para fins educacionais e testes de sistema**. Não use CPFs gerados para fins fraudulentos ou ilegais.

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

[MIT](LICENSE)
