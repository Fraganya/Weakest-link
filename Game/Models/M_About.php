<?php
require_once('M_WK.php');
class AboutMgr extends WK_MODEL
{
    # call parent constructor
    public function __construct()
    {
       parent::__construct();
    }
    
  /**
  * getAboutInfo
  * retrieve game information
  * @return	array
  **/
    public function getAboutInfo()
    {
        $this->sql="select * from about";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $this->tempArray['gamename']=$row['gamename'];
            $this->tempArray['gameinfo']=$row['info'];
            $this->tempArray['version']=$row['version'];
            $this->tempArray['developer']=$row['developer'];
            $this->tempArray['contact']=$row['contact'];
            $this->tempArray['email']=$row['email'];
            $this->tempArray['overview']=$row['overview'];
        }

        return $this->tempArray;
    }
    
    /**
    * updateAboutInfo
    * update field of the about game table
    * @param field
    * @param value
    * @return	boolean
    **/
    public function updateAboutInfo($field,$value)
    {
         $this->sql=sprintf("update about set %s='%s'",$field,$value);
         $this->contactDB(false);
         return true;
    }
}
?>