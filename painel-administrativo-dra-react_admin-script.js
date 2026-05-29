/**
 * Panel Administrativo Danilo Ramos - Script Admin v3.2
 * Funcionalidades: Menu, Topbar, Dropdowns, Mobile Menu
 */

document.addEventListener('DOMContentLoaded', function () {

    // ═══════════════════════════════════════════════════════════════════════
    // 1. DADOS GLOBAIS (vêm via wp_localize_script - seguro)
    // ═══════════════════════════════════════════════════════════════════════
    
    var adminUrl      = hoostData.adminUrl || '';
    var avatarUrl     = hoostData.avatarUrl || '';
    var userName      = hoostData.userName || '';
    var numComments   = parseInt(hoostData.numComments) || 0;
    var numMedia      = parseInt(hoostData.numMedia) || 0;
    var numUsers      = parseInt(hoostData.numUsers) || 0;
    var isMain        = hoostData.isMain === 'true';
    var siteName      = hoostData.siteName || '';
    var novoItems     = hoostData.novoLinks || {};
    var logoutUrl     = hoostData.logoutUrl || '';

    // ═══════════════════════════════════════════════════════════════════════
    // 2. SLOT: CONTADOR + SETA
    // ═══════════════════════════════════════════════════════════════════════
    
    document.querySelectorAll('#adminmenu a.menu-top').forEach(function(a) {
        var li   = a.parentElement;
        var slot = document.createElement('span');
        slot.className = 'hoost-slot';
        
        if (li.classList.contains('wp-has-submenu')) {
            var arrow = document.createElement('span');
            arrow.className = 'hoost-arrow';
            arrow.innerHTML = '&#xf107;';
            slot.appendChild(arrow);
        }
        a.appendChild(slot);
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 3. CONTADORES NO MENU
    // ═══════════════════════════════════════════════════════════════════════
    
    function addMenuCount(slugPart, count) {
        if (!count) return;
        document.querySelectorAll('#adminmenu a.menu-top').forEach(function(a) {
            var href = a.getAttribute('href') || '';
            if (href.indexOf(slugPart) === -1) return;
            
            var slot = a.querySelector('.hoost-slot');
            if (!slot || slot.querySelector('.hoost-menu-count')) return;
            
            var span = document.createElement('span');
            span.className = 'hoost-menu-count';
            span.textContent = count;
            
            var arrow = slot.querySelector('.hoost-arrow');
            if (arrow) slot.insertBefore(span, arrow);
            else slot.appendChild(span);
        });
    }
    
    addMenuCount('edit-comments.php', numComments);
    addMenuCount('upload.php',        numMedia);
    addMenuCount('users.php',         numUsers);

    // ═══════════════════════════════════════════════════════════════════════
    // 4. HAMBURGER MOBILE
    // ═══════════════════════════════════════════════════════════════════════
    
    var overlay = document.createElement('div');
    overlay.id  = 'hoost-mobile-overlay';
    document.body.appendChild(overlay);

    var hamburger = document.createElement('button');
    hamburger.id        = 'hoost-hamburger';
    hamburger.type      = 'button';
    hamburger.innerHTML = '<i class="fa fa-bars"></i>';
    hamburger.setAttribute('aria-label', 'Menu');
    document.body.appendChild(hamburger);

    var menuWrap = document.getElementById('adminmenuwrap');
    
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menuWrap) menuWrap.classList.toggle('hoost-mobile-open');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', function() {
        if (menuWrap) menuWrap.classList.remove('hoost-mobile-open');
        overlay.classList.remove('active');
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 5. TOPBAR (HEADER)
    // ═══════════════════════════════════════════════════════════════════════
    
    var avatarHtml = avatarUrl
        ? '<img src="' + avatarUrl + '" alt="' + escapeHtml(userName) + '">'
        : '<div class="avatar-fallback">👤</div>';

    var topbar = document.createElement('div');
    topbar.id  = 'hoost-topbar';

    // Badge de subsite (apenas em subsites)
    var subsiteBadge = !isMain
        ? '<span id="hoost-subsite-badge"><i class="fa fa-sitemap"></i> ' + escapeHtml(siteName) + '</span>'
        : '';

    // Build novo links HTML
    var novoLinksHtml = '';
    for (var label in novoItems) {
        if (novoItems.hasOwnProperty(label)) {
            var url = novoItems[label];
            var fullUrl = adminUrl + url;
            novoLinksHtml += '<a href="' + escapeHtml(fullUrl) + '">' + escapeHtml(label) + '</a>';
        }
    }

    topbar.innerHTML =
        '<div class="topbar-left">' +
            subsiteBadge +
            '<a class="topbar-notif" href="' + escapeHtml(adminUrl + 'edit-comments.php') + '">' +
                '<i class="fa fa-comment-o"></i> ' + numComments +
            '</a>' +
            '<div class="topbar-novo-wrap">' +
                '<button class="topbar-novo" id="hoost-novo-btn" type="button" aria-haspopup="true">' +
                    '<i class="fa fa-plus"></i> Novo' +
                '</button>' +
                '<div id="hoost-novo-dropdown">' + novoLinksHtml + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="topbar-user-wrap" id="hoost-user-wrap" role="button" tabindex="0" aria-haspopup="true">' +
            '<div class="topbar-avatar">' + avatarHtml + '</div>' +
            '<div id="hoost-user-dropdown">' +
                '<div class="user-name">' + escapeHtml(userName) + '</div>' +
                '<a href="' + escapeHtml(adminUrl + 'profile.php') + '"><i class="fa fa-user-o"></i> Meu Perfil</a>' +
                '<a href="' + escapeHtml(logoutUrl) + '"><i class="fa fa-sign-out"></i> Sair</a>' +
            '</div>' +
        '</div>';

    var wpbodyContent = document.getElementById('wpbody-content');
    if (wpbodyContent) wpbodyContent.insertBefore(topbar, wpbodyContent.firstChild);

    // ═══════════════════════════════════════════════════════════════════════
    // 6. DROPDOWNS (Novo + User)
    // ═══════════════════════════════════════════════════════════════════════
    
    var btnNovo  = document.getElementById('hoost-novo-btn');
    var ddNovo   = document.getElementById('hoost-novo-dropdown');
    var userWrap = document.getElementById('hoost-user-wrap');
    var ddUser   = document.getElementById('hoost-user-dropdown');

    if (btnNovo && ddNovo) {
        btnNovo.addEventListener('click', function(e) {
            e.stopPropagation();
            ddNovo.classList.toggle('open');
            if (ddUser) ddUser.classList.remove('open');
        });
    }
    
    if (userWrap && ddUser) {
        userWrap.addEventListener('click', function(e) {
            e.stopPropagation();
            ddUser.classList.toggle('open');
            if (ddNovo) ddNovo.classList.remove('open');
        });
    }
    
    document.addEventListener('click', function() {
        if (ddNovo) ddNovo.classList.remove('open');
        if (ddUser) ddUser.classList.remove('open');
    });

    // ═══════════════════════════════════════════════════════════════════════
    // 7. ACORDEÃO DO MENU
    // ═══════════════════════════════════════════════════════════════════════
    
    document.querySelectorAll('#adminmenu li.wp-has-submenu > a.menu-top').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var li     = this.parentElement;
            var isOpen = li.classList.contains('open');
            
            // Fechar outros submenus abertos
            document.querySelectorAll('#adminmenu li.wp-has-submenu.open').forEach(function(other) {
                if (other !== li) other.classList.remove('open', 'wp-menu-open', 'opensub');
            });
            
            // Toggle submenu atual
            if (isOpen && !li.classList.contains('wp-has-current-submenu')) {
                li.classList.remove('open', 'wp-menu-open', 'opensub');
            } else {
                li.classList.add('open');
            }
        });
    });

    // Manter submenu aberto se está na página atual
    var currentSubmenu = document.querySelector('#adminmenu li.wp-has-current-submenu');
    if (currentSubmenu) currentSubmenu.classList.add('open');

    // ═══════════════════════════════════════════════════════════════════════
    // 8. REMOVER SETAS NATIVAS WP
    // ═══════════════════════════════════════════════════════════════════════
    
    function removerSetasNativas() {
        document.querySelectorAll('#adminmenu .wp-menu-arrow').forEach(function(el) { 
            el.remove(); 
        });
    }
    removerSetasNativas();
    
    var am = document.getElementById('adminmenu');
    if (am) {
        am.addEventListener('mouseover', removerSetasNativas);
        am.addEventListener('click', function() { 
            setTimeout(removerSetasNativas, 0); 
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 9. REDIRECIONAR "Início" → Dashboard customizado (site principal)
    // ═══════════════════════════════════════════════════════════════════════
    
    if (isMain) {
        document.querySelectorAll('#adminmenu a[href$="index.php"]').forEach(function(a) {
            var href = a.getAttribute('href') || '';
            // Só redireciona se não tem ?page= já
            if (href.indexOf('?') === -1) {
                a.setAttribute('href', adminUrl + 'index.php?page=hoost-dashboard');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 10. TÍTULOS CUSTOMIZADOS NAS PÁGINAS
    // ═══════════════════════════════════════════════════════════════════════
    
    var labelMap = {
        'noticias':         'Notícias',
        'blog':             'Blog',
        'programacao':      'Programação',
        'galeria_de_fotos': 'Galeria de Fotos',
        'eventos':          'Eventos',
        'videos':           'Vídeos',
        'equipe':           'Equipe',
        'promocoes':        'Promoções',
        'poll':             'Enquetes',
        'page':             'Páginas',
    };

    var bodyClasses = document.body.className;
    var ptMatch     = bodyClasses.match(/post-type-([^\s]+)/);
    var currentPT   = ptMatch ? ptMatch[1] : '';

    // Título nas páginas de lista
    if (currentPT && labelMap[currentPT] && bodyClasses.indexOf('edit-php') !== -1) {
        var wrapEl = document.querySelector('#wpbody-content .wrap');
        if (wrapEl) {
            var titleSpan    = document.createElement('span');
            titleSpan.className = 'hoost-page-title';
            titleSpan.textContent = labelMap[currentPT];
            var existingH1 = wrapEl.querySelector('h1.wp-heading-inline');
            wrapEl.insertBefore(titleSpan, existingH1 || wrapEl.firstChild);
        }
    }

    // Título + botão voltar nas páginas de edição
    if (bodyClasses.indexOf('post-new-php') !== -1 || bodyClasses.indexOf('post-php') !== -1) {
        if (currentPT && labelMap[currentPT]) {
            var editWrap = document.querySelector('#wpbody-content .wrap');
            if (editWrap) {
                var isNew     = bodyClasses.indexOf('post-new-php') !== -1;
                var editTitle = document.createElement('div');
                editTitle.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;';
                
                var backUrl = adminUrl + 'edit.php?post_type=' + currentPT;
                editTitle.innerHTML =
                    '<span class="hoost-page-title" style="margin-bottom:0;">' +
                        (isNew ? 'Adicionar: ' : 'Editando: ') + escapeHtml(labelMap[currentPT]) +
                    '</span>' +
                    '<a href="' + escapeHtml(backUrl) + '" ' +
                    'style="font-size:13px;color:#4fbced;text-decoration:none;display:inline-flex;align-items:center;gap:5px;">' +
                    '<i class="fa fa-arrow-left"></i> Voltar para ' + escapeHtml(labelMap[currentPT]) + '</a>';
                
                editWrap.insertBefore(editTitle, editWrap.firstChild);
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER: Escapar HTML (XSS prevention)
    // ═══════════════════════════════════════════════════════════════════════
    
    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});
