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
            React.createElement("form", {action: "", method: "POST", role: "form"}, 
            React.createElement("legend", null, "Question Suggestion Form"), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, "Firstname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your firstname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, "Surname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your surname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, "Questions"), 
            React.createElement("textarea", {className: "form-control"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", null, "Answer"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "proposed answer"})
            ), 


            React.createElement("button", {type: "button", className: "btn wk-btn"}, "Suggest")
            )
        );
    },
    renderIdeaForm:function()
    {
        return(
          React.createElement("h2", null, "jelo idea")
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

