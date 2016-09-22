var SuggestQuestion=React.createClass({displayName: "SuggestQuestion",
    getInitialState:function()
    {
        return {status:'not-suggesting'};
    },
    sendIdeaSuggestion:function()
    {
        this.setState({status:'not-suggesting'});
    },
    sendQuestionSuggestion:function()
    {
        this.setState({status:'not-suggesting'});
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
            React.createElement("label", {htmlFor: "firstname"}, "Firstname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your firstname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "surname"}, "Surname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your surname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "suggestion-question"}, "Questions"), 
            React.createElement("textarea", {className: "form-control", rows: "20", placeholder: "your question here"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "proposed-answer"}, "Answer"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "proposed answer"})
            ), 
            
            React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.sendQuestionSuggestion}, "Suggest")
            )
        );
    },
    renderIdeaForm:function()
    {
        return(
            React.createElement("form", {action: "", method: "POST", role: "form"}, 
            React.createElement("legend", null, "Suggestion Form"), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "firstname"}, "Firstname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your firstname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "surname"}, "Surname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your surname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "suggestion-idea"}, "Suggestion"), 
            React.createElement("textarea", {className: "form-control", rows: "20", placeholder: "your suggestion here"})
            ), 
            
            React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.sendIdeaSuggestion}, "Suggest")
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

