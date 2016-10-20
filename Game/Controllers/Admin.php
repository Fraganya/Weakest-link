<?php
/**
 * Admin controller
 * handles requests to do with adminstration of the game
 */
class Admin
{
    public function __construct()
    {

    }
    /**
     * index
     * loads the admin panel 
     */
    public function index()
    {
        $data['title']="Admin Home";
        Screen::render('Admin/home',$data);
    }
}


?>