var SuggestQuestion=React.createClass({displayName: "SuggestQuestion",
    question:function()
    {

    },
    idea:function()
    {

    },
    render:function()
    {
        if(this.state.status=='not-suggesting')
        {
            return (
            React.createElement("div", null, 
            React.createElement("button", {type: "button", class: "btn btn-sm wk-btn"}, "Suggest question"), 
            React.createElement("button", {type: "button", class: "btn btn-sm wk-btn"}, "Suggest idea")
            )
            );
        }
    }
});

ReactDOM.render(React.createElement(SuggestQuestion, null),document.getElementById("suggestions"));

