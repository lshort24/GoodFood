<?php
class Database
{
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

    public function getConnection()
    {
        $password = implode('', array('Z','P','y','2','C','f','E','y','S','w','7','b','U','r','D','A'));
        $conn = new mysqli(self::SERVER_NAME, self::USERNAME, $password, self::DB_NAME);

        if ($conn->connect_error) {
            throw new Exception($conn->connect_error);
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