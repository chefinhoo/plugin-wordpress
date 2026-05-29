(function (wp) {
  if (!wp || !wp.element) {
    return;
  }

  var el = wp.element.createElement;
  var useState = wp.element.useState;
  var createRoot = wp.element.createRoot;
  var render = wp.element.render;

  var components = wp.components || {};
  var Button = components.Button || 'button';
  var Card = components.Card || 'div';
  var CardBody = components.CardBody || 'div';
  var Notice = components.Notice || 'div';

  function App() {
    var _useState = useState('home');
    var tab = _useState[0];
    var setTab = _useState[1];

    var _useState2 = useState(false);
    var saved = _useState2[0];
    var setSaved = _useState2[1];

    function saveChanges() {
      setSaved(true);
      window.setTimeout(function () {
        setSaved(false);
      }, 2000);
    }

    return el(
      'div',
      { className: 'dra-admin-shell' },
      saved
        ? el(
            Notice,
            {
              status: 'success',
              isDismissible: true,
              className: 'dra-admin-notice'
            },
            'Configuracoes salvas com sucesso.'
          )
        : null,
      el(
        'div',
        { className: 'dra-admin-tabs' },
        el(
          Button,
          {
            variant: tab === 'home' ? 'primary' : 'secondary',
            onClick: function () {
              setTab('home');
            }
          },
          'Inicio'
        ),
        el(
          Button,
          {
            variant: tab === 'modulos' ? 'primary' : 'secondary',
            onClick: function () {
              setTab('modulos');
            }
          },
          'Modulos'
        ),
        el(
          Button,
          {
            variant: tab === 'configuracoes' ? 'primary' : 'secondary',
            onClick: function () {
              setTab('configuracoes');
            }
          },
          'Configuracoes'
        ),
        el(
          Button,
          {
            variant: tab === 'categorias' ? 'primary' : 'secondary',
            onClick: function () {
              setTab('categorias');
            }
          },
          'Categorias'
        )
      ),
      el(
        Card,
        { className: 'dra-admin-card' },
        el(
          CardBody,
          null,
          tab === 'home'
            ? el(
                'div',
                null,
                el('h2', null, 'Visao geral'),
                el('p', null, 'Painel React carregado dentro do WordPress com identidade proprietaria DRA.')
              )
            : null,
          tab === 'modulos'
            ? el(
                'div',
                null,
                el('h2', null, 'Modulos do sistema'),
                el(
                  'ul',
                  null,
                  el('li', null, 'Gestao de blocos administrativos'),
                  el('li', null, 'Ajustes de navegacao interna'),
                  el('li', null, 'Controle de preferencias do painel')
                )
              )
            : null,
          tab === 'configuracoes'
            ? el(
                'div',
                null,
                el('h2', null, 'Configuracoes'),
                el('p', null, 'Edite opcoes do painel e salve para manter seu fluxo operacional.'),
                el(
                  Button,
                  {
                    variant: 'primary',
                    onClick: saveChanges
                  },
                  'Salvar alteracoes'
                )
              )
            : null
            ,
          tab === 'categorias'
            ? el(
                'div',
                null,
                el('h2', null, 'Categorias'),
                el('p', null, 'Conteudo de categorias preparado para organizacao editorial e administrativa.'),
                el(
                  'ul',
                  null,
                  el('li', null, 'Categorias principais ativas'),
                  el('li', null, 'Subcategorias habilitadas'),
                  el('li', null, 'Padrao de nomenclatura interno DRA')
                )
              )
            : null
        )
      )
    );
  }

  var rootElement = document.getElementById('dra-admin-root');

  if (!rootElement) {
    return;
  }

  if (typeof createRoot === 'function') {
    createRoot(rootElement).render(el(App));
  } else if (typeof render === 'function') {
    render(el(App), rootElement);
  }
})(window.wp);
