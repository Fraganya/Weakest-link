
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
<title><?php echo "System Error"; ?></title>
</head>
<body>

<div class="container game-panel ">
<h1 class="page-header">Game System Error : (000)</h1>
<p class="well well-lg lead">
 Sorry but the game system encountered an error
</p>
<div class="col-sm-12">
 <h4>Error Level</h4>
 <p><?php echo ($level) ?></p>
 <h4 >Error Message</h4>
 <p><?php echo $msg; ?></p>
 <h4 >Error File</h4>
 <p><?php echo $filename; ?></p>
 <h4 >Error Line</h4>
 <p><?php echo $line; ?></p>
 </div>
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
