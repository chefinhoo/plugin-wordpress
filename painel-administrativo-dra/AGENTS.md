# AGENTS.md - Painel Administrativo DRA

## Identidade do plugin
- Nome oficial: Painel Administrativo DRA
- Versao oficial: 1.0
- Tipo: Plugin WordPress com interface React no admin
- Licenca: GNU General Public License version 3 (GPLv3)

## Objetivo
Fornecer um painel administrativo em React integrado ao WordPress para uso proprietario da equipe DRA.

## Regras de propriedade e marca
- Este plugin foi preparado para uso proprietario DRA.
- Nao incluir referencias externas de marca de terceiros no codigo-fonte.
- Evitar URL de terceiros como identificador de propriedade.

## Mapeamento de arquivos
- `painel-administrativo-dra.php`
  - Header do plugin
  - Constantes globais
  - Bootstrap da classe principal
- `includes/class-dra-admin-plugin.php`
  - Registro do menu admin
  - Renderizacao do container React
  - Carregamento de CSS/JS
- `assets/dist/admin-app.js`
  - Aplicacao React compilada para o admin
- `assets/dist/admin-app.css`
  - Estilos visuais do painel
- `src/index.js`
  - Fonte React para manutencao e evolucao
- `readme.txt`
  - Metadados padrao WordPress
- `README.md`
  - Guia rapido do projeto
- `LICENSE`
  - Termos de licenciamento GPLv3

## Build e distribuicao
1. Instalar dependencias com npm.
2. Gerar bundle com npm run build.
3. Compactar a pasta `painel-administrativo-dra/` em ZIP.
4. Enviar ZIP para instalacao no WordPress.

## Checklist de publicacao
- Versao no header do plugin = 1.0
- Licenca no header = GPL-3.0-or-later
- Arquivo LICENSE presente
- Sem referencias proibidas de marca no codigo
- ZIP final gerado para instalacao
