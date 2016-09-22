var Modal=React.createClass(
{displayName: "Modal",
  getDefaultProps:function(){
       return{
           size:"modal-sm",
           title:"WK-modal"
       }
   },
  render:function()
    {
    
    return(
    React.createElement("div", {className: "modal-dialog "+this.props.size}, 
        React.createElement("div", {className: "modal-content"}, 
        React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
            React.createElement("h4", {className: "modal-title"}, this.props.title)
        ), 
        React.createElement("div", {className: "modal-body"}, 
            this.props.content
        )
        )
    )
         );
    }
});

var SimplePanel=React.createClass({displayName: "SimplePanel",
    render:function()
    {
        return(
            React.createElement("div", {className: "panel panel-default"}, 
                React.createElement("div", {className: "panel-heading"}, 
                React.createElement("h3", {className: "panel-title"}, this.props.title)
                ), 
                React.createElement("div", {className: "panel-body"}, 
                    this.props.info
                )
            )
        );
    }
});

var SetupGuides=React.createClass({displayName: "SetupGuides",
    render:function()
    {
        return(
            React.createElement("div", null, 
                React.createElement(SimplePanel, {info: "setup game", title: "Setting up a game"}), 
                React.createElement(SimplePanel, {info: "setup a game session", title: "Setting up a session"}), 
                React.createElement(SimplePanel, {info: "joining a session", title: "Joining a session"})
            )
        )
    }
});

ReactDOM.render(React.createElement(SetupGuides, null),document.getElementById("setup-guides"))
