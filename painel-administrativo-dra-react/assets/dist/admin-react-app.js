(function (wp) {
  if (!wp || !wp.element) return;

  var el = wp.element.createElement;
  var useState = wp.element.useState;
  var useEffect = wp.element.useEffect;
  var components = wp.components || {};
  var Button = components.Button || 'button';
  var Card = components.Card || 'div';
  var CardBody = components.CardBody || 'div';
  var TextControl = components.TextControl || 'input';
  var TextareaControl = components.TextareaControl || 'textarea';
  var SelectControl = components.SelectControl || 'select';
  var Notice = components.Notice || 'div';

  function api(path, options) {
    var data = window.draPanelData || {};
    var merged = Object.assign({
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': data.nonce || ''
      }
    }, options || {});

    merged.headers = Object.assign({
      'Content-Type': 'application/json',
      'X-WP-Nonce': data.nonce || ''
    }, merged.headers || {});

    return window.fetch(window.location.origin + '/wp-json' + path, merged).then(function (response) {
      return response.json().then(function (body) {
        return { ok: response.ok, status: response.status, body: body };
      });
    });
  }

  function App() {
    var _useState = useState('home');
    var tab = _useState[0];
    var setTab = _useState[1];
    var _useState2 = useState([]);
    var posts = _useState2[0];
    var setPosts = _useState2[1];
    var _useState3 = useState([]);
    var cats = _useState3[0];
    var setCats = _useState3[1];
    var _useState4 = useState({ title: '', content: '', category: '', status: 'draft' });
    var form = _useState4[0];
    var setForm = _useState4[1];
    var _useState5 = useState('');
    var message = _useState5[0];
    var setMessage = _useState5[1];
    var _useState6 = useState({ brandTitle: '', showLogo: false });
    var settings = _useState6[0];
    var setSettings = _useState6[1];

    useEffect(function () {
      if (tab === 'news' || tab === 'newpost') {
        api('/wp/v2/posts?per_page=10&_fields=id,title,link,status').then(function (res) {
          setPosts(res.ok ? res.body : []);
        });
      }
      if (tab === 'categories' || tab === 'newpost') {
        api('/wp/v2/categories?per_page=100&_fields=id,name,slug,count').then(function (res) {
          setCats(res.ok ? res.body : []);
        });
      }
      if (tab === 'settings') {
        api('/dra-react/v1/settings').then(function (res) {
          if (res.ok && res.body) {
            setSettings({
              brandTitle: res.body.brandTitle || '',
              showLogo: !!res.body.showLogo
            });
          }
        });
      }
    }, [tab]);

    function savePost() {
      var payload = {
        title: form.title,
        content: form.content,
        status: form.status,
        categories: form.category ? [parseInt(form.category, 10)] : []
      };
      api('/wp/v2/posts', {
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok) {
          setMessage('Novo post criado com sucesso.');
          setTab('news');
        } else {
          setMessage('Erro ao criar post.');
        }
      });
    }

    function saveSettings() {
      api('/dra-react/v1/settings', {
        method: 'POST',
        body: JSON.stringify(settings)
      }).then(function (res) {
        setMessage(res.ok ? 'Configurações salvas.' : 'Erro ao salvar configurações.');
      });
    }

    return el('div', { className: 'dra-react-shell' },
      message ? el(Notice, { status: 'info', isDismissible: true }, message) : null,
      el('div', { className: 'dra-react-tabs' },
        el(Button, { variant: tab === 'home' ? 'primary' : 'secondary', onClick: function () { setTab('home'); } }, 'Início'),
        el(Button, { variant: tab === 'news' ? 'primary' : 'secondary', onClick: function () { setTab('news'); } }, 'Notícias'),
        el(Button, { variant: tab === 'categories' ? 'primary' : 'secondary', onClick: function () { setTab('categories'); } }, 'Categorias'),
        el(Button, { variant: tab === 'newpost' ? 'primary' : 'secondary', onClick: function () { setTab('newpost'); } }, 'Novo Post'),
        el(Button, { variant: tab === 'modules' ? 'primary' : 'secondary', onClick: function () { setTab('modules'); } }, 'Módulos'),
        el(Button, { variant: tab === 'settings' ? 'primary' : 'secondary', onClick: function () { setTab('settings'); } }, 'Configurações')
      ),
      el(Card, { className: 'dra-react-card' },
        el(CardBody, null,
          tab === 'home' ? el('div', null,
            el('h2', null, 'Página Inicial'),
            el('p', null, 'Visão geral do painel com o comportamento original portado para React.'),
            el('ul', null,
              el('li', null, 'Notícias e categorias integradas ao WordPress'),
              el('li', null, 'Novo post via REST API'),
              el('li', null, 'Configurações mínimas do painel'))
          ) : null,
          tab === 'news' ? el('div', null,
            el('h2', null, 'Notícias'),
            el('ul', null, posts.map(function (post) {
              return el('li', { key: post.id }, (post.title && post.title.rendered) ? post.title.rendered : 'Sem título');
            }))
          ) : null,
          tab === 'categories' ? el('div', null,
            el('h2', null, 'Categorias'),
            el('ul', null, cats.map(function (cat) {
              return el('li', { key: cat.id }, cat.name + ' (' + cat.count + ')');
            }))
          ) : null,
          tab === 'newpost' ? el('div', null,
            el('h2', null, 'Novo Post'),
            el(TextControl, { value: form.title, onChange: function (value) { setForm(Object.assign({}, form, { title: value })); }, placeholder: 'Título' }),
            el(TextareaControl, { value: form.content, onChange: function (value) { setForm(Object.assign({}, form, { content: value })); }, placeholder: 'Conteúdo' }),
            el(SelectControl, { value: form.category, onChange: function (value) { setForm(Object.assign({}, form, { category: value })); }, options: [{ label: 'Selecione categoria', value: '' }].concat(cats.map(function (cat) { return { label: cat.name, value: String(cat.id) }; })) }),
            el(SelectControl, { value: form.status, onChange: function (value) { setForm(Object.assign({}, form, { status: value })); }, options: [{ label: 'Rascunho', value: 'draft' }, { label: 'Publicado', value: 'publish' }] }),
            el(Button, { variant: 'primary', onClick: savePost }, 'Salvar post')
          ) : null,
          tab === 'modules' ? el('div', null,
              el('h2', null, 'Módulos do Site'),
              el('p', null, 'Estrutura preparada para os módulos originais do painel.')
            ) : null,
          tab === 'settings' ? el('div', null,
              el('h2', null, 'Configurações Gerais'),
              el(TextControl, {
                value: settings.brandTitle,
                onChange: function (value) { setSettings(Object.assign({}, settings, { brandTitle: value })); },
                placeholder: 'Título do painel'
              }),
              el('label', null,
                el('input', {
                  type: 'checkbox',
                  checked: !!settings.showLogo,
                  onChange: function (event) { setSettings(Object.assign({}, settings, { showLogo: event.target.checked })); }
                }),
                ' Exibir logo'
              ),
              el(Button, { variant: 'primary', onClick: saveSettings }, 'Salvar Configurações')
            ) : null
        )
      )
    );
  }

  var root = document.getElementById('dra-react-root');
  if (root) {
    if (typeof wp.element.createRoot === 'function') {
      wp.element.createRoot(root).render(el(App));
    } else if (typeof wp.element.render === 'function') {
      wp.element.render(el(App), root);
    }
  }
})(window.wp);
