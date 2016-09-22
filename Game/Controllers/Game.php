<?php
class Game
{
    public function __construct()
    {

    }
    public function index()
    {

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