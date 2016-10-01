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
    getInitialState:function()
    {
        return {guides:[]};
    },
    componentDidMount:function()
    {
        var guidesArr=this.state.guides;
        var ParentObj=this;
        $.post("./game/async/db.php",
              {
                  cat:'Guides',
                  cmd:'get-guides',
                  count:4
              },function(data,status){
                  if(data!='false')
                  {
                      var receivedGuides=JSON.parse(data);
                      receivedGuides.map(function(guide,i){
                          guidesArr.push({'title':guide.g_name,'info':guide.content});
                      });
                      ParentObj.setState({guides:guidesArr});
                   }
              });
        
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
    getInitialState:function()
    {
        return {about:{}};
    },
    componentDidMount:function()
    {
        var ParentObj=this;
        $.post("./game/async/db.php",
              {
                  cat:'About',
                  cmd:'get-about-info-only'
              },function(data,status){
                  if(data!='false')
                  {
                      var aboutInfo=JSON.parse(data);
                      ParentObj.setState({about:aboutInfo});
                  }
              });
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
    getInitialState:function()
    {
        return {about:{}};
    },
    componentDidMount:function()
    {
        var ParentObj=this;
        $.post("./game/async/db.php",
              {
                  cat:'About',
                  cmd:'get-about-info-for-about-modal'
              },function(data,status){
                  if(data!='false')
                  {
                      var aboutInfo=JSON.parse(data);
                      ParentObj.setState({about:aboutInfo});
                  }
              });
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
    getInitialState:function()
    {
        return {about:{}};
    },
    componentDidMount:function()
    {
        var ParentObj=this;
        $.post("./game/async/db.php",
              {
                  cat:'About',
                  cmd:'get-about-info-for-credit-modal'
              },function(data,status){
                  if(data!='false')
                  {
                      var aboutInfo=JSON.parse(data);
                      ParentObj.setState({about:aboutInfo});
                  }
              });
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
    getInitialState:function()
    {
        return {projects:[]};
    },
    componentDidMount:function()
    {
        var proArr=this.state.projects;
        var ParentObj=this;
        $.post("./game/async/db.php",
              {
                  cat:'Acknowledgements',
                  cmd:'get-acknowledgements'
              },function(data,status){
                  if(data!='false')
                  {
                      var list=JSON.parse(data);
                      list.map(function(project){
                          proArr.push(project);
                      });
                      ParentObj.setState({projects:proArr});
                  }
              });
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
    getInitialState:function()
    {
        return {mods:[]};
    },
    componentDidMount:function()
    {
        var modsArr=this.state.mods;
        var ParentObj=this;
        $.post("./game/async/db.php",
              {
                  cat:'Modifications',
                  cmd:'get-modifications'
              },function(data,status){
                  if(data!='false')
                  {
                      var list=JSON.parse(data);
                      
                      list.map(function(modification){
                          modsArr.push(modification);
                      });
                      ParentObj.setState({mods:modsArr});
                  }
              });
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