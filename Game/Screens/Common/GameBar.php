<!-- Game page header -->
<div class="container " role="navigation">
<nav class="navbar navbar-inverse" role="navigation">
<!-- Game name and toggles for mobile display -->
<div class="navbar-header">
  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".game-bar">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand " href=".">Weakest Link</a>
</div>
<!-- Game screens -->
<div class="collapse navbar-collapse game-bar">
  <ul class="nav navbar-nav">
    <li class=""><a href=".?controller=Game&method=scores"><span class="fa fa-asterisk"></span> Scores</a></li>
    <li><a href=".?controller=Contributions"><span class="fa fa-cube"></span> Contributions</a></li>
  </ul>
  <ul class="nav navbar-nav navbar-right">
  <li class="dropdown"> 
    <a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
        Help
        <b class="caret"></b> 
    </a> 
    <ul class="dropdown-menu"> 
        <li><a href="#play-flow" data-toggle="modal" data-backdrop="static">What's this?</a></li> 
        <li class="divider"></li> 
        <li><a href="#guides" data-toggle="modal" data-backdrop="static">Guides</a></li> 
        <li class="divider"></li> 
        <li><a href="#credit" data-toggle="modal" data-backdrop="static">Credits</a></li> 
        <li class="divider"></li> 
        <li><a href="#about" data-toggle="modal" data-backdrop="static">About Game</a></li> 
    </ul> 
    </li>
  </ul>
  </div>
</nav>
</div>
<!-- end of Game page header -->