var SuggestBox=React.createClass({
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
            <form action="" method="POST" role="form">
            <legend>Question Suggestion Form</legend>

            <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" className="form-control" id="" placeholder="your firstname"/>
            </div>

            <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control" id="" placeholder="your surname"/>
            </div>

            <div className="form-group">
            <label htmlFor="suggestion-question">Question</label>
            <textarea className="form-control" rows="5" placeholder="your question here"/>
            </div>

            <div className="form-group">
            <label htmlFor="proposed-answer">Answer</label>
            <input type="text"  className="form-control" id="" placeholder="proposed answer"/>
            </div>
            
            <button type="button" className="btn wk-btn" onClick={this.sendQuestionSuggestion}>Suggest</button>
            </form>
        );
    },
    renderIdeaForm:function()
    {
        return(
            <form action="" method="POST" role="form">
            <legend>Suggestion Form</legend>

            <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" className="form-control" id="" placeholder="your firstname"/>
            </div>

            <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control" id="" placeholder="your surname"/>
            </div>

            <div className="form-group">
            <label htmlFor="suggestion-idea">Suggestion</label>
            <textarea className="form-control" rows="9" placeholder="your suggestion here" />
            </div>
            
            <button type="button" className="btn wk-btn" onClick={this.sendIdeaSuggestion}>Suggest</button>
            </form>
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
            <div >
            <p className="well well-sm ">Hi! How would you like to contribute ?</p>
            <button type="button" className="btn btn-sm wk-btn" onClick={this.suggestQuestion}>Suggest question</button>
             &nbsp;
            <button type="button" className="btn btn-sm wk-btn" onClick={this.suggestIdea}>Suggest idea</button>
            </div>
            );
        }
    }
});

ReactDOM.render(<SuggestBox />,document.getElementById("suggestions"));

