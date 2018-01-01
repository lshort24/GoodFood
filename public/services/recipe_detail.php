<?php

require_once './data_adapters/MockAdapter.php';
require_once './data_adapters/DatabaseAdapter.php';
require_once './json_response.php';

if (empty($_REQUEST['id'])) {
    throw new Exception('No id was specified.');
}

$id = intval($_REQUEST['id']);

if (preg_match('/localhost/', $_SERVER['HTTP_HOST'])) {
    $adapter = new MockAdapter();
}
else {
    $adapter = new DatabaseAdapter();
}

$recipe_detail = $adapter->get_recipe_detail($id);

echo json_response($recipe_detail, 200);