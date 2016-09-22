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
    renderQuestionForm:function()
    {
        return(
          React.createElement("div", null, 
             React.createElement("h2", null, " Halla question")
          )
        );
    },
    renderIdeaForm:function()
    {
        return(
          React.createElement("div", null, 
          React.createElement("h2", null, " Haall idea")
          )
        );
    },
    render:function()
    {
        if(this.state.status=='suggesting-idea')
        {
            return this.renderIdeaForm();
        }
        else if(this.state.status=='suggesting-question')
        {
            return this.renderQuestionForm();
        }
        else
        {
            return (
            React.createElement("div", null, 
            React.createElement("p", {className: "well well-sm "}, "Hi! How would you like to contribute ?"), 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn", onClick: this.suggestQuestion}, "Suggest question"), 
             " ", 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn", onClick: this.suggestIdea}, "Suggest idea")
            )
            );
        }
    }
});

ReactDOM.render(React.createElement(SuggestQuestion, null),document.getElementById("suggestions"));

