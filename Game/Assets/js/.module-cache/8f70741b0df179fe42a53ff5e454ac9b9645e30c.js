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
    questionRender:function()
    {
        return(
          React.createElement("div", null, 
          "Haall question"
          )
        );
    },
    ideaRender:function()
    {
        return(
          React.createElement("div", null, 
          "Haall idea"
          )
        );
    },
    render:function()
    {
        if(this.state.status=='suggesting-idea')
        {
            return ideaRender;
        }
        else if(this.state.status=='suggesting-question')
        {
            return questionRender;
        }
        else
        {
            return (
            React.createElement("div", null, 
            React.createElement("p", {className: "well well-sm "}, "Hello, How would you like to contribute ?"), 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn", onClick: this.suggestQuestion}, "Suggest question"), 
             " ", 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn", onClick: this.suggestIdea}, "Suggest idea")
            )
            );
        }
    }
});

ReactDOM.render(React.createElement(SuggestQuestion, null),document.getElementById("suggestions"));

