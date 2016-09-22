<?php
class wkStaticDB extends SQLite3
{
    private $sql;
    private $tempArray;
    private $contactMgr;

    public function __construct($DBFile)
    {
         $this->open($DBFile);
         $this->tempArray=array();
    }
    public function changeDB($DBFile)
    {
        $this->close();
        $this->open($DBFile);
    }
    private function contactDB($sql)
    {
        $contactMgr=$this->query($sql);
        if(!$contactMgr)
        {
          trigger_error("Failed to get  information from Gameinfo.db.");
        }
    }
    public function getUsedLibraries()
    {
        $this->sql=sprintf("Select * from acknoledgements");
        $this->contactDB();
        $project_num=0;
        while($project_num<$this->changes())
        {
            $row=$contactMgr->fetchArray(SQLITE3_ASSOC);
            $tempArray[$project_num]['id']=$row['id'];
            $tempArray[$project_num]['project']=$row['project'];
            $tempArray[$project_num]['website']=$row['website'];
            $project_num++;
        }
        return $this->tempArray;
    }

     public function getGameGuides()
    {
        $this->sql=sprintf("Select * from guides");
        $this->contactDB();  
        $guide_num=0;
        while($guide_num<$this->changes())
        {
            $row=$contactMgr->fetchArray(SQLITE3_ASSOC);
            $tempArray[$project_num]['guide_id']=$row['guide_id'];
            $tempArray[$project_num]['guide_name']=$row['guide_name'];
            $tempArray[$project_num]['content']=$row['content'];
            $guide_num++;
        }
        return $this->tempArray;
    }

    public function getGameInfo()
    {
        $this->sql=sprintf("Select * from about");
        $this->contactDB();
        $info_count=0;
        while($info_count<$this->changes())
        {
            $row=$contactMgr->fetchArray(SQLITE3_ASSOC);
            $tempArray[$project_num]['gamename']=$row['gamename'];
            $tempArray[$project_num]['info']=$row['info'];
            $tempArray[$project_num]['version']=$row['version'];
            $tempArray[$project_num]['developer']=$row['developer'];
            $info_count++;
        }
        return $this->tempArray;
    }

    public function getContributors()
    {
        $this->sql=sprintf("Select * from about");
        $this->contactDB();
        $info_count=0;
        while($info_count<$this->changes())
        {
            $row=$contactMgr->fetchArray(SQLITE3_ASSOC);
            $tempArray[$project_num]['gamename']=$row['gamename'];
            $tempArray[$project_num]['info']=$row['info'];
            $tempArray[$project_num]['version']=$row['version'];
            $tempArray[$project_num]['developer']=$row['developer'];
            $info_count++;
        }
        return $this->tempArray;
    }
}
$db=new wkStaticDB("file.db");
$db->getGameInformation();
    
?>