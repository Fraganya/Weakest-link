
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
<title><?php echo "Screen Broken"; ?></title>
</head>
<body>

<div class="container game-panel ">
 <h1 class="page-header">Game Screen Broken : (404)</h1>
 <p class="well well-lg lead">
  Sorry but the game screen <span class="screen-name"><?php echo $page; ?> </span>you were trying to access does not exist.
 </p>
 <div class="marg-1">
 <a  class="btn btn-link wk-btn-link btn-lg fa fa-home marg-1" href="."> Go To main screen</a>
 <a  class="btn btn-link wk-btn-link btn-lg fa fa-bug marg-1" href="."> Report Bug</a>
 </div>
 
 
</div>

<?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
?>
</body>
</html>
