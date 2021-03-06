<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require '../vendor/autoload.php';
require '../PHP/clases/AccesoDatos.php';
require '../PHP/clases/Productos.php';
require '../PHP/clases/Usuarios.php';
/**
 * Step 2: Instantiate a Slim application
 *icat
 * This example instantiates a Slim applion using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');

$app->get('/Producto[/]', function ($request, $response, $args) {
	$listado=Producto::TraerTodosLosProductos();
    $response->write(json_encode($listado));
    return $response;
});
$app->get('/Usuario[/]', function ($request, $response, $args) {
	$listado=Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($listado));
    return $response;
});
/*
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();

