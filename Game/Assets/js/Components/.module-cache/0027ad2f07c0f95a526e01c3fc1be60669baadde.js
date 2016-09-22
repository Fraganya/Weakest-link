var playerEntry=React.createClass({displayName: "playerEntry",
    render:function()
    {
        console.log(i);
        return (
          React.createElement("div", {className: "form-group "}, 
            React.createElement("label", {className: "section-label col-sm-12"}, "Player "), "';", 
            React.createElement("div", {className: "col-sm-4"}, "';", 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "First-name"}), "';"
            ), 
            React.createElement("div", {className: "col-sm-4"}, "';", 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "Surname"}), "';"
            ), 
            React.createElement("div", {className: "col-sm-4"}, "';", 
            React.createElement("input", {type: "text", className: "form-control", placeholder: "Location (e.g Blantyre)"}), "';"
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
    arr=[];
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
getNames:function()
{
    return (
            React.createElement("form", {className: "form-horizontal col-sm-12"}, 
            React.createElement("div", {className: "well well-sm", ref: "registrationStatus"}, "Fill in the details"), 
             this.buildFields().map(function(i){
                 return (
                     React.createElement("playerEntry", {key: i})
                 );
             }), 
            React.createElement("div", {className: "form-group col-sm-12"}, 
              React.createElement("button", {className: "btn wk-btn marg-1", type: "button", onClick: this.registerGame, ref: "reg-btn"}, "Register"), 
              React.createElement("button", {className: "btn wk-btn marg-1 glyphicon glyphicon-chevron-left", type: "button", onClick: this.reset})
            )
            )
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

ReactDOM.render(React.createElement(SetupModal, null),document.getElementById('setup-modal'));