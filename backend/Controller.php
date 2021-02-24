<?php
class Controller
{
    protected $config;
    protected $db;
    protected $code;
    public function __construct()
    {
        $this->config = include 'config.php';
        $this->db = new DB();
        $this->code = 200;
    }

    public function login($data)
    {
        $data['password'] = md5($data['password']);
        $result = $this->db->userLogin($data);
        if ($result === false) {
            $this->code = 500;
            $result = ["error" => "Inner error"];
        }
        return [
            "code" => $this->code,
            "data" => $result,
        ];
    }

    public function report($data)
    {
        if ($data['type'] !== 'end') {
            $result = $this->db->userReport($data);
            if ($result === false) {
                $this->code = 500;
                $result = ["error" => "Inner error"];
            } else {
                $result = ["type" => strtoupper($data['type'])];
            }
            return [
                "code" => $this->code,
                "data" => $result,
            ];
        }
        return [
            "code" => 200,
            "data" => [
                "type" => 'END',
                "user" => '',
            ],
        ];
    }
}
