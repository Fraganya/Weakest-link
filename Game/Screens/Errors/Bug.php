
<?php defined("GAMEDIR") or exit("Cannot accees game path");
/*-----------------------------------------------------------------------------
|                       declare global objects
------------------------------------------------------------------------------*/
$load=new Asset();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<?php
/*-----------------------------------------------------------------------------
|                       load stylesheets
------------------------------------------------------------------------------*/
$load->file(SCREENSPATH.'Common/Styles.php',array('load'=>$load));
echo  $load->css("font-awesome");
echo  $load->css("custom")
?>
<title><?php echo $title ?></title>
</head>
<body>

<div class="container game-panel ">
 <h1 class="page-header">Game Bug : (001)</h1>
 <p class="well well-sm lead">
  We appreciate you for taking time to report any bugs that you find in the game.
 </p>
 <div id="bug-form" class="col-sm-5 marg-1"></div>
 <div class="marg-1 col-sm-5">
 <a  class="btn btn-link wk-btn-link btn-lg fa fa-home marg-1" href="."> Go To main screen</a>
 </div>
 
 
</div>

<?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
  $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
  echo $load->js("Components/bug");
?>
</body>
</html>
