var GameEvent=React.createClass({displayName: "GameEvent",
    render:function()
    {
        return (
           React.createElement("li", {className: "list-group-item"}, 
           React.createElement("span", {className: "fa fa-history"}, " "), 
            this.props.eventTitle, 
            React.createElement("span", {className: "pull-right"}, 
            this.props.eventTime
            )
            )
        );
    } 
});

var GameEvents=React.createClass({displayName: "GameEvents",
    render:function()
    {
        return (        
            React.createElement("div", {className: "modal fade", id: "game-history"}, 
            React.createElement("div", {className: "modal-dialog"}, 
            React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
            React.createElement("h4", {className: "modal-title"}, React.createElement("span", {className: "fa fa-history"}), " History")
            ), 
            React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "well well-sm"}, 
                    "This is a list of all significant game events:"
                ), 
                React.createElement("ul", {className: "list-group"}, 
                   React.createElement(GameEvent, {eventTitle: "Game started", eventTime: new Date().toDateString()})
                )
            )
            )
            )
            )

        );
    }
});

ReactDOM.render(React.createElement(GameEvents, null),document.getElementById('game-events'));