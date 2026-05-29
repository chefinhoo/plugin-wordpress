<?php

if (! defined('ABSPATH')) {
    exit;
}

final class DRA_Admin_Plugin {
    /**
     * @var DRA_Admin_Plugin|null
     */
    private static $instance = null;

    /**
     * @var string
     */
    private $page_hook = '';

    /**
     * @var bool
     */
    private $assets_ready = true;

    /**
     * @return DRA_Admin_Plugin
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {
        add_action('admin_menu', array($this, 'register_admin_page'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    public function register_admin_page() {
        $this->page_hook = add_menu_page(
            __('Painel Administrativo DRA', 'painel-administrativo-dra'),
            __('Painel DRA', 'painel-administrativo-dra'),
            'manage_options',
            'painel-administrativo-dra',
            array($this, 'render_app'),
            'dashicons-screenoptions',
            3
        );
    }

    public function enqueue_assets($hook_suffix) {
        if ($hook_suffix !== $this->page_hook) {
            return;
        }

        $script_path = DRA_PAINEL_PLUGIN_PATH . 'assets/dist/admin-app.js';
        $style_path  = DRA_PAINEL_PLUGIN_PATH . 'assets/dist/admin-app.css';

        if (! file_exists($script_path) || ! file_exists($style_path)) {
            $this->assets_ready = false;

            return;
        }

        wp_enqueue_style(
            'dra-painel-admin-style',
            DRA_PAINEL_PLUGIN_URL . 'assets/dist/admin-app.css',
            array(),
            file_exists($style_path) ? filemtime($style_path) : DRA_PAINEL_VERSION
        );

        wp_enqueue_script(
            'dra-painel-admin-app',
            DRA_PAINEL_PLUGIN_URL . 'assets/dist/admin-app.js',
            array('wp-element', 'wp-components', 'wp-i18n'),
            file_exists($script_path) ? filemtime($script_path) : DRA_PAINEL_VERSION,
            true
        );
    }

    public function render_app() {
        echo '<div class="wrap">';
        echo '<h1>' . esc_html__('Painel Administrativo DRA', 'painel-administrativo-dra') . '</h1>';

        if (! $this->assets_ready) {
            echo '<div class="notice notice-error"><p>';
            echo esc_html__('Build do React ausente. Gere os arquivos em assets/dist antes de usar o painel.', 'painel-administrativo-dra');
            echo '</p></div>';
            echo '</div>';

            return;
        }

        echo '<div id="dra-admin-root"></div>';
        echo '<noscript>' . esc_html__('Ative JavaScript para usar o painel React.', 'painel-administrativo-dra') . '</noscript>';
        echo '</div>';
    }
}
