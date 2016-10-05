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
           $data['session']='wkl-'.$_GET['id'];
           $data['title']="Game Play";
           Screen::render("Play",$data);
        }
        else{
            show_404("Game/play");
        }
    
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