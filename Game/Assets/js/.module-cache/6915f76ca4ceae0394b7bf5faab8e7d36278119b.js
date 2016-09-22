var Modal=React.createClass(
{displayName: "Modal",
  getDefaultProps:function(){
       return{
           size:"modal-sm",
           title:"WK-modal"
       }
   },
  render:function()
    {
    
    return(
    React.createElement("div", {className: "modal-dialog "+this.props.size}, 
        React.createElement("div", {className: "modal-content"}, 
        React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
            React.createElement("h4", {className: "modal-title"}, this.props.title)
        ), 
        React.createElement("div", {className: "modal-body"}, 
            this.props.content
        )
        )
    )
         );
    }
});

var SimplePanel=React.createClass({displayName: "SimplePanel",
    render:function()
    {
        return(
            React.createElement("div", {class: "panel panel-default"}, 
            React.createElement("div", {class: "panel-heading"}, 
              React.createElement("h3", {class: "panel-title"}, this.props.title)
            ), 
            React.createElement("div", {class: "panel-body"}, 
                this.props.info
            )
            )
        );
    }
});

ReactDOM.render(React.createElement(SimplePanel, {info: "This is how you set up the game"}),document.getElementById("setup-guides"))
