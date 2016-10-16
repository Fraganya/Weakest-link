<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Guides.php');
/**
 * Main Game controller
 */
class Guides
{
    private $guideMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->guideMgr=new GuideMgr();
    }
    public function index()
    {
        echo "Guides";
    }
    /**
     * This loads [to be specified]
     */
    public function getGuides()
    {
        if(valid('count',$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');   
            $guides=$this->guideMgr->getGuides($Ex_count);
            return (Response::respondWithJSON($guides,"Guides"));
        }
        Response::passive(false);
    }

    public function addGuide()
    {
        if(valid(array('guideName','guideContent'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($this->guideMgr->addGuide($Ex_guideName,$Ex_guideContent)));
        }
        Response::passive(false);
    }

    public function removeGuide()
    {
         if(valid(array('guideId'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($this->guideMgr->removeGuide($Ex_guideId)));
        }
        Response::passive(false);
    }

    public function updateGuide()
    {
        if(valid(array('guideId','field','value'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($this->guideMgr->updateGuide($Ex_guideId,$Ex_field,$Ex_value))); 
        }
        Response::passive(false);
    }

}

?>