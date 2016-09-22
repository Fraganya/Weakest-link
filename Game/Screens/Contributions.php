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
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php
/*-----------------------------------------------------------------------------
|                       load stylesheets
------------------------------------------------------------------------------*/
$load->file(SCREENSPATH.'Common/Styles.php',array('load'=>$load));
echo  $load->css("font-awesome");
echo  $load->css("custom");
echo  $load->icon('favicon');
?>
<title><?php echo $title; ?></title>
</head>
<body>
<?php $load->file(SCREENSPATH."Common/GameBar.php",null); ?>

<div class="container">
<!--suggestion area -->
<section class="col-sm-4" id="suggestions"></section>
<!-- end of suggestion area -->
<!--top contributors area -->
<section class="col-sm-4">
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Top contributors</h3>
    </div>
    <div class="panel-body">
        Here is a list of the top 10 contributors
    </div>
    
    <ul class="list-group">
        <li class="list-group-item">
            <span class="badge">35</span>
            Francis Ganya
        </li>
        <li class="list-group-item">
            <span class="badge">10</span>
            Clara Ganya
        </li>
        <li class="list-group-item">
            <span class="badge">5</span>
            Joshua Nyirenda
        </li>
        <li class="list-group-item">
            <span class="badge">5</span>
            Joel Nyirenda
        </li>
    </ul>     
</div>
</section>
<!--end of top contributors area -->
</div> 
<?php $load->file(SCREENSPATH."Common/HelpDialogs.php",null); ?>
<?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
  $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
  echo $load->js("help");
  echo $load->js("contributions");
?>
</body>
</html>
