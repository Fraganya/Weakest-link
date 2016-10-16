<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_About.php');
/**
 * Main Game controller
 */
class About
{
    private $infoMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->infoMgr=new AboutMgr();
    }
    /**
     * This loads [to be specified]
     */
     public function getAboutInfo()
     {
         $info=$this->infoMgr->getAboutInfo();
         Response::respondWithJSON($info,"about");
     }
     public function getAboutInfo_about()
     {
         $info=$this->infoMgr->getAboutInfoAB();
         Response::respondWithJSON($info,"about");
     }
    
    public function getCreditInfo()
    {
         $info=$this->infoMgr->getAboutInfoCR();
         Response::respondWithJSON($info,"about");
    }

    public function updateInfo()
    {
        if(valid(array('field','value'),$_POST))
        {
                // Extract all values into variables and prefix with Ex for Extracted
                extract($_POST,EXTR_PREFIX_ALL, 'Ex');
                return (Response::passive($infoMgr->updateAboutInfo($Ex_field,$Ex_value)));
        }
        Response::passive(false);
    }
}

?>