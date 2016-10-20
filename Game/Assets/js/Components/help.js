/*--------------------------------------------------------------------
| Help dialog box components 
| Author :Francis Ganya 
---------------------------------------------------------------------*/


/*-------------------------------------------------------------------
| SimplePanel component
| Take 2 params title and info
---------------------------------------------------------------------*/
var SimplePanel=React.createClass({displayName: "SimplePanel",
    render:function()
    {
        return(
            React.createElement("div", {className: "panel panel-default"}, 
                React.createElement("div", {className: "panel-heading"}, 
                React.createElement("h3", {className: "panel-title"}, this.props.title)
                ), 
                React.createElement("div", {className: "panel-body"}, 
                this.props.info
               )
            )
        );
    }
});

/*-------------------------------------------------------------------
| setupGuides panel list component
---------------------------------------------------------------------*/
var SetupGuides=React.createClass({displayName: "SetupGuides",
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=Guides&method=get"}
    },
    getInitialState:function()
    {
        return {guides:[]};
    },
    componentDidMount:function()
    {
        $.post(this.props.infoURL,{count:3},function(data,status){
                 var guidesArr=[];
                  if(data!='false')
                  {
                      try{
                           var receivedGuides=JSON.parse(data);
                        receivedGuides.map(function(guide,i){
                            guidesArr.push({'title':guide.g_name,'info':guide.content});
                        });
                        this.setState({guides:guidesArr});
                      }
                      catch(e){console.log("No guides")}
                     
                   }
              }.bind(this));
        
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
            this.state.guides.map(function(guide,index){
                return (
                    React.createElement(SimplePanel, {key: index, title: guide.title, info: guide.info})
                );
            })
            )
        )
    }
});

/*-------------------------------------------------------------------
| what's this information component
---------------------------------------------------------------------*/
var AboutTheWK=React.createClass({displayName: "AboutTheWK",
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=About&method=info"}
    },
    getInitialState:function()
    {
        return {about:{}};
    },
    componentDidMount:function()
    {
        $.post(this.props.infoURL, {},function(data,status){
                  if(data!='false')
                  {
                      var aboutInfo=JSON.parse(data);
                      this.setState({about:aboutInfo});
                  }
              }.bind(this));
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
                React.createElement(SimplePanel, {info: this.state.about.gameinfo, title: "The Weakest-Link"})
            )
        )
    }
});

/*-------------------------------------------------------------------
| about  information component
---------------------------------------------------------------------*/
var AboutGame=React.createClass({displayName: "AboutGame",
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=About&method=summary"}
    },
    getInitialState:function()
    {
        return {about:{}};
    },
    componentDidMount:function()
    {
        $.post(this.props.infoURL,{},function(data,status){
                  if(data!='false')
                  {
                      var aboutInfo=JSON.parse(data);
                      this.setState({about:aboutInfo});
                  }
              }.bind(this));
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
                React.createElement("div", {className: "game-name"}, this.state.about.gamename), 
                React.createElement("div", {className: "version fa fa-tag"}, this.state.about.version), 
                React.createElement("p", {className: "well"}, this.state.about.overview)
            )
        )
    }
});

/*-------------------------------------------------------------------
| Developer's  information component
---------------------------------------------------------------------*/
var DeveloperBox=React.createClass({displayName: "DeveloperBox",
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=About&method=credits"}
    },
    getInitialState:function()
    {
        return {about:{}};
    },
    componentDidMount:function()
    {
        $.post(this.props.infoURL,{},function(data,status){
                  if(data!='false')
                  {
                      var aboutInfo=JSON.parse(data);
                      this.setState({about:aboutInfo});
                  }
              }.bind(this));
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
               React.createElement("div", {className: "panel panel-default"}, 
               React.createElement("div", {className: "panel-body"}, 
               React.createElement("p", null, "This software has been hand crafted by  ", 
               React.createElement("a", {href: 'http://'+this.state.about.website}, 
               this.state.about.developer), " →", 
               this.state.about.email
               )
              )
            )
            )
        )
    }
});

/*-------------------------------------------------------------------
| Acknowledgement list
---------------------------------------------------------------------*/
var AcknowledgementList=React.createClass({displayName: "AcknowledgementList",
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=Acknowledgements&method=get"}
    },
    getInitialState:function()
    {
        return {projects:[]};
    },
    componentDidMount:function()
    {
        $.post(this.props.infoURL,{},function(data,status){
                 var proArr=[];
                  if(data!='false')
                  {
                      var list=JSON.parse(data);
                      list.map(function(project){
                          proArr.push(project);
                      });
                      this.setState({projects:proArr});
                  }
              }.bind(this));
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
              this.state.projects.map(function(library,index){
                  return  React.createElement("a", {target: "_blank", href: 'http:://'+library.website, key: index, className: "list-group-item"}, library.project)
              })
            )
        )
    }
});

/*-------------------------------------------------------------------
| Acknowledgement list
---------------------------------------------------------------------*/
var ModificationsList=React.createClass({displayName: "ModificationsList",
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=Modifications&method=get"}
    },
    getInitialState:function()
    {
        return {mods:[]};
    },
    componentDidMount:function()
    {
        $.post(this.props.infoURL,{},function(data,status){
                  if(data!='false')
                  {
                      var modsArr=[];
                      var list=JSON.parse(data);
                      
                      list.map(function(modification){
                          modsArr.push(modification);
                      });
                      this.setState({mods:modsArr});
                  }
              }.bind(this));
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
            this.state.mods.map(function(modification,index){
                return (
                    React.createElement("a", {href: "#", className: "list-group-item", key: index}, 
                    React.createElement("h4", {className: "list-group-item-heading"}, modification.mod), 
                    React.createElement("p", {className: "list-group-item-text"}, modification.changes)
                    )
                )
                })
            
            )
        )
    }
});
/*-------------------------------------------------------------------
| Render components
---------------------------------------------------------------------*/
ReactDOM.render(React.createElement(SetupGuides, null),document.getElementById("setup-guides"));
ReactDOM.render(React.createElement(AboutTheWK, null),document.getElementById("about-the-wk"));
ReactDOM.render(React.createElement(AboutGame, null),document.getElementById("about-game-information"));
ReactDOM.render(React.createElement(DeveloperBox, null),document.getElementById("developer-credit"));
ReactDOM.render(React.createElement(AcknowledgementList, null),document.getElementById("acknowledgement-list"));
ReactDOM.render(React.createElement(ModificationsList, null),document.getElementById("modification-list"));