<?php
/**
 * Handles all requests to do with the game registration and play
 */
class WKL_Game
{
    /**
     * The mysqli object used to connect to the database
     * @var object
     */
    private $connection;
    /**
     * holds the sql query to be executed
     * @var  string
     */
    private $sql;
    /**
     * Holds the result of the recent database query
     * @var object
     */
    public $contactMgr;

    /**
     * initialises the connection object
     */
    public function __construct()
    {
        require_once(CONFIGPATH.'Environment.php');
        $this->connection=new mysqli($host,$username,$key,$db);
        if($this->connection->connect_error)
        {
            die($this->connection->connect_error);
        }
    }
    
    /**
     * sanitizes the string and sets it as a query to be executed in the next query calls
     * @param string $query
     */
    protected function _setSql($query)
    {
       $this->sql=$query;
    }
    
    /**
     * executes the query in the set sql variable
     * @param bool $multi
     */
    protected function _contactDB($multi=FALSE)
    {
        //$this->sql=$this->connection->escape_string($this->sql);

        if($multi)
        {
             $this->contactMgr=$this->connection->multi_query($this->sql);
        }
        else{
              $this->contactMgr=$this->connection->query($this->sql);
        }
        if(!$this->contactMgr) 
        {
            die($this->connection->error);
        }
    }
    
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
}



?>