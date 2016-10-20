<?php
/**
 * The base game model from which all server - associated models inherit from
 */
class M_WKL_BASE
{
      /**
     * The mysqli object used to connect to the database
     * @var object
     */
    private $connection;
    /**
    * The remporary container for sorting data to be returned
    *@var object
    */
    private $tempArray;
    /**
     * holds the sql query to be executed
     * @var  string
     */
    private $sql;
    /**
     * Holds the result of the recent database query
     * @var object
     */
    public $contactMgr;

    /**
     * initialises the connection object
     */
    public function __construct()
    {
        require_once(CONFIGPATH.'Environment.php');
        $this->connection=new mysqli($host,$username,$key,$db);
        if($this->connection->connect_error)
        {
            die($this->connection->connect_error);
        }
    }
    
    /**
     * sanitizes the string and sets it as a query to be executed in the next query calls
     * @param string $query
     */
    protected function _setSql($query)
    {
       $this->sql=$query;
    }
    
    /**
     * executes the query in the set sql variable
     * @param bool $multi
     */
    protected function _contactDB($multi=FALSE)
    {
        //$this->sql=$this->connection->escape_string($this->sql);

        if($multi)
        {
             $this->contactMgr=$this->connection->multi_query($this->sql);
        }
        else{
              $this->contactMgr=$this->connection->query($this->sql);
        }
        if(!$this->contactMgr) 
        {
            die($this->connection->error);
        }
    }
}


?>