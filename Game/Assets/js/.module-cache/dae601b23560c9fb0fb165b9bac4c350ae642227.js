 var BugForm=React.createClass({displayName: "BugForm",
    getInitialState:function()
    {
        return {reporting:false};
    },
    renderBuForm:function()
    {
        return(
            React.createElement("form", {action: "", method: "POST", role: "form"}, 
            React.createElement("legend", null, "Bug Form"), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "firstname"}, "Firstname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your firstname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "surname"}, "Surname"), 
            React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "your surname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "suggestion-question"}, "Bug"), 
            React.createElement("textarea", {className: "form-control", rows: "5", placeholder: "What happened"})
            ), 
            
            React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.sendBugReport}, "Suggest")
            )
        );
    },
  
    render:function()
    {
       if(this.state.reporting)
       {
           return this.renderBuForm();
       }
       else
       {
           return (
               React.createElement("div", null, 
               React.createElement("div", {class: "alert alert-success"}, 
                "Thank you for reporting"
               ), 
               React.createElement("button", {class: "btn btn-sm wk-btn"}, "Report another ?")
               )
           );
       }
    }
});

ReactDOM.render(React.createElement(BugForm, null),document.getElementById("bug-form"));

