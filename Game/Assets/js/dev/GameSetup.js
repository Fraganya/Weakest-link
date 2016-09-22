var PlayerEntry=React.createClass({
    validate:function()
    {

    },
    render:function()
    { 
        return (
          <div className="form-group ">
            <label className="section-label col-sm-12">Player {this.props.cnum}</label>
            <div className="col-sm-4">
            <input type="text" className="form-control" ref={"pFname"}placeholder="First-name" />
            </div>
            <div className="col-sm-4">
            <input type="text" className="form-control" placeholder="Surname" />
            </div>
            <div className="col-sm-4">
            <input type="text" className="form-control" placeholder="Location (e.g Blantyre)" />
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
reset:function()
{
    this.setState({step:'init',inactiveErrors:0,playerCount:0});
},
onStepInit:function()
{
    this.setState({playerCount:this.refs.playerNum.value});
    this.setState({gameDifficulty:this.refs.difficulty.value});
    this.setState({step:'get-names'});
    this.setState({inactiveErrors:(this.refs.playerNum.value)*3});
},
buildFields:function()
{
    var arr=[];
    for(var counter=1;counter<=this.state.playerCount;counter++)
    {
        arr.push(counter);
    }
    return arr;
},
registerGame:function()
{
    if(this.state.inactiveErrors!=0)
    {
        console.log($('#player-1').children());
        return false;
    }
    this.setState({step:'registration'});
},
getInitialData:function()
{
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
getNames:function()
{
    return (
            <form className="form-horizontal col-sm-12">
            <div className='well well-sm' ref='registrationStatus'>Fill in the details</div>
             {this.buildFields().map(function(index){
                 return (<PlayerEntry cnum={index} key={index}/>);         
             })} 
            <div className="form-group col-sm-12">
              <button className="btn wk-btn marg-1" type='button' onClick={this.registerGame} ref='reg-btn'>Register</button>
              <button className="btn wk-btn marg-1 glyphicon glyphicon-chevron-left" type='button' onClick={this.reset} />
            </div>
            </form>
    );
},
render:function()
{
    var aproFNX=null;
    if(this.state.step=='setup-session')
    {
        aproFNX=this.establishSession;
    }
    else if(this.state.step=='get-names')
    {
        aproFNX=this.getNames;
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

ReactDOM.render(<SetupModal />,document.getElementById('setup-modal'));