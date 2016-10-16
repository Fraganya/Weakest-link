<?php
/**
 * The base class from which all static game models inherit from
 */
class WK_MODEL extends sqlite3
{
    /**
     * holds the filename of the database
     * @var string
     */
    protected $dbFile;
    /**
     * holds the query to be executed next
     * @var string
     */
    protected $sql;
    /**
     * used to sort data and as return container
     * @var array
     */
    protected $tempArray;
    /**
     * temporaliry holds query execution info
     * @var object
     */
    protected $contactMgr;

    /**
     * loads the db
     */
    public function __construct()
    {
        $this->dbFile=DATAPATH."Gameinfo.db";
        $this->open($this->dbFile);
        if(!$this) die("Cannot access the Gameinfo.db File <br />".$this->lastErrorMsg());
    }

    /**
     * executes the db query on the db server
     * @param bool $sync
     */
    protected function contactDB($sync=true)
    {
        //returns results
        if($sync)
        {
            $this->contactMgr=$this->query($this->sql);
        }
        else
        {
            $this->contactMgr=$this->exec($this->sql);
        }
        if(!$this->contactMgr)
        {
            die("Contact Mgr is null-".$this->lastErrorMsg());
        }
    }
}

?>