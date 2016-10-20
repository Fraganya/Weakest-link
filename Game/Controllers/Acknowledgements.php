<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Acknowledgements.php');
/**
 * Acknowldgement Controller class
 * handles acknowldgement requests
 */
class Acknowledgements
{
    /**
     * holds the acknowledgement model
     * @var object
     */
    private $ackMgr;
    /**
     * instantiate the acknowledgement model
     */
    public function __construct()
    {
        $this->ackMgr=new AcknowledgementMgr();
    }
    /**
     * print the name of this controller
     */
    public function index()
    {
        echo "Acknowledgements";
    }
    /**
     * gets a list of used projects and libraries
     * @return object - JSON
     */
     public function get()
     {
        $acks=$this->ackMgr->getAcknowledgements();
        return Response::respondWithJSON($acks,"Acknowldgements");
     }
     /**
      * adds a library/and project to the acknowledgements table
      * gets and validates the vars project and website
      * @return bool
      */
     public function add()
     {
         $_POST['project']=$_POST['data'][0]['value'];
         $_POST['website']=$_POST['data'][1]['value'];
         
        if(valid(array('project','website'),$_POST))
        {
                extract($_POST, EXTR_PREFIX_ALL, 'Ex');
                return (Response::passive($this->ackMgr->addAcknowledgement($Ex_project,$Ex_website)));   
        }
        return (Response::passive(false));
     }
    /**
     * updates a field in the acknowledgements ables
     * gets and validates the @vars id,field and var
     * @return bool
     */
    public function update()
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