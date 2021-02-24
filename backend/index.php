<?php
require_once 'Controller.php';
require_once 'Database.php';
$json = file_get_contents('php://input');
$data = (array) json_decode($json);
$uri = $_SERVER['REQUEST_URI'];
session_start();
// echo $json;
//  echo $uri;
// $route = explode('/',$uri);
// print_r($route);
// $parsed = parse_url($uri);
// print_r($uri);
// $path = explode('/',$uri);
// print_r(end($path));
// if (isset($_SESSION['userId'])) {
    echo $_SESSION['userId'];
// }
$controller = new Controller;
switch ($uri) {
    case "/api/login":
        /// process login
        $result = $controller->login($data);
        $_SESSION['userId'] = $result['data']['userID'] ?? null;
        makeResponse($result);
        break;
    case "/api/report":
        /// process report
        $data['user_id'] = $_SESSION['userId'] ?? null;
        $result = $controller->report($data);
        if (isset($result['data']['type']) && $result['data']['type'] === 'exit') {
            unset($_SESSION['userId']);
        }
         makeResponse($result);
        break;
    default:
        /// 404
        makeResponse(['code' => 404, 'data' => []]);
}

function makeResponse($result)
{
    http_response_code($result['code']);
    echo json_encode($result['data']);
    die();
}
