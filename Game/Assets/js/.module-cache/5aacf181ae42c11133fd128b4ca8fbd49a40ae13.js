var SuggestQuestion=React.createClass({displayName: "SuggestQuestion",
    getInitialState:function()
    {
        return {status:'not-suggesting'};
    },
    suggestQuestion:function()
    {
        this.setState({status:'suggesting-question'});
    },
    suggestIdea:function()
    {
        this.setState({status:'suggesting-idea'});
    },
    question:function()
    {

    },
    idea:function()
    {

    },
    render:function()
    {
        if(this.state.status=='suggesting-idea')
        {
            return suggestIdea();
        }
        else if(this.state.status=='suggesting-question')
        {
            return SuggestQuestion();
        }
        else
        {
            return (
            React.createElement("div", null, 
            React.createElement("p", {className: "well well-sm "}, "Hello, How would you like to contribute ?"), 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn"}, "Suggest question"), 
             " ", 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn"}, "Suggest idea")
            )
            );
        }
    }
});

ReactDOM.render(React.createElement(SuggestQuestion, null),document.getElementById("suggestions"));

