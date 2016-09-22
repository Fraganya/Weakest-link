
var SimplePanel=React.createClass({
    render:function()
    {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                <h3 className="panel-title">{this.props.title}</h3>
                </div>
                <div className="panel-body">
                {this.props.info}
               </div>         
            </div>
        );
    }
});

var SetupGuides=React.createClass({
    render:function()
    {
        return(
            <div>
                <SimplePanel info="setup game" title="Setting up a game"/>
                <SimplePanel info="setup a game session" title="Setting up a session"/>
                <SimplePanel info="joining a session" title="Joining a session"/>
            </div>
        )
    }
});

var AboutGame=React.createClass({
    render:function()
    {
        return(
            <div>
                <SimplePanel info="information about the game" title="The Weakest-Link"/>
            </div>
        )
    }
});

ReactDOM.render(<SetupGuides />,document.getElementById("setup-guides"));
ReactDOM.render(<AboutGame />,document.getElementById("about-the-wk"));

