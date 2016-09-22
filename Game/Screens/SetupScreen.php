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
<div class="row">
<!--main game panel section -->
<section class="col-xs-12 col-sm-8 col-md-8 col-lg-8" id="game-setup-section">
<div class="thumbnail game-panel">
    <div class="game-panel-header">
      <span class="title">Games</span> 
      <span class="pull-right"><button data-toggle="modal" data-target="#game-setup" class="fa fa-plus wk-btn"><span></span></button></span>
    </div>
  <div class="game-panel-body">
    <div class="panel panel-default">
      <div class="panel-heading">
      <h3 class="panel-title">Sessions</h3>
      </div>
      <div class="panel-body">
      Join a session
      </div>
      <div class="list-group">
      <a href="#" class="list-group-item ">Item 1</a>
      <a href="#" class="list-group-item">Item 2</a>
      <a href="#" class="list-group-item">Item 3</a>
      </div>
    </div>
  </div>
</div>
</section>
<!--end of main game panel section -->

<!--Trending panel section -->
<section class="col-xs-12 col-sm-4 col-md-4 col-lg-4" id="trending-section">
  <div class="panel panel-default">
  <div class="panel-heading">
    Trending
  </div>
  <div class="list-group">
    <a href="#" class="list-group-item ">Item 1</a>
    <a href="#" class="list-group-item">Item 2</a>
    <a href="#" class="list-group-item">Item 3</a>
  </div>
  <div class="panel-footer">
    <a href="#" class="panel-footer-link">See All</a>
  </div>
  </div>
</section>
<!--end of Trending panel section -->

</div>
</div>
<div id="setup-modal"></div>
 <?php $load->file(SCREENSPATH."Common/HelpDialogs.php",null); ?>
<?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
  $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
  echo $load->js("setupUI");
  echo $load->js("help");
  echo  $load->js("Components/GameSetup");
?>
</body>
</html>
