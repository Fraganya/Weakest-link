<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Contributors.php');
/**
 * Contributions class
 * Handles requests to do with contributions - questions and  suggestions
 */
class Contributions
{
    /**
     * ref of the contribution model
     * @var object
     */
    private $contribMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->contribMgr=new ContributorMgr();
    }
    /**
     * This loads the contributions page
     */
    public function index()
    {
        $data['title']="contributions";
        $data['top_contributors']=$this->contribMgr->getContributors("top_contributors",true);
        Screen::render("ContributionsScreen",$data);
    }
    /**
     * gets the number of contributions made to the game
     * adds both suggestions and questions submitted
     * @return int
     */
    public function count()
    {
        $Qcount=$this->contribMgr->getContributedQuestions(TRUE);
        //$Icount=$this->contribMgr->getSuggestions(TRUE);
        return  Response::respondWithJSON(array('count'=>$Qcount),"data");
    } 
    /**
     * gets a list of top contributors from the top_contributors 
     * bases selection on contribution count
     * @return object
     */
    public function top_contributors()
    {
        $contribs=$this->contribMgr->getContributors("top_contributors",true);
        return  Response::respondWithJSON($contribs,"Contributors");
    }
    
    /**
     * gets contributors to the game
     * @return object
     */
    public function contributors()
    {
        $contribs=$this->contribMgr->getContributors();
        return Response::respondWithJSON($contribs,"Contributors");    
    }
    
    /**
     * addss a question to the contributed_questions table
     * @return bool
     */
    public function addQuestion()
    {
        if(valid(array('fname',"sname","question","answer"),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            $contribID=$this->contribMgr->addContributor($Ex_fname,$Ex_sname,true);
            return (Response::passive($this->contribMgr->addQuestion($Ex_question,$Ex_answer,$contribID)));
        }
        return (Response::passive(false));
    }
    
    /**
     * removes a pending question in the contributed_questions table that has been added to the main DB
     * @return bool
     */
    public function removeQuestion()
    {
        if(valid('id',$_POST))
        {
            return Response::passive($this->contribMgr->removeQuestion($_POST['id']));
        }
        return Response::passive('false');
    }
    /**
     * gets the user contributed questions
     * @return object
     */
    public function questions()
    {
       return Response::respondwithJSON($this->contribMgr->getContributedQuestions(),"questions");
    }
    
    /**
     * gets a question information
     * @return [mixed]
     */
    public function question()
    {
        if(valid('id',$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            $question=$this->contribMgr->getContributedQuestion($Ex_id);
            if($question)
            {
                return Response::respondwithJSON($question,"question");
            }
            
        }
        return Response::passive(false);
    }
    /**
     * adds a suggestion/idea to the ideas table
     * @return bool
     */
    public function addIdea()
    {
        if(valid(array('fname',"sname","suggestion"),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            $contribID=$this->contribMgr->addContributor($Ex_fname,$Ex_sname,true);
            return (Response::passive($this->contribMgr->addIdea($Ex_suggestion,$contribID)));
        }
        return (Response::passive(false));
    }

    /**
     * updates a contributors details in the contributors table
     * @return bool
     */
    public function updateContributor()
    {
        if(valid(array('id','contribution_count'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($contribMgr->updateContributor($Ex_id,$Ex_contribution_count)));
        }
        return (Response::passive(false));
    }
    
    /**
     * gets all the suggestions in the ideas table
     */
    public function suggestions()
    {
        Response::respondWithJSON($this->contribMgr->getSuggestions(),"suggestions");
    }
    
}

?>