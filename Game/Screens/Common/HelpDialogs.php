 
 <!--game setup dialogs -->
 <!-- play flow Dialog -->
<div class="modal fade" id="play-flow">
  <div class="modal-dialog modal-lg">
  <div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title">What's this <span class="fa fa-question"></span></h4>
  </div>
  <div class="modal-body ">
  <div class="row"><!--row start -->
  <div class="col-sm-8 " id="about-the-wk"> <!--game info panel -->

  </div> 
  <div class="col-sm-4"> <!--mods col -->
  <!--panel of modifications -->
  <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Modifications</h3>
  </div>
  <!--list of real game modifications -->
  <div class="list-group" id="modification-list">
  
  </div>  <!-- end of list of real game modifications -->

  </div><!--end of  modifications panel-->
  </div><!--end of mods col-->
  </div><!--row end -->
  </div> <!--modal body end-->
  </div><!--modal content end -->
  </div>  
</div> <!-- end of play-flow Dialog -->
 <!-- game guides Dialog -->
 <div class="modal fade" id="guides"> 
   <div class="modal-dialog modal-sm">
   <div class="modal-content">
    <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">Guides</h4>
    </div>
    <div class="modal-body">
        <p class="well well-sm">
        Hello there! Below is a guide of how you can play the game.
        The content has been divided into sections so feel free to skip other parts if you feel you know them
        </p>
        <div class="setup-guides" id="setup-guides"></div>
        <a  class="btn btn-sm wk-btn-link">More guides</a>
      </div>
    </div>
  </div> 
 </div>
 </div>  <!-- end of game guides Dialog -->
 <!-- credit list Dialog -->
 <div class="modal fade" id="credit"> 
  <div class="modal-dialog modal-sm">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Credits</h4>
        </div>
        <div class="modal-body">
            <div id="developer-credit"></div>
            <p class="well well-sm">It has been developed with the help of these open source libraries</p>
            <div class="list-group" id="acknowledgement-list"></div>
        </div>
        </div>
    </div>
  
   
  
   
 </div> <!-- end of credits Dialog -->
 <!-- about Dialog -->
 <div class="modal fade" id="about">
  <div class="modal-dialog modal-sm">
   <div class="modal-content">
   <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><span class="fa fa-info-circle"></span> About</h4>
   </div>
   <div class="modal-body wk-about">
          <div id='about-game-information'></div>
         <a  href=".?method=bug" class="btn btn-link btn-sm  wk-btn-link">Report bug <span class="fa fa-bug"></span></a> 
    </div>
    </div>
 </div> 
 </div> <!-- end of about Dialog -->
  <!-- add new game Dialog -->
  <div class="modal" id="add-game-diaog"></div>