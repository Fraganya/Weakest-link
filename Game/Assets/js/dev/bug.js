 var BugForm=React.createClass({
    getInitialState:function()
    {
        return {reporting:true};
    },
    sendBugReport:function()
    {
        this.setState({reporting:false});
    },
    report:function()
    {
        this.setState({reporting:true});
    },
    renderBuForm:function()
    {
        return(
            <form action="" method="POST" role="form">
            <legend>Bug Form</legend>

            <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" className="form-control" id="" placeholder="your firstname"/>
            </div>

            <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input type="text" className="form-control" id="" placeholder="your surname"/>
            </div>

            <div className="form-group">
            <label htmlFor="suggestion-question">Bug</label>
            <textarea className="form-control" rows="5" placeholder="What happened"/>
            </div>
            
            <button type="button" className="btn wk-btn" onClick={this.sendBugReport}>Report</button>
            </form>
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
               <div>
               <div className="well well-sm">
               Thank you for reporting
               </div>
               <button className="btn btn-sm wk-btn" onClick={this.report}>Report another ?</button>
               </div>
           );
       }
    }
});

ReactDOM.render(<BugForm />,document.getElementById("bug-form"));

