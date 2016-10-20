<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Session.php');
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_WKL_BASE.php');
$load->file(MODELSPATH.'M_GAME.php');
/**
 * Main Game controller
 */
class Game
{
    /**
     * holds the game controller
     * @var object
     */
    private $gameModel;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->gameModel=new WKL_Game();
    }
    /**
     * This loads []
     */
    public function index()
    {
      
    }
    
    /**
     * registers the game and players in the database
     * @return bool
     */
    public function register()
    {   
       if(valid(array('players','difficulty','typeof'),$_POST))
       {
           extract($_POST,EXTR_PREFIX_ALL,'Ex');
           $thisGame=new Session($Ex_typeof,$Ex_difficulty);
           $thisGame->player_count('SET',count($Ex_players)); 
           if($this->gameModel->createGame($thisGame))
           {
               if($this->gameModel->register_players($thisGame->id('GET'),$Ex_players))
               {
                   $status=true;
                   return Response::respondWithJSON(array('game_id'=>$thisGame->id('GET')),null);
               }
               
           }           
       }     
       Response::passive(false);
    }
    
    /**
     * loads the game play data and loads the play page
     */
    public function play()
    {
        if(valid('id',$_GET))
        {
           session_start();
           $_id=$_GET['id'];

           //server the game id in session for global access
           $_SESSION['id']=$_id;
           $data['session']='wkl-'.$_id;
           $data['title']="Game Play";

           $data['gameInfo']=$this->gameModel->get_init_data($_id);
           Screen::render("Play",$data);
        }
        else{
            show_404("Game/play");
        }
    
    }
    /**
     * gets the game data to initialise game components when game is in init state
     * @return object
     */
    public function getPlayData()
    {
        session_start();
        $_id=$_SESSION['id'];
        $info=$this->gameModel->get_game_players($_id);
        $info['game_id']=$_id;
        return Response::respondWithJSON($info,null);
    }
    
    /**
     * returns the number of games played on this server
     * @return int
     */
    public function count()
    {
        $count=$this->gameModel->getCount();
        return Response::respondWithJSON(array('count'=>$count),"games_played");
    }
    
    /**
     * returns the games with the top scores
     * @return object
     */
    public function topGames()
    {
        $games=$this->gameModel->getTopGames();
        return Response::respondWithJSON(array($games),"game");
    }
    
    /**
     * returns information about all the games played on this server
     * @return type object
     */
    public function get_all()
    {
        return Response::respondWithJSON($this->gameModel->getTopGames(NULL,NULL,TRUE),"games");
    }
    /**
     * loads the game scores page
     */
    public function scores()
    {
        $data['title']="Scores";
        Screen::render("Scores",$data);
    }
    
    /**
     * gets the top score
     * @return int
     */
    public function topScore()
    {
        $score=$this->gameModel->getTopGames(1,TRUE);
        if(!$score) {$score=0;}
        return Response::respondWithJSON(array('score'=>$score),"score");
    }
    
    /**
     * returns the lowest score
     * @return int
     */
     public function lowScore()
    {
        $score=$this->gameModel->getLowScore();
        if(!$score) {$score=0;}
        Response::respondWithJSON(array('score'=>$score),"score");
    }
}

?>