<div align="center">

<img src=".github/logo.svg" alt="Logo do Custom CPF" width="120" height="120">

# Custom CPF

**Gere e valide CPFs brasileiros direto no navegador.**<br>
Fixe os dígitos que quiser e o resto é preenchido aleatoriamente, com dígitos verificadores válidos. Para testar formulários e sistemas que exigem um CPF, sem usar um de verdade.

[![Demo ao vivo](https://img.shields.io/badge/Demo_ao_vivo-abrir-34D399?style=for-the-badge&logo=vercel&logoColor=white)](https://custom-cpf.vercel.app)

[![CI](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml/badge.svg)](https://github.com/obrenoalvim/custom-cpf/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/obrenoalvim/custom-cpf?style=flat&logo=github&color=34d399)](https://github.com/obrenoalvim/custom-cpf/stargazers)
[![100% client-side](https://img.shields.io/badge/privacidade-100%25_client--side-34d399)](#funcionalidades)

[English](README.md) · **Português**

[Funcionalidades](#funcionalidades) · [Como começar](#como-começar) · [Scripts](#scripts) · [Perguntas frequentes](#perguntas-frequentes) · [Aviso](#aviso)

</div>

---

Gera e valida CPFs brasileiros direto no navegador. Fixe os dígitos que quiser e o resto é preenchido aleatoriamente, calculando os dígitos verificadores automaticamente. Útil para testar formulários e sistemas que exigem um CPF sem usar um de verdade.

## Funcionalidades

- **Gerador de CPF**: preencha apenas os dígitos que deseja fixar, deixe o resto em branco para gerar aleatoriamente
- **Dígitos verificadores automáticos**: os dois dígitos de verificação são sempre calculados corretamente (algoritmo padrão de CPF, módulo 11)
- **Validador de CPF**: cole um CPF e veja instantaneamente se ele é matematicamente válido
- **Copiar para a área de transferência**: um clique para copiar o CPF gerado, já formatado (`000.000.000-00`)
- **Modo totalmente aleatório**: gera um CPF válido sem nenhum dígito fixado
- 100% client-side: nada é enviado para um servidor

## Tecnologias

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- lucide-react (ícones)

## Como começar

Teste sem instalar nada em [custom-cpf.vercel.app](https://custom-cpf.vercel.app).

Para rodar localmente:

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

---

## Perguntas frequentes

**O validador consulta alguma base do governo?**
Não. Ele checa só os dois dígitos verificadores, então diz se o número é matematicamente válido, não se está registrado em nome de alguém.

**Posso fixar alguns dígitos e sortear o resto?**
Pode. Preencha os dígitos que quer fixar, deixe os outros em branco, e o gerador completa e calcula os dois dígitos verificadores.

**Algo é enviado para um servidor?**
Não. Tudo roda no seu navegador.

**Um CPF gerado é seguro para usar como dado de teste?**
O número é aleatório com dígitos verificadores válidos, então um CPF gerado pode coincidir com o de uma pessoa real. Use só como dado de teste e nunca como identidade.

## Mais ferramentas web do mesmo autor

- [**diff-viewer**](https://github.com/obrenoalvim/diff-viewer): compare dois textos e veja o que mudou, no navegador.
- [**pdf-metadata-editor**](https://github.com/obrenoalvim/pdf-metadata-editor): edite título, autor e outros detalhes de um PDF no navegador.
- [**status-hub**](https://github.com/obrenoalvim/status-hub): um grid só para toda página de status que você confere.

## Contribuindo

Veja o [CONTRIBUTING.md](CONTRIBUTING.md) e o [changelog](CHANGELOG.md).

## Licença

[MIT](LICENSE)

---

<div align="center">

Se isso te poupou de digitar CPF falso na mão, uma ⭐ ajuda outras pessoas desenvolvedoras a encontrá-lo.

<sub>**Tópicos:** cpf · cpf-generator · cpf-validator · gerador-cpf · brazil · generator · validator · testing-tools · client-side · react · typescript</sub>

</div>
