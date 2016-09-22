 
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
  <div class="list-group">
  <a href="#" class="list-group-item">
    <h4 class="list-group-item-heading">mod # 1</h4>
    <p class="list-group-item-text">details</p>
    </a>
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
            <div class="panel panel-default">
              <div class="panel-body">
               <p>This software has been hand crafted by <a href="Fraganya.me.ht">Francis Ganya</a></p>
              </div>
            </div>
            <p class="well well-sm">It has been developed with the help of these open source libraries</p>
             <div class="list-group">
            <a href="#" class="list-group-item">ReactJs</a>
            <a href="#" class="list-group-item">Bootstrap</a>
            <a href="#" class="list-group-item">Jquery</a>
             <a href="#" class="list-group-item">Font awesome</a>
          </div>
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
         <div class="game-name">Weakest-link</div>
         <div class="version fa fa-tag"> 1.0</div>
         <p class="well">A quiz game based on the real world Weakest Link Television game show.</p>
         <a  href=".?method=bug" class="btn btn-link btn-sm  wk-btn-link">Report bug <span class="fa fa-bug"></span></a> 
    </div>
    </div>
 </div> 
 </div> <!-- end of about Dialog -->
  <!-- add new game Dialog -->
  <div class="modal" id="add-game-diaog"></div>