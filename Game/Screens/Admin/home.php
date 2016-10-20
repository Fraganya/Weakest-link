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
//$load->file(SCREENSPATH.'Common/Styles.php',array('load'=>$load));
echo  $load->css("bootstrap.min");
$load->file(SCREENSPATH.'Common/AdminStyles.php',array('load'=>$load));
echo  $load->css("font-awesome.min");
echo  $load->css("animate");
echo  $load->icon('favicon');
?>
<style>
.validation-error{
	border-color:red;
}
</style>
<title><?php echo ucfirst($title); ?></title>

<!--Icons-->
<?php echo $load->js("lumino.glyphs");?>

<!--[if lt IE 9]>
<script src="js/html5shiv.js"></script>
<script src="js/respond.min.js"></script>
<![endif]-->

</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
<div class="container-fluid">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="#"><span>WKL Admin</span></a>

	</div>
					
</div><!-- /.container-fluid -->
</nav>
<!-- side Bar-->
<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
	<form role="search">
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Search" disabled>
		</div>
	</form>
	<ul class="nav menu">
		<li class="active"><a href="#ds-section" data-toggle="tab"><svg class="glyph stroked dashboard-dial"><use xlink:href="#stroked-dashboard-dial"></use></svg> Dashboard</a></li>
		<li><a href="#qn-section" data-toggle="tab"><svg class="glyph stroked pen tip"><use xlink:href="#stroked-pen-tip"></use></svg>Questions</a></li>
		<li><a href="#stat-section" data-toggle="tab"><svg class="glyph stroked line-graph"><use xlink:href="#stroked-line-graph"></use></svg>Statistics</a></li>
		<li><a href="#score-section" data-toggle="tab"><svg class="glyph stroked flag"><use xlink:href="#stroked-flag"></use></svg>Scores</a></li>
		<li><a href="#Q-contrib-section" data-toggle="tab" title="Contributed Questions"><svg class="glyph stroked chevron-righ"><use xlink:href="#stroked-chevron-right"></use></svg>Contributions-Q</a></li>
		<li><a href="#S-contrib-section" data-toggle="tab" title="Contributed suggestions"><svg class="glyph stroked chevron-righ"><use xlink:href="#stroked-chevron-right"></use></svg>Contributions-S</a></li>

		<li role="presentation" class="divider"></li>
		<li><a href="#about-section" data-toggle="tab"><svg class="glyph stroked folder"><use xlink:href="#stroked-folder"></use></svg>About</a></li>
	</ul>

	</div><!--/.sidebar-->
	
	<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
		<div class='tab-content'>
			<div class='tab-pane fade  in active' id="ds-section"></div>
			<div class='tab-pane fade  ' id="qn-section"></div>
			<div class='tab-pane fade  ' id="stat-section"></div>
			<div class='tab-pane fade  ' id="score-section"></div>
			<div class='tab-pane fade  ' id="Q-contrib-section"></div>
			<div class='tab-pane fade ' id="S-contrib-section"></div>
			<div class='tab-pane fade ' id="about-section"></div>
		</div>
	</div>	<!--/.main-->



  <?php
  /*-----------------------------------------------------------------------------
  |                       load javascript files
  ------------------------------------------------------------------------------*/
  $load->file(SCREENSPATH.'Common/Scripts.php',array('load'=>$load));
  $load->file(SCREENSPATH.'Common/ReactDependency.php',array('load'=>$load));
  echo $load->js("chart.min");
  echo $load->js("chart-data");
  echo $load->js("easypiechart");
  echo $load->js("bootstrap-datepicker");
  echo $load->js("bootstrap-table");
  echo $load->js("respond.min");
  echo $load->js("Components/AdminWidgets");
  ?>

<script>
	/*$('#calendar').datepicker({
	});*/

	!function ($) {
		$(document).on("click","ul.nav li.parent > a > span.icon", function(){          
			$(this).find('em:first').toggleClass("glyphicon-minus");      
		}); 
		$(".sidebar span.icon").find('em:first').addClass("glyphicon-plus");
	}(window.jQuery);

	$(window).on('resize', function () {
		if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
	})
	$(window).on('resize', function () {
		if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
	})
</script>	
</body>

</html>
