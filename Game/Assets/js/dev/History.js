var GameEvent=React.createClass({
    render:function()
    {
        return (
           <li className="list-group-item">
           <span className="fa fa-history"></span>
            &nbsp;
            {this.props.eventTitle}
            <span className="pull-right"> 
            {this.props.eventTime.getHours()}:{this.props.eventTime.getMinutes()}
            </span>
            </li>
        );
    } 
});

var GameEvents=React.createClass({
    getInitialState:function()
    {
        return {wkEvents:[{"title":'game-start',"time":new Date()},{"title":'Player-eliminated',"time":new Date()}]};
    },
    addEvent:function(title)
    {
        var eventsArr=this.state.wkEvents;
        var newEvent={'title':title,'time':new Date()};
        eventsArr.push(newEvent);
        this.setState({wkEvents:eventArr});
    },
    render:function()
    {
        return (        
            <div className="modal fade" id="game-history">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 className="modal-title"><span className="fa fa-history"></span> History</h4>
            </div>
            <div className="modal-body">
                <div className="well well-sm">
                    This is a list of all significant game events:
                </div>        
                <ul className="list-group">
                  {this.state.wkEvents.map(function(event,index){
                      return (
                        <GameEvent key={index} eventTitle={event.title} eventTime={event.time}/>
                        )
                  })}
                </ul>          
            </div>
            </div>
            </div>
            </div>

        );
    }
});

ReactDOM.render(<GameEvents />,document.getElementById('game-events'));