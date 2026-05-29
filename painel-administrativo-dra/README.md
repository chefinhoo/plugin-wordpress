# Painel Administrativo DRA

Plugin WordPress com painel administrativo em React.

## Versao
- 1.0

## Licenca
- GNU General Public License version 3 (GPLv3)
- https://www.gnu.org/licenses/gpl-3.0.html

## Estrutura
- `painel-administrativo-dra.php`: arquivo principal do plugin.
- `includes/class-dra-admin-plugin.php`: registro da pagina admin e enqueue de assets.
- `assets/dist/admin-app.js`: bundle JavaScript React para o painel.
- `assets/dist/admin-app.css`: estilo do painel administrativo.
- `src/index.js`: fonte React para desenvolvimento.
- `AGENTS.md`: guia operacional e documentacao consolidada do plugin.

## Desenvolvimento local
```bash
npm install
npm run build
```

Depois de buildar, ative o plugin no WordPress e acesse o menu Painel DRA.
