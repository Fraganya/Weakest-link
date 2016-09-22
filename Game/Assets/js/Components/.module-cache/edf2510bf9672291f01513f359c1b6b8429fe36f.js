
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

var AboutGame=React.createClass({displayName: "AboutGame",
    render:function()
    {
        return(
            React.createElement("div", null, 
                React.createElement(SimplePanel, {info: "information about the game", title: "The Weakest-Link"})
            )
        )
    }
});

ReactDOM.render(React.createElement(SetupGuides, null),document.getElementById("setup-guides"));
ReactDOM.render(React.createElement(AboutGame, null),document.getElementById("about-the-wk"));

