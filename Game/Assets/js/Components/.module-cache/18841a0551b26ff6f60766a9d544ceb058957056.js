var SetupModal=React.createClass({displayName: "SetupModal",
getInitialState:function()
{
    return {step:'init'};
},
getInitialData:function()
{
    var playerNums=[4,5,6,7,8,9];
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
             React.createElement("select", {className: "form-control"}, 
              difficulties.map(function(difficulty,index){
                return(
                    React.createElement("option", {key: index, value: difficulty}, difficulty)
                ); 
            })
            )
            ), 

            React.createElement("div", {className: "form-group"}, 
             React.createElement("button", {type: "button", className: "btn wk-btn pull-right", onClick: this.getNames}, "Next")
            )
        )
        
    );
},
getNames:function()
{
    var allPlayers=this.refs.playerNum.findDOMNode().value;
    console.log(allPlayers);
},
render:function()
{
    var aprofnx=null;
    if(this.state.step=='setup-session')
    {
        aprofnx=this.establishSession;
    }
    else if(this.state.step=='get-names')
    {
        aprofnx=this.getNames;
    }
    else
    {
        aprofnx=this.getInitialData;
    }
    return(     
        React.createElement("div", {className: "modal fade", id: "game-setup"}, 
        React.createElement("div", {className: "modal-dialog"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                React.createElement("h4", {className: "modal-title"}, "Setup")
            ), 
            React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "row"}, 
                 aprofnx()
                )
            )
        )
        )
        )
    );
}

});

ReactDOM.render(React.createElement(SetupModal, null),document.getElementById('setup-modal'));