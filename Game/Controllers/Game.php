<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Session.php');
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_GAME.php');
/**
 * Main Game controller
 */
class Game
{
    private $load;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
   
    }
    /**
     * This loads [to be specified]
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
           $gameModel=new WKL_Game();
           extract($_POST,EXTR_PREFIX_ALL,'Ex');
           $thisGame=new Session($Ex_typeof,$Ex_difficulty);
           $thisGame->player_count('SET',count($Ex_players)); 
           if($gameModel->createGame($thisGame))
           {
               if($gameModel->register_players($thisGame->id('GET'),$Ex_players))
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

           $gameModel=new WKL_Game();
           $data['gameInfo']=$gameModel->get_init_data($_id);
           Screen::render("Play",$data);
        }
        else{
            show_404("Game/play");
        }
    
    }
    
    public function getPlayData()
    {
        session_start();
        $_id=$_SESSION['id'];
        $gameModel=new WKL_Game();
        $info=$gameModel->get_game_players($_id);
        $info['game_id']=$_id;
        Response::respondWithJSON($info,null);
    }
    /**
     * load the game contributions pages
     */
    public function contributions()
    {
        $data['title']="Contributions";
        Screen::render("Contributions",$data);
    }
    
    /**
     * loads the game scores page
     */
    public function scores()
    {
        $data['title']="Scores";
        Screen::render("Scores",$data);
    }
}

?>