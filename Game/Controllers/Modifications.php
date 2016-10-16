<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Modifications.php');
/**
 * Main Game controller
 */
class Modifications
{
    private $modMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->modMgr=new ModificationsMgr();
    }
    public function index()
    {
        echo "Modifications";
    }
    /**
     * This loads [to be specified]
     */
   
    public function getMods()
    {
        $mods=$this->modMgr->getModifications();
        return Response::respondWithJSON($mods,"Modifications");
    }

    public function addMod()
    {
        if(valid(array('mod','real','changes'),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            return (Response::passive($modMgr->addModification($Ex_mod,$Ex_real,$Ex_changes)));
        }
        Response::passive(false);
    }

    public function removeMod()
    {
         if(valid(array('modID'),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            return (Response::passive($modMgr->removeModification($Ex_modID)));
        }
        Response::passive(false);
    }

    public function updateMod()
    {
        if(valid(array('modID','field','value'),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            return (Response::passive($modMgr->updateModification($Ex_modID,$Ex_field,$Ex_value)));
        }
        Response::passive(false);
    }
}

?>