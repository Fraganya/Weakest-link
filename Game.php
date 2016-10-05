<?php defined("GAMEPATH") or exit("Cannot access Game path");


/*-----------------------------------------------------------------------------
|                        set error handler                                      
------------------------------------------------------------------------------*/
set_error_handler("error_handler"); 

/*-----------------------------------------------------------------------------
|                       require core files functions                                    
------------------------------------------------------------------------------*/
require_once(APIPATH."Asset.php");


/*-----------------------------------------------------------------------------
|                       declare global objects                                  
------------------------------------------------------------------------------*/
$Asset=new Asset();

/*-----------------------------------------------------------------------------
|                       get files with generic functions                                   
------------------------------------------------------------------------------*/
$Asset->file(APIPATH."Helpers.php");
$Asset->file(APIPATH."Screen.php");


/*-----------------------------------------------------------------------------
|                        Get Controller and action
-----------------------------------------------------------------------------*/
$controller=(isset($_GET['controller'])) ? $_GET['controller'] : 'Setup';
$method=(isset($_GET['method'])) ? $_GET['method'] : 'index';

/*-----------------------------------------------------------------------------
|                        Validate the route
-----------------------------------------------------------------------------*/
if(is_routable($controller,$method))
{
    $Asset->file(CONTROLLERSPATH.$controller.".php");
    $activeController=new $controller();
    $activeController->{ $method }();
}
else
{
    show_404($controller.PATH_DELIMITER.$method);
}

/**
 * Customer error handler and prints nice,beutiful looking error page
 * does not handle syntax errors
 * @param type $e_level
 * @param type $e_msg
 * @param type $e_file
 * @param type $e_line
 * @param type $e_context
 */
function error_handler($e_level,$e_msg,$e_file,$e_line,$e_context)
{
    $error_info=array('level'=>$e_level,'msg'=>$e_msg,'filename'=>$e_file,'line'=>$e_line,'context'=>$e_context);
    Screen::render("Errors/Error",$error_info);
    die();
}
?>