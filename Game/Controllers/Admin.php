<?php

class Admin
{
    public function __construct()
    {

    }
    public function index()
    {
        $data['title']="WKL Login";
        Screen::render('Admin/login',$data);
    }
    public function home()
    {
        $data['title']="Admin Home";
        Screen::render('Admin/home',$data);
    }
}


?>