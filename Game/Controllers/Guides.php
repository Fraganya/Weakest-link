<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Guides.php');
/**
 * Guides controller class
 * handles all guide- associated requests
 */
class Guides
{
    /**
     *holds the guides model
     * @var object
     */
    private $guideMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->guideMgr=new GuideMgr();
    }
    /**
     * print the name of this controller
     */
    public function index()
    {
        echo "Guides";
    }
    /**
     * This gets (##) guides in the DB
     * gets and validates the @var count to get
     * @return mixed
     */
    public function get()
    {
        if(valid('count',$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');   
            $guides=$this->guideMgr->getGuides($Ex_count);
            return (Response::respondWithJSON($guides,"Guides"));
        }
        return Response::passive(false);
    }
    
    /**
     * gets all the guides
     * @return object
     */
    public function all()
    {
         return Response::respondWithJSON($this->guideMgr->getGuides(),"Guides");
    }
    
    /**
     * adds a guides to the guides table
     * @return bool
     */
    public function add()
    {
        $_POST['guideName']=$_POST['data'][0]['value'];
        $_POST['guideContent']=$_POST['data'][1]['value'];
        if(valid(array('guideName','guideContent'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($this->guideMgr->addGuide($Ex_guideName,$Ex_guideContent)));
        }
       return  Response::passive(false);
    }
    
    /**
     * removes a guide from the guides table
     * @return bool
     */
    public function remove()
    {
         if(valid(array('guideId'),$_POST))
        {
                extract($_POST,EXTR_PREFIX_ALL,'Ex');
                return (Response::passive($this->guideMgr->removeGuide($Ex_guideId)));
        }
        return Response::passive(false);
    }

    /**
     * updates a guides entry in the guides table
     * gets and validates @vars guideId,field and value
     * @return bool
     */
    public function update()
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