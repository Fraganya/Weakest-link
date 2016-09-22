var GameEvent=React.createClass({displayName: "GameEvent",
    render:function()
    {
        return (
           React.createElement("li", {className: "list-group-item"}, 
           React.createElement("span", {className: "fa fa-history"}), 
            " ", 
            this.props.eventTitle, 
            React.createElement("span", {className: "pull-right"}, 
            this.props.eventTime.getHours(), ":", this.props.eventTime.getMinutes()
            )
            )
        );
    } 
});

var GameEvents=React.createClass({displayName: "GameEvents",
    getInitialState:function()
    {
        return {wkEvents:[]};
    },
    addEvent:function(title)
    {
        var eventsArr=this.state.wkEvents;
        var newEvent={'title':title,'time':new Date()};
        eventsArr.push(newEvent);
        this.setState({})
    },
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
                  this.state.wkEvents.map(function(event){
                      return (
                        React.createElement(GameEvent, {eventTitle: event.title, eventTime: event.time})
                        )
                  })
                )
            )
            )
            )
            )

        );
    }
});

ReactDOM.render(React.createElement(GameEvents, null),document.getElementById('game-events'));