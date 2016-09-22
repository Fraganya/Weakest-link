var AddGameModal=React.createClass(
{
    getInitialState:function()
    {
        return {status:'selection'}
    },
    selection:function()
    {

    },
    registration:function()
    {

    },
    render:function()
        {
        
        return(
        <div className={"modal-dialog "+this.props.size}>
            <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
                {this.props.content}
            </div>
            </div>
        </div>
            );
        }
});
