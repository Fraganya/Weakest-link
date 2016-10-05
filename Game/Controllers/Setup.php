<?php
/**
 * Setup class for handling game installation and rendering the home page
 */
class Setup
{
    public function __construct()
    {

    }
    /**
     * loads the home page
     */
    public function index()
    {
        $data['title']="Home";
        Screen::render("SetupScreen",$data);
    }
    
    /**
     * loads the installation page
     */
    public function installation()
    {
         $data['title']="Installation";
         Screen::render("Installation",$data);
    }
    
    /**
     * loads the report bug page
     */
     public function bug()
    {
         $data['title']="Bug Report";
         Screen::render("Errors/Bug",$data);
    }
}


?>