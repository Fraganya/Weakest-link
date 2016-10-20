<?php

/**
 * Handles all requests to do with the game registration and play
 */
class WKL_Game extends M_WKL_BASE
{   
    /**
     * registers the game in the database 
     * and gets the registered game id to be used during player registration
     * @param object $game
     * @return boolean
     */
   public function createGame(&$game)
   {
       //create the game
       $query=sprintf("insert into wkl_games(team_tag,player_count,status,difficulty,type) values('%s','%s','%s','%s','%s')",
                     $game->teamTag,$game->player_count('GET'),$game->status('GET'),$game->difficulty('GET'),$game->type);
       $this->_setSql($query);
       $this->_contactDB();

       //get the created game id
       $this->_setSql("select game_id from wkl_games order by game_id desc limit 1");
       $this->_contactDB();
       
       $this->contactMgr->data_seek(0);
       $game->id('SET',$this->contactMgr->fetch_assoc() ['game_id']);

       return true;
   }
   
   /**
    * registers the players in the database using the just registerd game id
    * @param integer $gameID
    * @param array $players
    * @return boolean
    */
   public function register_players($gameID,$players)
   {
       $query='';
       foreach($players as $contestant)
       {
           $query.=sprintf("insert into wkl_players(game_tag,fname,sname,location) values('%d','%s','%s','%s'); ",
            $gameID,$contestant['fname'],$contestant['sname'],$contestant['location']
           );
           
       }
       $this->_setSql($query);
       $this->_contactDB(TRUE);

       return true;
   }

   /**
    * gets data to initialise game play
    * @param type $gameId
    * @return type
    */
    public function get_init_data($gameId)
    {
        //get game difficulty
        $this->_setSql("select difficulty from wkl_games where game_id={$gameId}");
        $this->_contactDB();

        $this->contactMgr->data_seek(0);
        $this->tempArray['difficulty']=$this->contactMgr->fetch_assoc()['difficulty'];
        
        //get players 
        $this->_setSql("select fname,sname,location from wkl_players where game_tag={$gameId}");
        $this->_contactDB();

        //encode the contestants into an array
        for($counter=0;$counter<$this->contactMgr->num_rows;$counter++)
        {
            $c_player=$this->contactMgr->fetch_array(MYSQLI_ASSOC);
            $this->tempArray['contestants'][]=array(
                'fname'=>$c_player['fname'],
                'sname'=>$c_player['sname'],
                'location'=>$c_player['location']
            );
        }

        return $this->tempArray;
    }
    
    /**
     * gets player data
     * @param type $gameId
     * @return type
     */
    public function get_game_players($gameId)
    {
        $this->_setSql("select player_id,fname from wkl_players where game_tag={$gameId}");
        $this->_contactDB();

        //encode the contestants into an array
        for($counter=0;$counter<$this->contactMgr->num_rows;$counter++)
        {
            $c_player=$this->contactMgr->fetch_array(MYSQLI_ASSOC);
            $this->tempArray['players'][]=array(
                'id'=>$c_player['player_id'],
                'fname'=>$c_player['fname']                
            );
        }

        return $this->tempArray;
    }
    
    /**
     * gets the number of games played
     * @return int
     */
    public function getCount()
    {
        $this->_setSql("select game_id from wkl_games");
        $this->_contactDB();
        $count=0;
        while($row=$this->contactMgr->fetch_array(MYSQLI_ASSOC))
        {
              $count++ ;     
        }

        return $count;
    }
    
    /**
     * gets the information about top games,score and all games in general
     * @param type $limit - the number of entries to get
     * @param type $GET_TIP_TOP - get the highest score
     * @param type $GAMES_ONLY - get game information only
     * @return type
     */
    public function getTopGames($limit=10,$GET_TIP_TOP=FALSE,$GAMES_ONLY=FALSE)
    {
        $query='';
        if($GAMES_ONLY){
            $query="select game_id,money,player_count from wkl_games";
        }
        else{
             $query=sprintf("select game_id,money,player_count from wkl_games order by money desc limit %d",
                        $limit);
        }
       

        $this->_setSql($query);
        $this->_contactDB();
        if($GET_TIP_TOP)
        {
            $money=$this->contactMgr->fetch_array(MYSQLI_ASSOC)['money'];
            return $money;    
        
        }
        
        while($row=$this->contactMgr->fetch_array(MYSQLI_ASSOC))
        {
              $this->tempArray[]=array('tag'=>"wkl-{$row['game_id']}",
                                        'players'=>$row['player_count'],
                                        'money'=>$row['money']); 
        }
        
        return $this->tempArray;
    }
    
    /**
     * gets the lowest score of the played games
     * @return int
     */
    public function getLowScore()
   {
        $this->_setSql("select money from wkl_games order by money asc limit 1");
        $this->_contactDB();
       
        $money=$this->contactMgr->fetch_array(MYSQLI_ASSOC)['money'];
        return $money;    
        
   }
}
?>