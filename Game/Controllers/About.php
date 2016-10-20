<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_About.php');
/**
 * About controller handling all requests to do with the game info
 */
class About
{
    /**
     * contains the AboutMgr model
     * @var object
     */
    private $infoMgr;
    /**
     * initialise controller variables here 
     * instantiates the about model
     */
    public function __construct()
    {
        $this->infoMgr=new AboutMgr();
    }
    /**
     * gets and returns a JSON object with the gameinfo
     * @return object
     */
     public function info()
     {
         $info=$this->infoMgr->getAboutInfo();
         return Response::respondWithJSON($info,"about");
     }
     /**
      * gets and returns game information summary in JSON
      * gets - version , game name and overview
      * @return object
      */
     public function summary()
     {
         $info=$this->infoMgr->getAboutInfoAB();
         return Response::respondWithJSON($info,"about");
     }
    
     /**
      * gets and returns credit information
      * developer name , website and email
      * @return object
      */
    public function credits()
    {
         $info=$this->infoMgr->getAboutInfoCR();
         return Response::respondWithJSON($info,"about");
    }
    /**
     * updates a field in the info table of the gameinfo db
     * gets a field and value as vars
     * @return bool
     */
    public function update()
    {
        if(valid(array('field','value'),$_POST))
        {
                // Extract all values into variables and prefix with Ex for Extracted
                extract($_POST,EXTR_PREFIX_ALL, 'Ex');
                return (Response::passive($this->infoMgr->updateAboutInfo($Ex_field,$Ex_value)));
        }
        Response::passive(false);
    }
}

?>