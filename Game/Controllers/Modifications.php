<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_Modifications.php');
/**
 * Modifications controller
 * handles all requests to do with the game modifications
 */
class Modifications
{
    /**
     * holds the modifications model
     * @var object
     */
    private $modMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->modMgr=new ModificationsMgr();
    }
    /**
     * prints the name of this controller
     */
    public function index()
    {
        echo "Modifications";
    }
    /**
     * This loads [to be specified]
     */
   /**
    * gets a list of the modifications
    * @return object
    */
    public function get()
    {
        $mods=$this->modMgr->getModifications();
        return Response::respondWithJSON($mods,"Modifications");
    }

    /**
     * adds a modification to the modification table
     * @return bool
     */
    public function add()
    {
        //encode the data 
        $_POST['mod']=$_POST['data'][0]['value'];
        $_POST['real']=$_POST['data'][1]['value'];
        $_POST['changes']=$_POST['data'][2]['value'];
        if(valid(array('mod','real','changes'),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            return (Response::passive($this->modMgr->addModification($Ex_mod,$Ex_real,$Ex_changes)));
        }
        return Response::passive(false);
    }
    
    /**
     * removes a modification
     * @return bool
     */
    public function remove()
    {
         if(valid(array('modID'),$_POST))
        {
            extract($_POST,EXTR_PREFIX_ALL,'Ex');
            return (Response::passive($modMgr->removeModification($Ex_modID)));
        }
        return Response::passive(false);
    }
    
    /**
     * updates a modification
     * gets and validates the @vars modID,field and value
     * @return bool
     */
    public function update()
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