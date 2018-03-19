<?php

require_once './data_adapters/MockAdapter.php';
require_once './data_adapters/DatabaseAdapter.php';
require_once './json_response.php';

try {
    if (preg_match('/localhost/', $_SERVER['HTTP_HOST'])) {
        $adapter = new MockAdapter();
    }
    else {
        $adapter = new DatabaseAdapter();
    }

    $keywords = '';
    if (!empty($_REQUEST['keywords'])) {
        $keywords = $_REQUEST['keywords'];
    }
    $recipe_list = $adapter->get_recipe_list($keywords);

    $tags = $adapter->get_tags();
    $payload = [
        'recipe_list' => $recipe_list,
        'tags' => $tags
    ];
}
catch(Exception $e) {
    $payload = $e->getMessage();
}


echo json_response($payload, 200);