/*--------------------------------------------------------------------
| Help dialog box components 
| Author :Francis Ganya 
---------------------------------------------------------------------*/


/*-------------------------------------------------------------------
| SimplePanel component
| Take 2 params title and info
---------------------------------------------------------------------*/
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

/*-------------------------------------------------------------------
| setupGuides panel list component
---------------------------------------------------------------------*/
var SetupGuides=React.createClass({
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=Guides&method=getGuides"}
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
                      var receivedGuides=JSON.parse(data);
                      receivedGuides.map(function(guide,i){
                          guidesArr.push({'title':guide.g_name,'info':guide.content});
                      });
                      this.setState({guides:guidesArr});
                   }
              }.bind(this));
        
    },
    render:function()
    {
        return(
            <div>
            {this.state.guides.map(function(guide,index){
                return (
                    <SimplePanel key={index} title={guide.title} info={guide.info} />
                );
            })}
            </div>
        )
    }
});

/*-------------------------------------------------------------------
| what's this information component
---------------------------------------------------------------------*/
var AboutTheWK=React.createClass({
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=About&method=getAboutInfo"}
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
            <div>
                <SimplePanel info={this.state.about.gameinfo} title="The Weakest-Link"/>
            </div>
        )
    }
});

/*-------------------------------------------------------------------
| about  information component
---------------------------------------------------------------------*/
var AboutGame=React.createClass({
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=About&method=getAboutInfo_about"}
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
            <div>
                <div className="game-name">{this.state.about.gamename}</div>
                <div className="version fa fa-tag">{this.state.about.version}</div>
                <p className="well">{this.state.about.overview}</p>
            </div>
        )
    }
});

/*-------------------------------------------------------------------
| Developer's  information component
---------------------------------------------------------------------*/
var DeveloperBox=React.createClass({
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=About&method=getCreditInfo"}
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
            <div>
               <div className="panel panel-default">
               <div className="panel-body">
               <p>This software has been hand crafted by &nbsp;
               <a href={'http://'+this.state.about.website}>
               {this.state.about.developer}</a> &rarr;
               {this.state.about.email} 
               </p>
              </div>
            </div>
            </div>
        )
    }
});

/*-------------------------------------------------------------------
| Acknowledgement list
---------------------------------------------------------------------*/
var AcknowledgementList=React.createClass({
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=Acknowledgements&method=getAcknowledgements"}
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
            <div>
              {this.state.projects.map(function(library,index){
                  return  <a target='_blank' href={'http:://'+library.website} key={index} className="list-group-item">{library.project}</a>
              })}
            </div>
        )
    }
});

/*-------------------------------------------------------------------
| Acknowledgement list
---------------------------------------------------------------------*/
var ModificationsList=React.createClass({
    getDefaultProps:function()
    {
        return {infoURL:"./?controller=Modifications&method=getMods"}
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
            <div>
            {this.state.mods.map(function(modification,index){
                return (
                    <a href="#" className="list-group-item" key={index}>
                    <h4 className="list-group-item-heading">{modification.mod}</h4>
                    <p className="list-group-item-text">{modification.changes}</p>
                    </a>
                )
                })
            }    
            </div>
        )
    }
});
/*-------------------------------------------------------------------
| Render components
---------------------------------------------------------------------*/
ReactDOM.render(<SetupGuides />,document.getElementById("setup-guides"));
ReactDOM.render(<AboutTheWK />,document.getElementById("about-the-wk"));
ReactDOM.render(<AboutGame />,document.getElementById("about-game-information"));
ReactDOM.render(<DeveloperBox />,document.getElementById("developer-credit"));
ReactDOM.render(<AcknowledgementList />,document.getElementById("acknowledgement-list"));
ReactDOM.render(<ModificationsList />,document.getElementById("modification-list"));