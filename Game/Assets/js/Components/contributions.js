var SuggestBox=React.createClass({displayName: "SuggestBox",
    getDefaultProps:function(){
        return {
                QcontributionURL:"./?controller=Contributions&method=addQuestion",
                IcontributionURL:"./?controller=Contributions&method=addIdea"
            }
    },
    getInitialState:function()
    {
        return {status:'not-suggesting',statusMsg:"Hi! How would you like to contribute ?",
                    formErr:false,err:"Sorry something went wrong.Try again",done:false};
    },
    validateInputs:function(tag){
        var qInputs=$(tag);
        var errors=0;
        qInputs.map(function(index,input){
            if(input.value.trim().length==0){
                $(this).addClass('animated shake validation-error');
                errors++;
            }
        });
        setTimeout(function() {
            $(tag).removeClass('animated shake validation-error');
        }, 1500);

        if(errors!=0) {return false;}
        else{
             return true;
        }
       
    },
    sendIdeaSuggestion:function()
    {
        if(!this.validateInputs('.i-input')) return ;

        var parObj=this;
        var promiseToAddIdea=new Promise(function(resolve){
               $.post(this.props.IcontributionURL,
               {
                   suggestion:parObj.refs.sBox.value,
                   fname:parObj.refs.fnameI.value,
                   sname:parObj.refs.snameI.value                   
               },function(data,status){
                   if(data!='true')
                   {
                       //handle error here
                       this.setState({formErr:true});
                       resolve(false)
                   }
                   else{
                      // send success message
                      this.setState({statusMsg:"Thank you for contributing",formErr:false});
                      resolve(true);
                   }
              }.bind(this))
        }.bind(this))

        promiseToAddIdea.then(function(fromResolve){
            if(fromResolve){
                this.setState({status:'not-suggesting'});
            }
        }.bind(this))
    },
    sendQuestionSuggestion:function()
    {
       
       if(!this.validateInputs('.q-input')) return ;

        var parObj=this;
        var promiseToAddQ=new Promise(function(resolve){
               $.post(this.props.QcontributionURL,
               {
                   question:parObj.refs.qBox.value,
                   answer:parObj.refs.aBox.value,
                   fname:parObj.refs.fnameQ.value,
                   sname:parObj.refs.snameQ.value                   
               },function(data,status){
                   if(data!='true')
                   {
                       //handle error here
                       console.log(data);
                       this.setState({formErr:true});
                       resolve(false)
                   }
                   else{
                      // send success message
                      this.setState({statusMsg:"Thank you for contributing",formErr:false});
                      resolve(true);
                   }
              }.bind(this))
        }.bind(this))

        promiseToAddQ.then(function(fromResolve){
            if(fromResolve){
                this.refs.qBox.value="";
                this.refs.aBox.value="";
                this.setState({done:true});
            }
        }.bind(this))
        
    },
    abort:function(){
         this.setState({formErr:false,statusMsg:"How would you like to contribute?",status:"not-suggesting"});
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
            
                (this.state.formErr) ? React.createElement("div", {className: "alert alert-danger"}, this.state.err) :" ", 
            
            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "firstname"}, "Firstname"), 
            React.createElement("input", {type: "text", ref: "fnameQ", className: "form-control q-input", id: "", placeholder: "your firstname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "surname"}, "Surname"), 
            React.createElement("input", {type: "text", ref: "snameQ", className: "form-control q-input", id: "", placeholder: "your surname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "suggestion-question"}, "Question"), 
            React.createElement("textarea", {ref: "qBox", className: "form-control q-input", rows: "5", placeholder: "your question here"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "proposed-answer"}, "Answer"), 
            React.createElement("input", {type: "text", ref: "aBox", className: "form-control q-input", id: "", placeholder: "proposed answer"})
            ), 
            
            React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.sendQuestionSuggestion}, "Suggest"), 
            React.createElement("button", {type: "button", id: "doneBtn", className: "btn wk-btn marg-1", onClick: this.abort}, (this.state.done)?"done":"cancel")
            )
        );
    },
    renderIdeaForm:function()
    {
        return(
            React.createElement("form", {action: "", method: "POST", role: "form"}, 
            React.createElement("legend", null, "Suggestion Form"), 
            
                (this.state.formErr) ? React.createElement("div", {className: "alert alert-danger"}, this.state.err) :" ", 
            
            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "firstname"}, "Firstname"), 
            React.createElement("input", {type: "text", ref: "fnameI", className: "form-control i-input", id: "", placeholder: "your firstname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "surname"}, "Surname"), 
            React.createElement("input", {type: "text", ref: "snameI", className: "form-control i-input", id: "", placeholder: "your surname"})
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "suggestion-idea"}, "Suggestion"), 
            React.createElement("textarea", {ref: "sBox", className: "form-control i-input", rows: "9", placeholder: "your suggestion here"})
            ), 
            
            React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.sendIdeaSuggestion}, "Suggest"), 
            React.createElement("button", {type: "button", className: "btn wk-btn marg-1", onClick: this.abort}, "Cancel")
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
            React.createElement("p", {className: "well well-sm "}, this.state.statusMsg), 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn", onClick: this.suggestQuestion}, "Suggest question"), 
             " ", 
            React.createElement("button", {type: "button", className: "btn btn-sm wk-btn", onClick: this.suggestIdea}, "Suggest idea")
            )
            );
        }
    }
});

ReactDOM.render(React.createElement(SuggestBox, null),document.getElementById("suggestions"));

