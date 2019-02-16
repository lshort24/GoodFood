<?php
function json_response($payload = null, $code = 200)
{
    // clear the old headers
    header_remove();
    // set the actual code
    http_response_code($code);
    // set the header to make sure cache is forced
    header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
    // treat this as json
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:3000');
    $status = array(
        200 => '200 OK',
        400 => '400 Bad Request',
        422 => 'Unprocessable Entity',
        500 => '500 Internal Server Error'
    );
    // ok, validation error, or failure
    header('Status: '.$status[$code]);

    $payload['success'] = $code < 300; // success or not?

    // return the encoded json
    $json = json_encode($payload);
    if ($json === false) {
        // This will happen if there are non UTF-8 characters in the ingredients, description or markdown.
        var_dump($payload);
    }
    return $json;
}