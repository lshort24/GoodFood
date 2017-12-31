<?php

require_once './data_adapters/MockAdapter.php';
require_once './json_response.php';

$adapter = new MockAdapter();
$recipe_list = $adapter->get_recipe_list();
$tags = $adapter->get_tags();
$payload = [
    'recipe_list' => $recipe_list,
    'tags' => $tags
];

echo json_response($payload, 200);