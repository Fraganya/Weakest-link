var SetupModal=React.createClass({displayName: "SetupModal",
render:function()
{
    return(     
        React.createElement("div", {className: "modal fade", id: "modal-id"}, 
        React.createElement("div", {className: "modal-dialog"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                React.createElement("h4", {className: "modal-title"}, "Setup")
            ), 
            React.createElement("div", {className: "modal-body"}
                
            )
        )
        )
        )
    );
}

});

ReactDOM.render(React.createElement(SetupModal, null),document.getElementById('setup-modal'));