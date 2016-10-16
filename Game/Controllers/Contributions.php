<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Contributors.php');
/**
 * Main Game controller
 */
class Contributions
{
    private $contribMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->contribMgr=new ContributorMgr();
    }
    /**
     * This loads [to be specified]
     */
    public function index()
    {
        $data['title']="contributions";
        $data['top_contributors']=$this->contribMgr->getContributors("top_contributors",true);
        Screen::render("ContributionsScreen",$data);
    }

    public function getTopContributors()
    {
        $contribs=$this->contribMgr->getContributors("top_contributors",true);
        return  Response::respondWithJSON($contribs,"Contributors");
    }
    public function getContributors()
    {
        $contribs=$this->contribMgr->getContributors();
        Response::respondWithJSON($contribs,"Contributors");    
    }

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

    public function updateContributor()
    {
        if(valid(array('id','contribution_count'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($contribMgr->updateContributor($Ex_id,$Ex_contribution_count)));
        }
        return (Response::passive(false));
    }
    
}

?>