<?php

if (! defined('ABSPATH')) {
    exit;
}

final class DRA_React_Plugin {
    /** @var DRA_React_Plugin|null */
    private static $instance = null;

    private $page_hook = '';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'register_admin_page'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('rest_api_init', array('DRA_React_Rest', 'register_routes'));
    }

    public function register_admin_page() {
        $this->page_hook = add_menu_page(
            __('Painel Administrativo DRA (React)', 'painel-administrativo-dra-react'),
            __('Painel DRA (React)', 'painel-administrativo-dra-react'),
            'manage_options',
            'painel-administrativo-dra-react',
            array($this, 'render_app'),
            'dashicons-screenoptions',
            3
        );
    }

    public function enqueue_assets($hook_suffix) {
        // Carrega CSS original do panel-fix globalmente para reproduzir visual
        $global_css = DRA_REACT_PLUGIN_PATH . 'assets/dist/admin-original.css';
        if (file_exists($global_css)) {
            wp_enqueue_style(
                'dra-react-admin-original',
                DRA_REACT_PLUGIN_URL . 'assets/dist/admin-original.css',
                array(),
                filemtime($global_css)
            );
        }

        // Enfileira script de comportamento global (menus, topbar)
        $behavior_js = DRA_REACT_PLUGIN_PATH . 'assets/dist/admin-behavior.js';
        if (file_exists($behavior_js)) {
            wp_enqueue_script(
                'dra-react-admin-behavior',
                DRA_REACT_PLUGIN_URL . 'assets/dist/admin-behavior.js',
                array('jquery'),
                filemtime($behavior_js),
                true
            );

            // Localize data for behavior script
            $current_user = wp_get_current_user();
            $data = array(
                'adminUrl'    => admin_url('/'),
                'avatarUrl'   => get_avatar_url($current_user->ID),
                'userName'    => $current_user->display_name,
                'numComments' => intval(wp_count_comments()->total_comments),
                'numMedia'    => intval(wp_count_posts('attachment')->publish),
                'numUsers'    => intval(count_users()['total_users']),
                'isMain'      => is_multisite() && is_main_site() ? 'true' : 'false',
                'siteName'    => get_bloginfo('name'),
                'novoLinks'   => new stdClass(),
                'logoutUrl'   => wp_logout_url()
            );

            wp_localize_script('dra-react-admin-behavior', 'draPanelData', $data);
        }

        // Enfileira app React somente na página do plugin
        if ($hook_suffix !== $this->page_hook) {
            return;
        }

        $app_js = DRA_REACT_PLUGIN_PATH . 'assets/dist/admin-react-app.js';
        if (file_exists($app_js)) {
            wp_enqueue_script(
                'dra-react-admin-app',
                DRA_REACT_PLUGIN_URL . 'assets/dist/admin-react-app.js',
                array('wp-element'),
                filemtime($app_js),
                true
            );
        }
    }

    public function render_app() {
        echo '<div class="wrap">';
        echo '<h1>' . esc_html__('Painel Administrativo DRA (React)', 'painel-administrativo-dra-react') . '</h1>';
        echo '<div id="dra-react-root"></div>';
        echo '</div>';
    }
}
