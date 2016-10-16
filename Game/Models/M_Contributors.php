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
    public function getContributors($table='contributors',$top=FALSE)
    {
        $this->sql="select * from {$table}";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisContributor['fname']=$row['fname'];
            $thisContributor['sname']=$row['sname'];
            if($top)
            {
                $thisContributor['count']=$row['count']; 
            }
            $this->tempArray[]=$thisContributor;
        }
        return $this->tempArray;
    }

    /**
    * addContributor
    * adds contributor
    * @return	boolean
    **/
    public function addContributor($fname,$sname,$sync=FALSE)
    {
        $this->sql=sprintf("insert into contributors(c_fname,c_sname) values('%s','%s')",$fname,$sname);
        $this->contactDB();

        if(!$sync)
        {
            return true;
        }

        $this->sql=("select id from contributors ORDER by id DESC LIMIT 1");
        $this->contactDB();

        // return the just inserted c_id
        $id=$this->contactMgr->fetchArray(SQLITE3_ASSOC)['id'];
        return $id;
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

    public function addQuestion($question,$answer,$c_id)
    {
        $this->sql=sprintf("insert into contributed_questions(question,answer,by) values('%s','%s','%s')",
                     $question,$answer,$c_id);
        $this->contactDB(false);
        return true;
    }

    public function addIdea($idea,$c_id)
    {
        $this->sql=sprintf("insert into ideas(about,added,by) values('%s',DATE(),'%s')",
                     $idea,$c_id);
        $this->contactDB(false);
        return true;
    }

    
}

?>