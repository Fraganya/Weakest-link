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
<!--top contestants section -->
<section class="col-sm-6">
<div class="well well-sm"><span class="fa fa-star"></span> Top Contenstants</div>
<div class="table-panel">
<table class="table table-hover ">
  <thead>
    <tr>
      <th><span class="fa fa-hashtag"></span></th>
      <th>Contestant</th>
      <th>Team-Tag</th>
      <th>Money</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Francis Ganya</td>
      <td>team-1</td>
      <td>27000</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Joshua Nyirenda</td>
      <td>team-2</td>
      <td>25000</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Joel Nyirenda</td>
      <td>team-3</td>
      <td>23000</td>
    </tr>
  </tbody>
</table>
</div>
</section>
<!--end of top contestants section -->
<!--top teams section -->
<section class="col-sm-4">
 <div class="well well-sm"><span class="fa fa-star"></span> Top Games</div>
<div class="table-panel">
<table class="table table-hover ">
  <thead>
    <tr>
      <th><span class="fa fa-hashtag"></span></th>
      <th>Team-Tag</th>
      <th>Money</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>team-1</td>
      <td>50000</td>
      <td>22-06-1996</td>
    </tr>
    <tr>
      <td>2</td>
      <td>team-1</td>
      <td>50000</td>
      <td>22-06-1996</td>
    </tr>
    <tr>
      <td>3</td>
      <td>team-1</td>
      <td>50000</td>
      <td>22-06-1996</td>
    </tr>
  </tbody>
</table>
</div>
</section>
<!--end ofg top teams section -->
</div> 
<?php $load->file(SCREENSPATH."Common/HelpDialogs.php",null); ?>
<?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
  $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
  echo $load->js("help");
?>
</body>
</html>
