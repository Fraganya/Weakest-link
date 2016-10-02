<?php
class Game
{
    public function __construct()
    {

    }
    public function index()
    {

    }
    public function register()
    {
        if(!empty($_POST['players']) && !empty($_POST['difficulty']))
        {
            $file=fopen(GAMEDIR."Data/"."received.txt",'w') or die("Could not open file");
            fwrite($file,$_POST['players'][0]['fname']."\n");
            fwrite($file,$_POST['players'][0]['sname']."\n");
            fwrite($file,$_POST['players'][0]['location']."\n");
            fwrite($file,$_POST['players'][1]['fname']."\n");
            fwrite($file,$_POST['players'][1]['sname']."\n");
            fwrite($file,$_POST['players'][1]['location']."\n");
            fwrite($file,$_POST['difficulty']."\n");
            fclose($file);
        }
        
        var_dump($_POST['players']);
        var_dump($_POST['difficulty']);
        echo 'true';
    }
    public function contributions()
    {
        $data['title']="Contributions";
        Screen::render("Contributions",$data);
    }
    public function scores()
    {
        $data['title']="Scores";
        Screen::render("Scores",$data);
    }
    public function play()
    {
        $data['title']="Game Play";
        Screen::render("Play",$data);
    }
}

?>