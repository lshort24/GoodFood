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

    $recipe_list = $adapter->get_recipe_list();
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