<?php
/**
 * Script to Create tables and databases for the WKL game
 * @author Francis ganya
 * @email Ganyaf@gmail.com
*/

set_error_handler('errHandler');

function errHandler($e_level,$e_msg,$e_file,$e_line)
{
  echo 'There was an error <pre>';
  echo<<<MSG
  Level {$e_level}
  Message {$e_msg}
  In File {$e_file}
  on Line {$e_line}
  Stack info:Hidden
MSG;
  //var_dump($e_context);
  
}
/**
 * database confifurations
 * @param host
 * @param username
 * @param password
 * @param db_name
 */

$host='localhost';
$user='root';
$passkey='';
$db_name='wkl';


/**
 * create the wkl_games table data scheema
 */

$wkl_game_struct=<<<_SCRIPT
 CREATE TABLE wkl_games(
  game_id INT PRIMARY KEY AUTO_INCREMENT,
  team_tag VARCHAR(25),
  play_time INT DEFAULT 0,
  questions INT DEFAULT 0,
  accuracy INT,
  difficulty VARCHAR(15) NOT NULL,
  type varchar(20) NOT NUll,
  player_count INT NOT NULL,
  winner TEXT,
  status VARCHAR(10)) ENGINE MYISAM 
_SCRIPT;

/**
 * create the wkl_players table scheema
 */
$wkl_player_struct=<<<_SCRIPT
 CREATE TABLE wkl_players(
  player_id INT PRIMARY KEY AUTO_INCREMENT,
  game_tag int NOT NULL,
  fname VARCHAR(30) NOT NULL,
  sname VARCHAR(30) NOT NULL,
  location VARCHAR(30) NOT NULL,
  is_active BOOLEAN,
  flags VARCHAR(10),
  FOREIGN KEY(game_tag) REFERENCES wkl_games(game_id)) ENGINE MYISAM         
_SCRIPT;
        
 /**
 * create the wkl_questions table scheema
 */
$wkl_questions_struct=<<<_SCRIPT
  CREATE TABLE wkl_questions(
   question_id INT PRIMARY KEY AUTO_INCREMENT,
   question TEXT NOT NULL,
   category VARCHAR(15)  NOT NULL,
   difficulty VARCHAR(15)NOT NULL,
   last_accesss TIMESTAMP ) ENGINE MYISAM
_SCRIPT;

/**
 * create the wkl_answers table scheema
 */
$wkl_answers_struct=<<<_SCRIPT
CREATE TABLE wkl_answers(
 answer_id INT PRIMARY KEY AUTO_INCREMENT,
 to_qid INT NOT NULL,
 answer VARCHAR(50) NOT NULL,  
 FOREIGN KEY (to_qid) REFERENCES wkl_questions(question_id)
)ENGINE MYISAM        
_SCRIPT;


/**
 * create the db mysqli object and make the transactions
 */

$connection=new mysqli($host,$user,$passkey,$db_name);
if($connection->connect_error)
{
    echo "<pre>I reached here<br>{}<pre>";
    $errorMsg="Could not establish connection to the database.Check your configurations in this file ->".__FILE__;
    $errorMsg+="<br/>Error:".$connection->connect_error;
    die($errorMsg);
}

/**
 * load the script into an array and add them to the database
 */

$table_scripts=array('game-table'=>$wkl_game_struct,'players-table'=>$wkl_player_struct,
                    'questions-table'=>$wkl_questions_struct,'answers-table'=>$wkl_answers_struct);


//drop tables 
$connection->query("DROP TABLES IF EXISTS wkl_questions,wkl_games,wkl_answers,wkl_players;");
foreach($table_scripts as $key => $value)
{
    $wkl_table_status=$connection->query($value);
    if(!$wkl_table_status) {die("Error: Could not create ".$key.'<br /> Error:'.$connection->error);}
    echo "[]. Successfully create the {$key} <br />";
}


echo "<br/>[Success] Created all Neccessary tables<br/>";
?>