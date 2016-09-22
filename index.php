<?php
/*
|-------------------------------------------------------------------------------
|                        Initialise game system info
|-------------------------------------------------------------------------------
|@package Weakest-link emulator
|@author  Francis Ganya
|@email   Ganyaf@gmail.com 
*/

/*------------------------------------------------------------------------------
|                       Immutables                                        
------------------------------------------------------------------------------ */
define("PATH_DELIMITER",'/');   
/*-----------------------------------------------------------------------------
|                        Game Paths                      
-----------------------------------------------------------------------------*/

//path to the weakest-link 
$game_path='Weakest-link';

//path to the game directory
$game_dir='Game';

//An array of the game directories that will be required
$game_dirs=array("API","Assets","Config","Controllers","Data","Docs","Logs","Models","Screens");


if(is_dir($_SERVER['DOCUMENT_ROOT'].PATH_DELIMITER.$game_path) && is_dir($game_dir))
{
    //define the application name
    define("APPNAME","Weakest-link");
    //define server path 
    define("SERVER","http://".$_SERVER['HTTP_HOST'].PATH_DELIMITER);
    //Absolute game path
    define("GAMEPATH",($_SERVER['DOCUMENT_ROOT']).PATH_DELIMITER.$game_path.PATH_DELIMITER);

    //Absolute game directory
    define("GAMEDIR",GAMEPATH.$game_dir.PATH_DELIMITER);

    /*Define directory constants for each of the game directories */
    array_map(function($dir){
        if(is_dir(GAMEDIR.$dir)){
            define(strtoupper($dir)."PATH",GAMEDIR.$dir.PATH_DELIMITER);
        }
        
    },$game_dirs);

    //call the Front controller
     require_once("Game.php");
}
else
{
    //The game path directory on the server was not specified
    header('HTTP/1.1 503 Service Unavailable.', TRUE, 503);
    echo "The game paths not set.<br />Check this file.".__FILE__."<br />";
}



?>
