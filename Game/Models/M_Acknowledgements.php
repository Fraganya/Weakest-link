<?php 
require_once('M_WK.php');
/**
 * handles all requests to do with acknowledgements
 */
class AcknowledgementMgr extends WK_MODEL
{
    # call parent constructor to open database
    /**
     * calls the parent constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
    * getAcknowldgements
    * retrieves acknowledgement info
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
    *  adds acknowledgement info
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
    * updates  acknowledgement info
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