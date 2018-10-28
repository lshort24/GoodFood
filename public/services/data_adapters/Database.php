<?php
class Database
{
    //const SERVER_NAME = "goodfood2018.cbuugflsygpu.us-west-2.rds.amazonaws.com";
    //const USERNAME = "dbadmin";
    //const DB_NAME = "goodfood2018";
    const SERVER_NAME = "localhost";
    const USERNAME = "webuser";
    const DB_NAME = "goodfood";

    private static $instance;

    /**
     * Protected constructor to prevent creating a new instance
     * via the `new` operator from outside of this class.
     */
    protected function __construct()
    {
    }

    /**
     * Returns an instance of this class.
     *
     * @return Database The database instance.
     */
    public static function getInstance()
    {
        if (static::$instance === null) {
            static::$instance = new static();
        }

        return static::$instance;
    }

    /**
     * Get a database connection
     *
     * @return mysqli
     * @throws Exception
     */
    public function getConnection()
    {

        $conn = new mysqli(self::SERVER_NAME, self::USERNAME, $password, self::DB_NAME, 3306);
        if ($conn->connect_errno) {
            throw new Exception("Failed to connect to MySQL: (" . $conn->connect_errno . ") " . $conn->connect_error);
        }

        return ($conn);
    }

    /**
     * Private clone method to prevent cloning of the instance of the
     * Database instance.
     *
     * @return void
     */
    private function __clone()
    {
    }
}