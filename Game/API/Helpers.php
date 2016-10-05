<?php
/**
* Game helpers
* Lets you perfom common operations that cannot be aggregated into classes*
* @author FrancisGanya
* @email  Ganyaf@gmail.com
* @link   fraganya.me.ht
*/

/**
* is_routable
* checks if the passed in controller and function names exist
* returns true if successful otherwise false 
* @param	string
* @param	string
* @return	bool
*/
function is_routable($controller,$method)
{
    require_once(CONFIGPATH."Routes.php");
    $routability=false;
    if(array_key_exists($controller,$routes))
    {
        if(in_array($method,$routes[$controller]))
        {
            $routability=true;
            return $routability;
        }
    }
    return $routability;
}

/**
* valid
* checks if the variable /variables passed are valid- set and not empty
* assumes array to check is $_POST
* @param	array
* @return	boolean
*/
function valid($container,$global_arr)
{
    $validity=false;
    if(is_array($container))
    {
        foreach($container as $var)
        {
            if(array_key_exists($var,$global_arr) && !empty($global_arr[$var]))
            {
                $validity=true;
            }
            else{ 
                $validity=false;
                break;
            }
        }
    }
    else
    {
        if(array_key_exists($container,$global_arr) && !empty($global_arr[$container]))
        {
            $validity=true;
        }
    }
    return $validity;
}

/**
* show_404
* Displays the error page
* 
* @param	string
* @return	null
*/
function show_404($page)
{
    $data['page']=$page;
    Screen::render("Errors/404",$data);
}
?>