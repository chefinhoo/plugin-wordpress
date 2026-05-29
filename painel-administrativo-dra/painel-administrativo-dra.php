<?php
/**
 * Plugin Name: Painel Administrativo DRA
 * Plugin URI: https://example.local/painel-administrativo-dra
 * Description: Painel administrativo em React para gerenciamento interno no WordPress.
 * Version: 1.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: DRA
 * Author URI: https://example.local
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: painel-administrativo-dra
 */

if (! defined('ABSPATH')) {
    exit;
}

define('DRA_PAINEL_VERSION', '1.0');
define('DRA_PAINEL_PLUGIN_FILE', __FILE__);
define('DRA_PAINEL_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('DRA_PAINEL_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once DRA_PAINEL_PLUGIN_PATH . 'includes/class-dra-admin-plugin.php';

DRA_Admin_Plugin::get_instance();
