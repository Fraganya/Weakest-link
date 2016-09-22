<?php
class Setup
{
    public function __construct()
    {

    }
    public function index()
    {
        $data['title']="Home";
        Screen::render("SetupScreen",$data);
    }
    public function installation()
    {
         $data['title']="Installation";
         Screen::render("Installation",$data);
    }
     public function bug()
    {
         $data['title']="Bug Report";
         Screen::render("Errors/Bug",$data);
    }
}


?>