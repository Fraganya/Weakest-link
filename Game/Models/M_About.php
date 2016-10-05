<?php
require_once('M_WK.php');

/**
 * AboutMgr class handles all requests to do with the about game data
 * inherits properties and functions from WK_MODEL
 * @author Francis ganya
 */
class AboutMgr extends WK_MODEL
{
    # call parent constructor
    /**
     * calls the parent constructor
     */
    public function __construct()
    {
       parent::__construct();
    }
    
  /**
  * getAboutInfo
  * retrieves game information
  * @return	array
  **/
    public function getAboutInfo()
    {
        $this->sql="select info from about";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $this->tempArray['gameinfo']=$row['info'];
        }

        return $this->tempArray;
    }

    /**
    * getAboutInfoAB
    * retrieves game information for the about dialog
    * @return	array
    **/
    public function getAboutInfoAB()
    {
        $this->sql="select gamename,version,overview from about";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $this->tempArray['gamename']=$row['gamename'];
            $this->tempArray['version']=$row['version'];
            $this->tempArray['overview']=$row['overview'];
        }
        return $this->tempArray;
    }

    /**
    * getAboutInfoAB
    * retrieves game information for the about dialog
    * @return	array
    **/
    public function getAboutInfoCR()
    {
        $this->sql="select developer,email,website from about";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $this->tempArray['developer']=$row['developer'];
            $this->tempArray['website']=$row['website'];
            $this->tempArray['email']=$row['email'];
        }
        return $this->tempArray;
    }
    /**
    * updateAboutInfo
    * updates field of the about game table
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