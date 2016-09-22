<?php 
require_once('M_WK.php');
class AcknowledgementMgr extends WK_MODEL
{
    # call parent constructor to open database
    public function __construct()
    {
        parent::__construct();
    }

    /**
    * getAcknowldgements
    * retrieve acknowledgement info
    * @return	array
    **/
    public function getAcknowledgements()
    {
        $this->sql="select * from acknowledgements";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisProj['id']=$row['id'];
            $thisProj['project']=$row['project'];
            $thisProj['website']=$row['website'];
            $this->tempArray[]=$thisProj;           
        }

        return $this->tempArray;
    }

    /**
    * addAcknowldgements
    *  add acknowledgement info
    * @param project
    * @param website
    * @return	boolean
    **/
    public function addAcknowledgement($project,$website)
    {
        $this->sql=sprintf("insert into acknowledgements(project,website) values('%s','%s')",$project,$website);
        $this->contactDB(false);
        return true;
    }

    /**
    * updateAcknowldgements
    * update  acknowledgement info
    * @param id
    * @param field
    * @param value
    * @return	boolean
    **/
    public function updateAcknowledgement($id,$field,$value)
    {
        $this->sql=sprintf("update acknowledgements set %s='%s' where id=%s",$field,$value,$id);
        $this->contactDB(false);
        return true;
    }
}
?>