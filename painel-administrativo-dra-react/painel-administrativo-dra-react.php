<?php
/**
 * Plugin Name: Painel Administrativo DRA (React)
 * Description: Versão em React do painel administrativo, portada a partir do panel-fix.zip. Mantém comportamento visual original.
 * Version: 1.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: DRA
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: painel-administrativo-dra-react
 */

if (! defined('ABSPATH')) {
    exit;
}

define('DRA_REACT_VERSION', '1.0');
define('DRA_REACT_PLUGIN_FILE', __FILE__);
define('DRA_REACT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('DRA_REACT_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once DRA_REACT_PLUGIN_PATH . 'includes/class-dra-react-plugin.php';
require_once DRA_REACT_PLUGIN_PATH . 'includes/class-dra-react-rest.php';

DRA_React_Plugin::get_instance();
