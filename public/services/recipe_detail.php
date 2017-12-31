<?php

require_once './data_adapters/MockAdapter.php';
require_once './json_response.php';

if (empty($_REQUEST['id'])) {
    throw new Exception('No id was specified.');
}

$id = intval($_REQUEST['id']);

$adapter = new MockAdapter();
$recipe_detail = $adapter->get_recipe_detail($id);

echo json_response($recipe_detail, 200);