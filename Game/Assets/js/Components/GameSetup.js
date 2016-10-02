
/**
 * the player Entry class from which input fields are built
 */
var PlayerEntry=React.createClass({displayName: "PlayerEntry",
    render:function()
    { 
        return (
          React.createElement("div", null, 
          React.createElement("div", {className: "form-group "}, 
            React.createElement("label", {className: "section-label col-sm-12"}, "Player ", this.props.cnum), 

            React.createElement("div", {className: "col-sm-4"}, 
            React.createElement("input", {type: "text", className: "form-control wk-input", id: 'player-fname-'+this.props.cnum, ref: "pFname", placeholder: "First-name"})
            ), 
            React.createElement("div", {className: "col-sm-4"}, 
            React.createElement("input", {type: "text", className: "form-control wk-input", id: 'player-sname-'+this.props.cnum, placeholder: "Surname"})
            ), 
            React.createElement("div", {className: "col-sm-4"}, 
            React.createElement("input", {type: "text", className: "form-control wk-input", id: 'player-location-'+this.props.cnum, placeholder: "Location (e.g Blantyre)"})
            )
         )
         )
        );
    }
});

var SetupModal=React.createClass({displayName: "SetupModal",
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
    if(this.state.step=='register-game')
    {
        players=  this.state.players,
        parentObj=this;
        console.log("The game is registering - sending update");
        $.post('.?controller=Game&method=register',
             {
                 players,
                 difficulty:parentObj.state.gameDifficulty
             }
             ,
            function(data,status){
                if(data=='true')
                {
                    console.log("registerd successfuly");
                }
                else{
                    console.log(status+'=='+data);
                    console.log('something wrong happend');
                }
            })
    }
},
/**
 * handle step change of the setup modal
 */
onStepInit:function()
{
    this.setState({playerCount:this.refs.playerNum.value});
    this.setState({gameDifficulty:this.refs.difficulty.value});
    this.setState({step:'get-names'});
    var obj=this;
    setTimeout(function() {
        obj.buildFields()
    },5);
},
/**
 * build the player fields based on the number of players
 */
buildFields:function()
{
    var arr=[];
    for(var counter=1;counter<=this.state.playerCount;counter++)
    {
        arr.push(React.createElement(PlayerEntry, {cnum: counter, key: counter}));
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
        
        React.createElement("form", {className: "col-sm-6 col-xs-7"}, 
            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "number of players", className: ""}, "Players "), 
            React.createElement("select", {ref: "playerNum", className: "form-control"}, 
            playerNums.map(function(num,index){
                return(
                    React.createElement("option", {key: index, value: num}, num)
                ); 
            })
            )
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: ""}, "Difficulty "), 
             React.createElement("select", {ref: "difficulty", className: "form-control"}, 
              difficulties.map(function(difficulty,index){
                return(
                    React.createElement("option", {key: index, value: difficulty}, difficulty)
                ); 
            })
            )
            ), 

            React.createElement("div", {className: "form-group"}, 
             React.createElement("button", {type: "button", className: "btn wk-btn pull-right glyphicon glyphicon-chevron-right", onClick: this.onStepInit})
            )
        )
        
    );
},
/**
 *  setup modal is in get-names state
 *  initialise the contestant inputs
 */
getNames:function()
{
    return (
            React.createElement("form", {className: "form-horizontal col-sm-12"}, 
            React.createElement("div", {className: "well well-sm", ref: "registrationStatus"}, "Fill in the details"), 
             this.state.players, 
              React.createElement("div", {className: "form-group col-sm-12"}, 
              React.createElement("button", {className: "btn wk-btn marg-1", type: "button", onClick: this.registerGame, ref: "reg-btn"}, "Register"), 
              React.createElement("button", {className: "btn wk-btn marg-1 glyphicon glyphicon-chevron-left", type: "button", onClick: this.reset})
            )
            )
    );
},
/** 
* display registration progress
* register the game
*/
registration:function()
{
    return(
        React.createElement("div", null, 
        "Registering game on the server"
        )
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
        React.createElement("div", {className: "modal fade", "data-backdrop": "static", id: "game-setup"}, 
        React.createElement("div", {className: "modal-dialog"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", onClick: this.reset, className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                React.createElement("h4", {className: "modal-title"}, "Setup")
            ), 
            React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "row"}, 
                 aproFNX()
                )
            ), 
            React.createElement("div", {className: "modal-footer"})
        )
        )
        )
    );
}

});

/**
 * render the elements
 */
ReactDOM.render(React.createElement(SetupModal, null),document.getElementById('setup-modal'));