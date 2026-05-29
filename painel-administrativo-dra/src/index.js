import { createElement, createRoot, render, useState } from '@wordpress/element';
import { Button, Card, CardBody, Notice } from '@wordpress/components';

function App() {
  const [tab, setTab] = useState('home');
  const [saved, setSaved] = useState(false);

  const saveChanges = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return createElement(
    'div',
    { className: 'dra-admin-shell' },
    saved
      ? createElement(
          Notice,
          { status: 'success', isDismissible: true, className: 'dra-admin-notice' },
          'Configuracoes salvas com sucesso.'
        )
      : null,
    createElement(
      'div',
      { className: 'dra-admin-tabs' },
      createElement(
        Button,
        {
          variant: tab === 'home' ? 'primary' : 'secondary',
          onClick: () => setTab('home')
        },
        'Inicio'
      ),
      createElement(
        Button,
        {
          variant: tab === 'modulos' ? 'primary' : 'secondary',
          onClick: () => setTab('modulos')
        },
        'Modulos'
      ),
      createElement(
        Button,
        {
          variant: tab === 'configuracoes' ? 'primary' : 'secondary',
          onClick: () => setTab('configuracoes')
        },
        'Configuracoes'
      ),
      createElement(
        Button,
        {
          variant: tab === 'categorias' ? 'primary' : 'secondary',
          onClick: () => setTab('categorias')
        },
        'Categorias'
      )
    ),
    createElement(
      Card,
      { className: 'dra-admin-card' },
      createElement(
        CardBody,
        null,
        tab === 'home'
          ? createElement(
              'div',
              null,
              createElement('h2', null, 'Visao geral'),
              createElement('p', null, 'Painel React carregado dentro do WordPress com identidade proprietaria DRA.')
            )
          : null,
        tab === 'modulos'
          ? createElement(
              'div',
              null,
              createElement('h2', null, 'Modulos do sistema'),
              createElement(
                'ul',
                null,
                createElement('li', null, 'Gestao de blocos administrativos'),
                createElement('li', null, 'Ajustes de navegacao interna'),
                createElement('li', null, 'Controle de preferencias do painel')
              )
            )
          : null,
        tab === 'configuracoes'
          ? createElement(
              'div',
              null,
              createElement('h2', null, 'Configuracoes'),
              createElement('p', null, 'Edite opcoes do painel e salve para manter seu fluxo operacional.'),
              createElement(
                Button,
                {
                  variant: 'primary',
                  onClick: saveChanges
                },
                'Salvar alteracoes'
              )
            )
            : null,
        tab === 'categorias'
          ? createElement(
              'div',
              null,
              createElement('h2', null, 'Categorias'),
              createElement('p', null, 'Conteudo de categorias preparado para organizacao editorial e administrativa.'),
              createElement(
                'ul',
                null,
                createElement('li', null, 'Categorias principais ativas'),
                createElement('li', null, 'Subcategorias habilitadas'),
                createElement('li', null, 'Padrao de nomenclatura interno DRA')
              )
            )
          : null
      )
    )
  );
}

const rootElement = document.getElementById('dra-admin-root');

if (rootElement) {
  if (typeof createRoot === 'function') {
    createRoot(rootElement).render(createElement(App));
  } else if (typeof render === 'function') {
    render(createElement(App), rootElement);
  }
}
