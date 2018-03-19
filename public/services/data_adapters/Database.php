<?php
class Database
{
    const SERVER_NAME = "goodfood2018.cbuugflsygpu.us-west-2.rds.amazonaws.com";
    const USERNAME = "dbadmin";
    const DB_NAME = "goodfood2018";

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
        $password = implode('', array('S','p','r','i','n','g','B','r','e','a','k','2','0','1','8'));
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