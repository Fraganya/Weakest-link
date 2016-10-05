<?php
require_once'M_WK.php';
/**
 * handles all request to do with game modifications
 */
class ModificationsMgr extends WK_MODEL
{
    # call parent constructor to load db
    public function __construct()
    {
        parent::__construct();
    }

    /**
    * getModifications
    * gets modifications
    * @return array
    **/
    public function getModifications()
    {
        $this->sql="select * from modifications";
        $this->contactDB();
        while($row=$this->contactMgr->fetchArray(SQLITE3_ASSOC))
        {
            $thisMod['id']=$row['mod_id'];
            $thisMod['mod']=$row['mod'];
            $thisMod['real']=$row['real'];
            $thisMod['changes']=$row['changes'];

            $this->tempArray[]=$thisMod;
        }

        return $this->tempArray;
    }

    /**
    * addModification
    * adds a modification
    * @param modification 
    * @param real 
    * @param changees
    * @return	boolean
    **/
    public function addModification($mod,$real='void',$changes)
    {
        $this->sql=sprintf("insert into modifications(mod,real,changes) values('%s','%s','%s')",$mod,$real,$changes);
        $this->contactDB();
        return true;
    }

    /**
    * removeModification
    * removes a Modification 
    * @param modID
    * @return	boolean
    **/
    public function removeModification($modID)
    {
        $this->sql=sprintf("delete from modifications where mod_id=%s",$modID);
        $this->contactDB();
        return true;
    }

    /**
    * updateModification
    * updates a modification's info
    * @param modID
    * @param field
    * @param value
    * @return	boolean
    **/
    public function updateModification($modID,$field,$value)
    {
        $this->sql=sprintf("update modifications set %s='%s' where mod_id=%s",$field,$value,$modID);
        $this->contactDB();
        return true;
    }
}
?>