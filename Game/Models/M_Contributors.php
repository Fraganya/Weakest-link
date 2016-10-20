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
    public function getContributors($table="contributors",$top=FALSE)
    {
        $this->sql="select * from {$table}";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisContributor['fname']=$row['c_fname'];
            $thisContributor['sname']=$row['c_sname'];
            if($top)
            {
                $thisContributor['count']=$row['count']; 
            }
            $this->tempArray[]=$thisContributor;
        }
        return $this->tempArray;
    }
    
    /**
     * gets contributed questions info
     * @param type $GET_COUNT - sets whather to return the info or the count
     * @return [mixed]
     */
    public function getContributedQuestions($GET_COUNT=FALSE)
    {
        $this->sql="select * from contributed_questions";
        $this->contactDB();
        
        // if GET_COUNT is true return the number of questions contributed
        if($GET_COUNT)
        {
            $count=0;
            while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
            {
                $count++;
            }
            return $count;
        }
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisQ['id']=$row['q_id'];
            $thisQ['question']=$row['question'];
            $thisQ['answer']=$row['answer'];
            $thisQ['by']=$row['by'];
            $this->tempArray[]=$thisQ;
        }
        return $this->tempArray;

    }
    /**
     * gets information about the question in the table
     * @param type $id
     * @return array
     */
    public function getContributedQuestion($id)
    {
        $this->sql="select * from contributed_questions where q_id={$id}";
        $this->contactDB();

        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $this->tempArray['question']=$row['question'];
            $this->tempArray['answer']=$row['answer']; 
        }
     
        return $this->tempArray;
    }

     public function removeQuestion($id)
    {
        $this->sql="delete from contributed_questions where q_id={$id}";
        $this->contactDB();
     
        return true;
    }
    /**
     * gets the suggestions contributed by users
     * @param type $GET_COUNT - specified wheather to return the count or actual data
     * @return [mixed]
     */
    public function getSuggestions($GET_COUNT=FALSE)
    {
        $this->sql="select * from ideas";
        $this->contactDB();

        if($GET_COUNT)
        {
            $count=0;
            while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
            {
                $count++;
            }
            return $count;
        }
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisSuggestion['id']=$row['id'];
            $thisSuggestion['about']=$row['about'];
            $thisSuggestion['added']=$row['added'];
            $thisSuggestion['by']=$row['by'];
            $this->tempArray[]=$thisSuggestion;
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
    
    /**
     * adds a quesiton in the db
     * @param type $question
     * @param type $answer
     * @param type $c_id
     * @return boolean
     */
    public function addQuestion($question,$answer,$c_id)
    {
        $this->sql=sprintf("insert into contributed_questions(question,answer,by) values('%s','%s','%s')",
                     $question,$answer,$c_id);
        $this->contactDB(false);
        return true;
    }
    
    /**
     * adds an idea/suggestion in the DB
     * @param type $idea
     * @param type $c_id
     * @return boolean
     */
    public function addIdea($idea,$c_id)
    {
        $this->sql=sprintf("insert into ideas(about,added,by) values('%s',DATE(),'%s')",
                     $idea,$c_id);
        $this->contactDB(false);
        return true;
    }

    
}

?>