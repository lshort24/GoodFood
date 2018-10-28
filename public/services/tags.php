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

$tags = $adapter->get_tags_by_recipe_id($id);

echo json_response($tags, 200);