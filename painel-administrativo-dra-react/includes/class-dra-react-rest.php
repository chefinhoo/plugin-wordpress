<?php

if (! defined('ABSPATH')) {
    exit;
}

final class DRA_React_Rest {
    public static function register_routes() {
        register_rest_route('dra-react/v1', '/settings', array(
            'methods'  => 'GET',
            'callback' => array(__CLASS__, 'get_settings'),
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
        ));

        register_rest_route('dra-react/v1', '/settings', array(
            'methods'  => 'POST',
            'callback' => array(__CLASS__, 'save_settings'),
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
        ));
    }

    public static function get_settings() {
        return rest_ensure_response(get_option('dra_react_settings', array(
            'brandTitle' => 'Painel Administrativo DRA',
            'showLogo'   => false,
        )));
    }

    public static function save_settings(WP_REST_Request $request) {
        $data = array(
            'brandTitle' => sanitize_text_field($request->get_param('brandTitle')),
            'showLogo'   => (bool) $request->get_param('showLogo'),
        );

        update_option('dra_react_settings', $data);

        return rest_ensure_response(array(
            'saved' => true,
            'data'  => $data,
        ));
    }
}
