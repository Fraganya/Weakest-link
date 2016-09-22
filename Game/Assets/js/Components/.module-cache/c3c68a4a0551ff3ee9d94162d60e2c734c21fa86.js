var SetupModal=React.createClass({displayName: "SetupModal",
getInitialState:function()
{
    return {step:'init'};
},
getInitialData:function()
{
    var playerNums=[4,5,6,7,8,9];
    return(
        React.createElement("form", {className: "form-horizontal"}, 
            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: "label control-label col-sm-4"}, "# of Players "), 
            React.createElement("div", {className: "col-sm-6"}, 
            React.createElement("select", {className: "form-control"}, 
            playerNums.map(function(num){
                return(
                    '<option value='+num+'>'+num+'</option>'
                ); 
            })
            )
            )
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: "label control-label col-sm-4"}, "Difficulty "), 
            React.createElement("div", {className: "col-sm-6"}, 
             React.createElement("select", {className: "form-control"}
            
            )
            )
            )
        )
    );
},
render:function()
{
    var aprofnx=this.getInitData;
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
        aprofnx=this.getInitData;
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
             apropos()
            )
        )
        )
        )
    );
}

});

ReactDOM.render(React.createElement(SetupModal, null),document.getElementById('setup-modal'));