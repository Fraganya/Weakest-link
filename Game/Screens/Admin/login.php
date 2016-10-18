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
  echo  $load->icon('favicon');

  ?>
  <title><?php echo ucfirst($title); ?></title>

<!--[if lt IE 9]>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
<![endif]-->

</head>

<body>
	
	<div class="row">
		<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
			<div class="login-panel panel panel-default" style="margin-top:5%">
				<div class="panel-heading">Log in</div>
				<div class="panel-body">
					<form role="form">
						<fieldset>
							<div class="form-group">
								<input class="form-control" placeholder="E-mail" name="email" type="email" autofocus="">
							</div>
							<div class="form-group">
								<input class="form-control" placeholder="Password" name="password" type="password" value="">
							</div>
							<div class="checkbox">
								<label>
									<input name="remember" type="checkbox" value="Remember Me">Remember Me
								</label>
							</div>
							<a href=".?controller=Admin&method=home" class="btn btn-primary">Login</a>
						</fieldset>
					</form>
				</div>
			</div>
		</div><!-- /.col-->
	</div><!-- /.row -->	
	
		
    <?php
	/*-----------------------------------------------------------------------------
	|                       load javascript files
	------------------------------------------------------------------------------*/
	$load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
    $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
	?>
</body>

</html>
