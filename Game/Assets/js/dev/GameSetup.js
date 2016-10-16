
/**
 * the player Entry class from which input fields are built
 */
var PlayerEntry=React.createClass({
    render:function()
    { 
        return (
          <div>
          <div className="form-group ">
            <label className="section-label col-sm-12">Player {this.props.cnum}</label>

            <div className="col-sm-4">
            <input type="text" className="form-control wk-input" id={'player-fname-'+this.props.cnum} ref={"pFname"}placeholder="First-name" />
            </div>
            <div className="col-sm-4">
            <input type="text" className="form-control wk-input" id={'player-sname-'+this.props.cnum} placeholder="Surname" />
            </div>
            <div className="col-sm-4">
            <input type="text" className="form-control wk-input" id={'player-location-'+this.props.cnum} placeholder="Location (e.g Blantyre)" />
            </div>
         </div>
         </div>
        );
    }
});

var SetupModal=React.createClass({
getInitialState:function()
{
    return {
             step:'init',
           };
},
/**
 * reset setup modal to the initial state
 */
reset:function()
{
    this.setState({step:'init',inactiveErrors:0,playerCount:0,players:[]});
},
/**
 * handle changes before updatading
 */
componentDidUpdate:function()
{
    // check if the state is registration
    if(this.state.step=='register-game' && this.state.status!='registered')
    {
        var players=this.state.players;
        var gameDifficulty=this.state.gameDifficulty;
        console.log("The game is registering - sending update");
        $.post('.?controller=Game&method=register',
             {
                 players,
                 difficulty:gameDifficulty,
                 typeof:'offline'
             }
             ,
            function(data,status){
                if(data!='false')
                {
                    var gameObj=JSON.parse(data);
                    this.setState({game_id:gameObj.game_id,status:'registered',});
                    console.log("registerd successfuly");
                }
                else{
                    console.log(status+'=='+data);
                    console.log('something wrong happend');
                }
            }.bind(this))
    }
},
/**
 * handle step change of the setup modal
 */
onStepInit:function()
{
    
    // set a promise to get the and set the number of players before building input fields
    var prepForBuild=new Promise(function(resolve){
        this.setState({playerCount:this.refs.playerNum.value});
        this.setState({gameDifficulty:this.refs.difficulty.value});
        this.setState({step:'get-names',status:'registering'});
        resolve();
    }.bind(this));
   
   // build the fields after prep
   prepForBuild.then(function(){
       this.buildFields();
   }.bind(this))
},
/**
 * build the player fields based on the number of players
 */
buildFields:function()
{
    var arr=[];
    for(var counter=1;counter<=this.state.playerCount;counter++)
    {
        arr.push(<PlayerEntry cnum={counter} key={counter}/>);
    }
    this.setState({players:arr});
},
/**
 * validate the user input and register the game on the server
 */
registerGame:function()
{
    var arr=$('.wk-input');
    var errors=0;
    arr.map(function(index,input){
        if(input.value.trim().length==0){
            $(this).addClass('animated shake validation-error');
            errors++;
        }
    });

    setTimeout(function() {
        $(".wk-input").removeClass('animated shake validation-error');
    }, 1500);

    if(errors!=0) return;
    var contestants=[];
    var current_player;

    for(var index=0;index<arr.length;index+=3)
    {
        current_player={fname:arr[index].value,sname:arr[index+1].value,location:arr[index+2].value};
        contestants.push(current_player);
    }
    this.setState({step:'register-game',players:contestants});
},
getInitialData:function()
{
    /**
     * playerNums - allowed sets of players
     * difficulties - available game difficulties
     */
    var playerNums=[2,4,5,6,7,8,9];
    var difficulties=['Easy','Medium','Brainy'];
    return(
        
        <form className='col-sm-6 col-xs-7'>
            <div className='form-group'>
            <label htmlFor='number of players' className=''>Players </label>
            <select ref='playerNum' className='form-control'>
            {playerNums.map(function(num,index){
                return(
                    <option key={index} value={num}>{num}</option>
                ); 
            })}
            </select>
            </div>

            <div className='form-group'>
            <label className=''>Difficulty </label>
             <select ref='difficulty' className='form-control'> 
              {difficulties.map(function(difficulty,index){
                return(
                    <option key={index} value={difficulty}>{difficulty}</option>
                ); 
            })} 
            </select>
            </div>

            <div className='form-group'>
             <button type='button' className='btn wk-btn pull-right glyphicon glyphicon-chevron-right' onClick={this.onStepInit}></button>
            </div>
        </form>
        
    );
},
/**
 *  setup modal is in get-names state
 *  initialise the contestant inputs
 */
getNames:function()
{
    return (
            <form className="form-horizontal col-sm-12">
            <div className='well well-sm' ref='registrationStatus'>Fill in the details</div>
             {this.state.players} 
              <div className="form-group col-sm-12">
              <button className="btn wk-btn marg-1" type='button' onClick={this.registerGame} ref='reg-btn'>Register</button>
              <button className="btn wk-btn marg-1 glyphicon glyphicon-chevron-left" type='button' onClick={this.reset} />
            </div>
            </form>
    );
},
/** 
* display registration progress
* register the game
*/
registration:function()
{
    var aproUpdate=null;
    if(this.state.status=='registering')
    {
        aproUpdate=function(){
            return(
                 <div>
                   <div className="loader" />
                   <div className="com-status">Registering Game</div>
                 </div>                              
                )
        }
    }
    else{
        aproUpdate=function(){ 
            return (<a className="btn btn-link wk-btn-link" href={'.?controller=Game&method=play&id='+this.state.game_id}>Play</a>)
        }.bind(this);
        
    }
    return(
        <div className='text-center'>
             <div>{aproUpdate()}</div>
        </div>
    );
},
render:function()
{
    /**
     * choose the appropriate function to call in the render
     */
    var aproFNX=null;
    if(this.state.step=='setup-session')
    {
        aproFNX=this.establishSession;
    }
    else if(this.state.step=='get-names')
    {
        aproFNX=this.getNames;
    }
    else if (this.state.step=='register-game')
    {
        aproFNX=this.registration;
    }
    else
    {
        aproFNX=this.getInitialData;
    }
    return(     
        <div className="modal fade" data-backdrop='static' id="game-setup">
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" onClick={this.reset} className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Setup</h4>
            </div>
            <div className="modal-body">
                <div className='row'>
                 {aproFNX()}
                </div>
            </div>
            <div className='modal-footer'/>
        </div>
        </div>
        </div>
    );
}

});

/**
 * render the elements
 */
ReactDOM.render(<SetupModal />,document.getElementById('setup-modal'));