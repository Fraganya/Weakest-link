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