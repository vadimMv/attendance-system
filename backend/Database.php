<?php

class DB
{
    protected $connection;
    protected $config;

    public function __construct()
    {
        $this->config = include 'config.php';

        try
        {
            $this->connection = new PDO(
                "mysql:host={$this->config['db_host']};dbname={$this->config['db_name']}",
                $this->config['db_username'],
                $this->config['db_password']
            );

            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Connection error: {$e->getMessage()}";
        }
    }

    public function query($query)
    {
        return $this->connection->query($query);
    }

    public function userLogin($data)
    {
        // echo "SELECT * FROM users WHERE name ='{$data['name']}' AND password='{$data['password']}'";
        try {
            $currentUser = $this->query("SELECT * FROM users WHERE name ='{$data['name']}' AND password='{$data['password']}' ")->fetch();
            if ($currentUser) {
                return [
                    'userID' => $currentUser['id'],
                ];
            }
            $this->query("INSERT INTO users ( name , email , password ) VALUES ( '{$data['name']}' , '{$data['email']}' , '{$data['password']}' )");
            return [
                'userID' => $this->connection->lastInsertId(),
            ];
        } catch (PDOException $e) {
            echo "DB error: {$e->getMessage()}";
        }
    }

    public function userReport($data)
    {
        $arrData = [];
        $sql = '';
        if ($data['type'] === 'start') {
            $sql = 'INSERT INTO reports (date , start , user_id) VALUES (:date , :start , :user_id)';
            $arrData = [
                'date' => $data['date'],
                'start' => date('H:i'),
                'user_id' => $data['user_id'],
            ];
        } else {
            $sql = 'UPDATE reports SET end=:end WHERE user_id=:user_id AND date= :date';
            $arrData = [
                'date' => $data['date'],
                'end' => date('H:i'),
                'user_id' => $data['user_id'],
            ];
        }
        try {
            return $this->connection->prepare($sql)->execute($arrData);
        } catch (PDOException $e) {
            echo "DB error: {$e->getMessage()}";
        }
    }
}
