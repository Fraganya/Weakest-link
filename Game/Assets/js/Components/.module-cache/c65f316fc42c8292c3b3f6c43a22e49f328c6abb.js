var GameEvent=React.createClass({displayName: "GameEvent",
    render:function()
    {
        return (
           React.createElement("li", {className: "list-group-item"}, 
           React.createElement("span", {class: "fa fa-history"}), 
            this.props.eventTitle, 
            React.createElement("span", {class: "pull-right"}, 
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
            React.createElement("div", {class: "modal fade", id: "game-history"}, 
            React.createElement("div", {class: "modal-dialog"}, 
            React.createElement("div", {class: "modal-content"}, 
            React.createElement("div", {class: "modal-header"}, 
            React.createElement("button", {type: "button", class: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
            React.createElement("h4", {class: "modal-title"}, React.createElement("span", {class: "fa fa-history"}), " History")
            ), 
            React.createElement("div", {class: "modal-body"}, 
                React.createElement("div", {class: "well well-sm"}, 
                    "This is a list of all significant game events:"
                ), 
                React.createElement("ul", {class: "list-group"}, 
                   React.createElement(GameEvent, {eventTitle: "Game started", eventTime: new Date()})
                )
            )
            )
            )
            )

        );
    }
});