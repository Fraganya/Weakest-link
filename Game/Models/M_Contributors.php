<?php
require_once('M_WK.php');
/**
 * handles all requests to do with contributions
 */
class ContributorMgr extends WK_MODEL
{
    # call parent constructor to load db
    /**
     * class the parent constructor to load db
     */
    public function __construct()
    {
        parent::__construct();
    }
    
    /**
    * getContributors
    * retrieves contributors info
    * @return	array
    **/
    public function getContributors()
    {
        $this->sql="select * from contributors";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisContributor['fname']=$row['c_fname'];
            $thisContributor['sname']=$row['c_sname'];
            $thisContributor['count']=$row['count'];

            $this->tempArray[]=$thisContributor;
        }
        return $this->tempArray;
    }

    /**
    * addContributor
    * adds contributor
    * @return	boolean
    **/
    public function addContributor($fname,$sname)
    {
        $this->sql=sprintf("insert into contributors(c_fname,c_sname) values('%s','%s')",$fname,$sname);
        $this->contactDB();
        return true;
    }

    /**
    * updateContributor
    * updates contributor info
    * @return	boolean
    **/
    public function updateContributor($id,$contribution_count)
    {
        $this->sql=sprintf("update contributors set count=%s where id=%s",
                           $contribution_count,$id);
        $this->contactDB(false);
        return true;
    }
}

?>