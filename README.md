# Gestão de Contratos — CFCC/DPE-RN · versão GitHub Pages

Aplicação web de gestão e fiscalização de contratos administrativos, hospedada no **GitHub Pages** (código público) com os **dados no SharePoint** (privados, governados pela DPE/RN).

---

## ⚠️ Regra de ouro: nenhum dado neste repositório

O GitHub Pages é **público**. Este repositório contém **apenas o código** — a base de dados sai **vazia** de propósito (`SEED = []`). Os contratos vivem **exclusivamente** numa biblioteca do SharePoint e são carregados em tempo de execução pela pasta sincronizada.

**Nunca** faça commit do `contratos.json` nem de qualquer dado real para este repositório. O arquivo de dados é enviado para o SharePoint, não para o Git.

---

## Arquitetura

- **Código (público):** servido pelo GitHub Pages em `https://SEU-USUARIO.github.io/SEU-REPO/`. Acaba o lançador local `.bat`; abre direto no navegador.
- **Dados (privados):** arquivo `contratos.json` numa **biblioteca de documentos do SharePoint**, sincronizada localmente pelo cliente do OneDrive. O app lê e grava esse arquivo pela **File System Access API**.

### Limitações desta versão interina

- **Somente navegadores Chromium** (Chrome/Edge) — a File System Access API não existe no Firefox/Safari.
- **Locking otimista** (último a salvar vence) — adequado para poucos editores simultâneos.
- A migração para **Listas do SharePoint via Graph** (em standby com a TI) é o que remove essas duas limitações.

---

## Passo 1 — Publicar o código no GitHub Pages

1. Crie um repositório no GitHub (pode ser **privado** para limitar quem vê o código; o GitHub Pages de repositório privado exige plano pago — se for repositório **público**, lembre-se: só o código fica público, nunca os dados).
2. Envie os arquivos desta pasta: `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `README.md`.
3. Em **Settings → Pages**, selecione a branch (`main`) e a pasta raiz (`/root`). Salve.
4. Aguarde a URL `https://SEU-USUARIO.github.io/SEU-REPO/` ficar disponível.

> Observação sobre subpasta: o app usa caminhos relativos, então funciona tanto na raiz quanto numa subpasta de projeto do GitHub Pages.

## Passo 2 — Preparar os dados no SharePoint

1. Crie (ou use) uma **biblioteca de documentos** no site da CFCC, por exemplo `Contratos-Dados`.
2. Envie o arquivo **`contratos.json`** (fornecido separadamente, com a base atual de 88 contratos) para essa biblioteca.
3. Em cada máquina que vá usar o sistema, clique em **“Sincronizar”** na biblioteca (cliente do OneDrive). Ela passa a aparecer como uma pasta local no Windows.

## Passo 3 — Usar

1. Abra a URL do GitHub Pages no Chrome ou Edge.
2. O app abre **sem dados** e exibe um aviso. Clique no indicador **“◌ Local”** no topo e selecione a **pasta sincronizada do SharePoint** (a que contém o `contratos.json`).
3. A base carrega. A partir daí, edições gravam no `contratos.json` da pasta — e o cliente do OneDrive sincroniza para o SharePoint, propagando aos demais.
4. (Opcional) Instale como aplicativo: ícone de instalação na barra de endereço do Chrome/Edge.

---

## Camadas de proteção de dados

- **Versão de arquivo no SharePoint:** habilite o histórico de versões da biblioteca — cada gravação do `contratos.json` fica recuperável.
- **Backup JSON:** o app permite exportar a base a qualquer momento.
- **Exclusões permanentes:** registradas localmente (não voltam pelo seed nem pela sincronização).

> **Durabilidade.** O que você quer preservar deve estar na **pasta do SharePoint** (sincronizada) ou em **backup JSON**. O armazenamento local do navegador é apenas conveniência e é vinculado ao endereço do site.

---

## Ficha técnica

Titularidade: **DPE/RN — Coordenadoria de Fiscalização de Contratos e Convênios (CFCC)**.
Elaboração: **Rony Salles**, Coordenador da CFCC (matrícula nº 215.115-4).
Contato: fiscalizacao@dpern.def.br · (84) 98101-5804.
Licença: uso interno de capacitação e gestão da CFCC; citação exigida; vedadas alteração e utilização comercial.
© DPE/RN — CFCC. Proteção autoral automática (Lei nº 9.610/98); sem registro formal.
