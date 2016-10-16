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
echo  $load->css("custom");
 echo  $load->icon('favicon');
?>
<title><?php echo $title; ?></title>
</head>
<body>
<!--Game session bar section -->
<div class="container">
    <div class="session-bar col-sm-3 col-xs-12 col-sm-offset-5 ">
    <span class="">Session</span>
    <span class="session-id"><?php echo $session; ?></span>
    </div>
</div><!-- end of Game session bar section -->
<div class="container">
  <div class=""><!-- Main row-->
   <section class="col-sm-4 contestant-panel">
    <!-- contenstants panel -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Contestants</h3>
        </div>
        <!-- contenstants list -->
        <ul class="list-group contestant-list">
            <?php foreach($gameInfo['contestants'] as $contestant) : ?>
            <li class="list-group-item">
            <span class="fa fa-user c-avatar"> </span>
            <span class="contenstant-name"><?php echo $contestant['fname'].' '.$contestant['sname']?></span>
            <span>
            <button type="button" class="wk-btn btn fa fa-info pull-right"
               title='<?php echo "Info => {$contestant['fname']}"?>'
               data-toggle="popover"
               data-placement="left" 
               data-content='<?php echo "{$contestant['fname']} {$contestant['sname']} from {$contestant['location']}"; ?>'>
            </button>
            </span>
            </li>
           <?php endforeach; ?>
        </ul><!-- end of contenstants list -->   
    </div><!-- end of contenstants panel -->
    <p class="well well-sm lead slogan">For the love of the brainy</p>
   </section>
   <!--game messages section -->
   <section class="col-sm-5 game-messages">
   <div class="well well-sm well-game-header"><span class="fa fa-envelope"> </span> Game Messages</div>
     <div class="jumbotron">
      <p class="well well-sm">Welcome contenstants </p>
     </div>
     <div class="host-interaction-btns">    
        <button type="button" id="int-btn-1" class="btn btn-large  wk-btn">start game</button>   
        <button type="button" id="int-btn-2" class="btn btn-large  wk-btn">Interaction 2</button>   
     </div>
   </section><!--end of game messages section -->
   <!--game info section -->
    <section class="col-sm-3 game-messages">
    <!-- Game info panel  -->
    <div class="panel panel-default">
        <div class="panel-heading"><h4 class="panel-title "><span class="fa fa-gamepad"></span> Game</h4></div>
            <div class="panel-body">
              <dl >
              <dt >Difficulty</dt>
              <dd class="well well-sm well-header"><?php echo $gameInfo['difficulty']; ?></dd>
              <dt >Rounds played</dt>
              <dd class="well well-sm well-header">0</dd>
             </dl>
            </div>
    </div>    <!-- end of Game info panel  -->
     <div class="game-control-btns"><!-- game screen btns-->
     <button type="button" data-toggle="modal" data-target="#game-stats" class="btn btn-large btn-block wk-btn">Game Stats</button>
     <button type="button" data-toggle="modal" data-target="#game-history" class="btn btn-large btn-block wk-btn">History</button>
     <button type="button" data-toggle="modal" data-target="#game-advanced" class="btn btn-large btn-block wk-btn">Advanced</button>
     <button type="button" data-toggle="modal" data-target="#game-play" class="btn btn-large btn-block wk-btn">Trigger game-play</button>
     <button type="button" data-toggle="modal" data-target="#game-quit" class="btn btn-large btn-block wk-btn" >Quit</button>
     </div><!-- end of game screen btns-->
   </section><!--end of game info section -->
  </div> <!-- end of main row-->
</div>
<div class="modal fade" id="game-quit">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title"><span class="fa fa-warning"></span> Confirm Exit</h4>
            </div>
            <div class="modal-body">
                 <p class="well well-sm">Are you sure you want to exit the game? All data and progress will be lost! </p>
                <button type="button" class="btn btn-danger">Yes</button>
                <button type="button" class="btn  btn-success">Cancel</button>
                
            </div>
        </div>
    </div>
</div>
<div id="game-events"></div>
<div id="game-controller"></div>
<?php  
//$load->file(SCREENSPATH.'Screen-ins/GamePlay.php',array('load'=>$load)); 
//$load->file(SCREENSPATH.'Screen-ins/Statistics.php',array('load'=>$load)); 
$load->file(SCREENSPATH.'Screen-ins/Advanced.php',array('load'=>$load)); 
?>
<?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
  $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
  echo $load->js("play");
  echo $load->js("core");
  echo $load->js("Components/PlayComponents");
  echo $load->js("Components/History");
  
?>
</body>
</html>
