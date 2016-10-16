<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Acknowledgements.php');
/**
 * Main Game controller
 */
class Acknowledgements
{
    private $ackMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->ackMgr=new AcknowledgementMgr();
    }
    public function index()
    {
        echo "Acknowledgements";
    }
    /**
     * This loads [to be specified]
     */
     public function getAcknowledgements()
     {
        $acks=$this->ackMgr->getAcknowledgements();
        Response::respondWithJSON($acks,"Acknowldgements");
     }
     public function addAcknowledgement()
     {
         if(valid(array('project','website'),$_POST))
        {
                extract($_POST, EXTR_PREFIX_ALL, 'Ex');
                return (Response::passive($ackMgr->addAcknowledgement($Ex_project,$Ex_website)));   
        }
        return (Response::passive(false));
     }
    
    public function updateAcknowldgement()
    {
        if(valid(array('id','field','value'),$_POST))
        {
                extract($_POST, EXTR_PREFIX_ALL, 'Ex');
                return (Response::passive($ackMgr->updateAcknowledgement($Ex_id,$Ex_field,$Ex_value)));
        }
        return (Response::passive(false));
    }

}

?>