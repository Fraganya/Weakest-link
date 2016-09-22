<div class="modal fade" id="game-play">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title"><span class="fa fa-gamepad"></span> Game Play</h3>
            </div>
            <div class="modal-body">
             <div class="row"> <!-- modal body row-->
             <!-- money chain section -->
             <div class="col-sm-2 "> 
             <ul class="list-unstyled money-chain">
              <li>64000</li>
              <li>32000</li>
              <li>16000</li>
              <li>8000</li>
              <li>5000</li>
              <li>2500</li>
              <li>1000</li>
              <li>500</li>
              <li>250</li>
             </ul>
             <div class="well well-sm bank">2000</div>
             </div><!-- end of money chain section -->
             <!-- Main game play container  section -->
             <div class="col-sm-8">
             <ul class="contestant-bar list-inline list-unstyled">
              <li>Francis</li>
              <li>Joshua</li>
              <li>Joel </li>
              <li>Clara</li>
              <li>Maggie</li>
              <li>Menard</li>
              <li class="active">Joshua</li>
              <li>Joel </li>
              </ul>
             <div class="panel panel-default">
                   <div class="panel-heading">
                         <h3 class="panel-title">Question <span class="pull-right q-timer">0:20:0</span></h3>
                   </div>
                   <div class="panel-body">
                         Sample question here
                   </div>
             </div>
             
             
              <form action="" method="POST" role="form">              
                  <div class="form-group">
                      <input type="text" class="form-control" id="" placeholder="Place your answer here">
                  </div>
              </form>
              <div class="response-btns text-center"><!-- response btns for interaction -->
               <button type="button" class="btn wk-btn">Answer</button>
               <button type="button" class="btn wk-btn">Pass</button>
               <button type="button" class="btn wk-btn">Bank</button>
               </div>         
              
              <div class="panel panel-default marg-top"><!--Interactive messages box -->
                  <div class="panel-body">
                     <span class="fa fa-envelope correct"></span> 
                     <span id="game-play-msg"> That's wrong</span>
                  </div>
              </div>
              
             </div><!-- end of main game play container section -->
             <!-- timer section -->
             <div class="col-sm-2">
             <div class="timer">0:90:30</div>
             </div>
             </div><!--end of timer section -->
            </div><!-- end of modal body row -->
            <div class="modal-footer">
                <button type="button" class="btn wk-btn fa fa-pause pull-left"></button>
                <button type="button" class="btn wk-btn fa fa-play pull-left"></button>
                <button type="button" class="btn wk-btn fa fa-circle wk-status-offline pull-left"></button>
                <button type="button" class="btn wk-btn fa fa-expand pull-left"></button>
                <button type="button" class="btn wk-btn fa fa-close" data-dismiss="modal"></button>
            </div>
        </div>
    </div>
</div>
