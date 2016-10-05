<?php
require_once("M_WK.php");
/**
 * handles all requests to do with game guides
 */
class GuideMgr extends WK_MODEL
{
    # call parent constuctor to load db
    public function __construct()
    {
       parent::__construct();
    }

    /**
    *getGuides
    * retrieves guide information
    * @return array
    **/
    public function getGuides($count)
    {
        $this->sql=sprintf("select * from guides limit %s",$count);
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisGuide['id']=$row['guide_id'];
            $thisGuide['g_name']=$row['guide_name'];
            $thisGuide['content']=$row['content'];

            $this->tempArray[]=$thisGuide;
        }
        return $this->tempArray;
    }

    /**
    * addGuide
    * adds a guide 
    * @param guideName
    * @param guideContent
    * @return	boolean
    **/
    public function addGuide($guideName,$guideContent)
    {
        $this->sql=sprintf("insert into guides(guide_name,content) values('%s','%s')",$guideName,$guideContent);
        $this->contactDB(false);
        return true;
    }

    /**
    * removeGuide
    * removes a guide 
    * @param guideId
    * @return	boolean
    **/
    public function removeGuide($guideId)
    {
        $this->sql=sprintf("delete from guides where guide_id='%s'",$guideId);
        $this->contactDB(false);
        return true;
    }

    /**
    * updateGuide
    * updates a guide 
    * @param guideId
    * @param field
    * @param value
    * @return	boolean
    **/
    public function updateGuide($guideId,$field,$value)
    {
        $this->sql=sprintf("update guides set %s='%s' where guide_id=%s",$field,$value,$guideId);
        $this->contactDB(false);
        return true;
    }
}
?>