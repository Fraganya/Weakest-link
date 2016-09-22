<?php
define ("DATAPATH","../Data/");
class WK_MODEL extends sqlite3
{
    protected $dbFile;
    protected $sql;
    protected $tempArray;
    protected $contactMgr;

    public function __construct()
    {
        $this->dbFile=DATAPATH."Gameinfo.db";
        $this->open($this->dbFile);
        if(!$this) die("Cannot access the Gameinfo.db File <br />".$this->lastErrorMsg());
    }

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
        echo $this->sql."<br/>";
        if(!$this->contactMgr)
        {
            die("Contact Mgr is null-".$this->lastErrorMsg());
        }
    }
}

?>