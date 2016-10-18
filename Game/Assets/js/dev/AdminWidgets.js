"use strict"
function useSvg(svgTag,xlinktag,extr)
{
        var useTag='<svg class="glyph stroked "'+svgTag+'">'+'<use xlink:href="#stroked-'+xlinktag+'"></use></svg>';
        useTag+=(extr) ? extr : '';
        return { __html:useTag }
}

var Header=React.createClass({
    render:function()
    {
        return(
            <div>
            <div className="row">
                <ol className="breadcrumb">
                    <li><a href="#" dangerouslySetInnerHTML={useSvg("home","home")}></a></li>
                    <li className="active">{this.props.name}</li>
                </ol>
		    </div>
                 {/** Current Page header */}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">{this.props.name}</h1>
                    </div>
                </div>
            </div>
        )
    }
});

var FilterForm=React.createClass({
    getInitialState:function()
    {
        return {step:'get'}
    },
    getForm:function()
    {
        return (
           <div className={this.props.dimensions}>
				<div className="panel panel-primary">
				<div className="panel-heading dark-overlay" dangerouslySetInnerHTML={useSvg("monitor","monitor","Inspect Contribution")} />
                 <div className="panel-body">
					<p>Enter ID</p>
                 </div>
                <div className="panel-footer">
                <div className="input-group">
                    <input id="btn-input" type="text" className="form-control input-md" placeholder="Inspect Contribution" />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-primary btn-md" id="btn-todo" onClick={this.getData}>Inspect</button>
                    </span>
                </div>
				</div>
                </div>
            </div>
        )
          
    },
    getData:function()
    {
        this.setState({step:"gotten-data"})
    },
    displayData:function()
    {
        return (
                <div className={this.props.dimensions}>
                <div className="panel panel-default">
					<div className="panel-heading" dangerouslySetInnerHTML={useSvg("monitor","monitor","Inspection Info")} />
					<div className="panel-body">
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="question">Question</label>
                                <div className="col-md-9">
                                    <input id="email" name="email" type="text" placeholder="Question" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Answer</label>
                                <div className="col-md-9">
                                    <textarea className="form-control" id="message" name="message" placeholder="Answer" rows="5"></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="tag">Tag</label>
                                <div className="col-md-9">
                                    <input id="tag" name="tag" type="text" placeholder="tag" className="form-control" />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">Add To Main DB </button>
                                </div>
                            </div>
                        </fieldset>
						</form>
					</div>
				</div>
                </div>
        )
    },
    render:function()
    {
        if(this.state.step=='gotten-data')
        {
            return this.displayData();
        }
        else{
            return this.getForm()
        }
    }
});
var RateChart=React.createClass({
    componentDidMount:function(){
        var chart = document.getElementById(this.props.idName).getContext("2d");
        window.myLine= new Chart(chart).Line(lineChartData, {
            responsive: true
        });
    }, 
    render:function()
    {
        return(
            <div className={this.props.dimensions}>
				<div className="panel panel-default">
					<div className="panel-heading">{this.props.name}</div>
					<div className="panel-body">
						<div className="canvas-wrapper">
							<canvas className={this.props.classes} id={this.props.idName} height="200" width="600"></canvas>
						</div>
					</div>
				</div>
		 </div>
        )
    }
});

var CustomTable=React.createClass({
    render:function()
    {
        return(
			<div className={this.props.dimensions}>
				<div className="panel panel-default">
					<div className="panel-heading">{this.props.title}</div>
					<div className="panel-body">
						<table data-toggle="table"  data-url={this.props.link} data-search="true" 
                              data-pagination="true" data-sort-question="question" data-sort-order="desc" 
                              data-select-item-name="toolbar1" 
                              data-show-refresh="true" data-show-toggle="true" data-show-columns="true"  data-select-item-name="toolbar1"
                              >
						    <thead>
						    <tr>
						        <th data-field="state" data-checkbox="true" >ID</th>
                                {
                                     this.props.headers.map(function(header,index){
                                       return(
                                        <th data-field={header} key={index} data-sortable="true">{header}</th>
                                     )
                                })
                                }
						    </tr>
						    </thead>
						</table>
					</div>
				</div>
			</div>
        )
    }
});
/**
 * Dashboard section components
 */
var WidgetList=React.createClass({
    render:function()
    {
        return (
            <div className="row">
            {
                this.props.widgets.map(function(widget,count){
                    return (
                        <div className="col-xs-12 col-md-6 col-lg-3" key={count}> {/**second widget game contributions */}
                            <div className={"panel panel-"+widget.color+" panel-widget "}>
                                <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left" dangerouslySetInnerHTML={useSvg(widget.icon,widget.xLink)}/>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                <div className="large">{widget.count}</div>
                                <div className="text-muted">{widget.description}</div>
                                </div>
                                </div>
                            </div>
                        </div> ) }) 
            } 
            </div>
        )
    }
});

var ToDoList=React.createClass({
    render:function()
    {
        return(
            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
				<div className="panel panel-blue">
				<div className="panel-heading dark-overlay" dangerouslySetInnerHTML={useSvg("clipboard-with-paper","clipboard-with-paper","To-do List")} />
                 <div className="panel-body">
						<ul className="todo-list">
                        {
                            this.props.todos.map(function(todo,index){
                                return(
                                    <li className="todo-list-item" key={index}>
                                    <div className="checkbox">
                                        <input type="checkbox" id="checkbox" />
                                        <label htmlFor="checkbox">{todo.description}</label>
                                    </div>
                                    <div className="pull-right action-buttons">
                                        <a href="#" dangerouslySetInnerHTML={useSvg("pencil","pencil")} />
                                        <a href="#" dangerouslySetInnerHTML={useSvg("flag","flag")} />
                                        <a href="#" dangerouslySetInnerHTML={useSvg("trash","trash")} />
                                    </div>
							        </li>
                                )
                            })
                        }
                        <div className="panel-footer">
						<div className="input-group">
							<input id="btn-input" type="text" className="form-control input-md" placeholder="Add new task" />
							<span className="input-group-btn">
								<button className="btn btn-primary btn-md" id="btn-todo">Add</button>
							</span>
						</div>
					</div>
                        </ul>
                  </div>
                  </div>
            </div>
        )
    }
})
var Dashboard=React.createClass({
    getInitialState:function()
    {
        return {
            widgets:[
                {name:"gameCount",count:0,description:"Games played",color:"blue",icon:"chain",xLink:"chain"},
                {name:"questionCount",count:0,description:"Questions in DB",color:"red",icon:"internal hard drive",xLink:"internal-hard-drive"},
                {name:"contribCount",count:0,description:"Contributions",color:"teal",icon:"basket",xLink:"basket"},
                {name:"topScore",count:1000,description:"is the top score",color:"teal",icon:"flag",xLink:"flag"}
            ],
            todos:[
                {description:"sample to do"},
                {description:"sample to do"}
            ]

        }
    },
    render:function()
    {
        return (
            <div>
               <Header name="Dashboard"/>
                {/** WKL counter widgets */}
                <WidgetList widgets={this.state.widgets} />
                <div className="row">
                <RateChart idName="line-chart" name="Rating - (Dummy stats)" classes="main-chart" dimensions="col-lg-8 col-sm-md-8 col-sm-8 col-xs-12"/>
                <ToDoList todos={this.state.todos} />
                </div>
            </div>
        )
    }
});

/**
 * Question section components
 */

var CustomPanel=React.createClass({
    render:function(){
        return(
            <div className="col-xs-12 col-md-12 col-lg-12">
				<div className="panel panel-default">
					<div className="panel-body easypiechart-panel">
						<h4>{this.props.tag}</h4>
						<div className="easypiechart" id={"easypiechart-"+this.props.color} data-percent={this.props.percent} ><span className="percent">{this.props.percent}%</span>
						</div>
					</div>
				</div>
			</div>
        )
        
    }
});
var QuestionSection=React.createClass({
    getInitialState:function()
    {
        return {QCount:10,DQCount:50}
    },
    render:function()
    {
        return(
            <div>
                <Header name="Questions"/>
                {/** main question components */}
                <div className="row">
                <CustomTable title="Questions in DB" link="Game/tables/data1.json"
                     headers={['question','answer','lastAccessed']}
                     dimensions="col-lg-9 col-md-9 col-sm-9 col-xs-12" />
                 <div className="col-sm-3 col-lg-3 col-md-3">
                     <CustomPanel percent={this.state.QCount} tag="To Max Goal" color="red"/>
                     <CustomPanel percent={this.state.DQCount} tag="Difficult"  color="blue"/>
                 </div>
                </div>
            </div>
        );
    }
});


/**
 * statistics section components
 */

var StatSection=React.createClass({
    render:function()
    {
        return(
           <div>
             <Header name="Statistics" />
             <div className="row">
                 <RateChart idName="play-chart" name="Play Rate" classes="stat-chart" dimensions="col-sm-6 col-md-6 col-lg-6 col-xs-12"/>
                 <CustomTable title="Games Played" link="Game/tables/data2.json"
                        headers={['GameTag','Players','Money']}
                        dimensions="col-sm-6 col-md-6 col-lg-6 col-xs-12"/>
            </div>
                
           </div>
        )
    }
});

/**
 * Score section components
 */

var ScoreSection=React.createClass({
    getInitialState:function()
    {
        return {
            widgets:[
                {name:"TopScore",count:30500,description:"Top Score",color:"blue",icon:"chain",xLink:"chain"},
                {name:"LowestScore",count:500,description:"Lowest Score",color:"red",icon:"arrow down",xLink:"arrow-down"}
            ]
     }
    },
    render:function()
    {
        return (
            <div>
                <Header name="Scores" />
                <div className="row">
                <CustomTable title="Scores" link="Game/tables/data2.json"
                            headers={['GameTag','Money']}
                            dimensions="col-sm-6 col-md-6 col-lg-6 col-xs-12"/>
               
                    <WidgetList widgets={this.state.widgets} />
                </div>
            </div>
        )
    }
})

/**
 * Contributions Section
 */

var QContributions=React.createClass({
    render:function()
    {
        return (
            <div>
                <Header name="Contributions/Questions" />
                <div className="row">
                    <CustomTable title="Contributed Questions" link="Game/tables/data1.json"
                        headers={['question','answer']}
                        dimensions="col-sm-8 col-md-8 col-lg-8 col-xs-12"/>
                    <FilterForm dimensions="col-sm-4 col-md-4 col-lg-4 col-xs-12" />
                </div>
            </div>
        )
    }
});

var SContributions=React.createClass({
    render:function()
    {
        return (
            <div>
                <Header name="Contributions/Suggestions" />
                <div className="row">
                    <CustomTable title="Contributed Questions" link="Game/tables/data2.json"
                        headers={['GameTag','Money']}
                        dimensions="col-sm-12 col-md-12 col-lg-12 col-xs-12"/>
                </div>
            </div>
        )
    }
});

/**
 * About Widgets
 */

var ModsForm=React.createClass({
    render:function()
    {
        return (
        <div className={this.props.dimensions}>
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="question">Modification</label>
                                <div className="col-md-9">
                                    <input id="mod" name="mod" type="text" placeholder="Mod" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Real</label>
                                <div className="col-md-9">
                                    <textarea className="form-control" id="real" name="real" placeholder="Reality" rows="3"></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Changes</label>
                                <div className="col-md-9">
                                    <textarea className="form-control" id="changes" name="changes" placeholder="Changes" rows="3"></textarea>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">Add</button>
                                </div>
                            </div>
                        </fieldset>
						</form>
                </div>
        )
    }
});

var CreditForm=React.createClass({
    render:function()
    {
        return (
        <div className={this.props.dimensions}>
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="project">Project</label>
                                <div className="col-md-9">
                                    <input id="project" name="project" type="text" placeholder="project" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Website</label>
                                <div className="col-md-9">
                                     <input id="website" name="website" type="text" placeholder="website" className="form-control" />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">Add</button>
                                </div>
                            </div>
                        </fieldset>
						</form>
                </div>
        )
    }
});

var GuideForm=React.createClass({
    render:function()
    {
        return (
        <div className={this.props.dimensions}>
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="title">Title</label>
                                <div className="col-md-9">
                                    <input id="project" name="project" type="text" placeholder="project" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="content">Content</label>
                                <div className="col-md-9">
                                     <textarea className="form-control" id="changes" name="changes" placeholder="Chnages" rows="7"></textarea>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">Add</button>
                                </div>
                            </div>
                        </fieldset>
						</form>
                </div>
        )
    }
});
var Input={
   getInitialState:function()
    {
        return {editing:false}
    },
    edit:function()
    {
        this.refs.box.disabled=false;
        this.setState({editing:true})
    },
    save:function()
    {
        this.refs.box.disabled=true;
        this.setState({editing:false})
    }
}
var InputItem=React.createClass({
    mixins:[Input],
    render:function()
    {
        return(
            <div className={this.props.dimensions}>
				<div className="panel panel-primary">
                <div className="input-group">
                    <input ref="box" type="text" className="form-control input-md" placeholder="Inspect Contribution" disabled/>
                    <span className="input-group-btn">
                        <button type="button" 
                            className={(this.state.editing) ? "btn btn-primary btn-md  glyphicon glyphicon-floppy-disk" : " btn btn-primary btn-md  glyphicon glyphicon-pencil" }
                            onClick={(this.state.editing) ? this.save :this.edit} />
                    </span>
				</div>
                </div>
            </div>
            )
       
    }
});
var GameInfoBox=React.createClass({
    mixins:[Input],
    render:function()
    {
        return (
            <div className="panel panel-primary">
            <div className="form-group">
                    <textarea ref="box" className="form-control" id="message" name="message" placeholder="Answer" rows="11" disabled/>
                <div className="form-group">
                    <div className="col-md-12 widget-right">
                        <button type="button" 
                         className={(this.state.editing) ? "btn btn-primary btn-md pull-right glyphicon glyphicon-floppy-disk" : " btn btn-primary btn-md pull-right glyphicon glyphicon-pencil" }
                         onClick={(this.state.editing) ? this.save :this.edit} />
                    </div>
                </div>
            </div>
            </div>
        )
    }
});

var SimpleTable=React.createClass({
    render:function()
    {
        return(
			<div className={this.props.dimensions}>
						<table data-toggle="table"  data-url={this.props.link} data-search="true" 
                              data-pagination="true" data-sort-question="question" data-sort-order="desc" 
                              data-select-item-name="toolbar1" 
                              data-show-refresh="true" data-show-toggle="true" data-show-columns="true"  data-select-item-name="toolbar1"
                              >
						    <thead>
						    <tr>
						        <th data-field="state" data-checkbox="true" >ID</th>
                                {
                                     this.props.headers.map(function(header,index){
                                       return(
                                        <th data-field={header} key={index} data-sortable="true">{header}</th>
                                     )
                                })
                                }
						    </tr>
						    </thead>
						</table>
			</div>
        )
    }
});
var About=React.createClass({
    render:function()
    {
        return(
            <div>
            <Header name="About" />
                <div className="panel panel-default">
                <div className="panel-body tabs">
                
                    <ul className="nav nav-pills">
                        <li className="active"><a href="#about-game" data-toggle="tab">Game</a></li>
                        <li><a href="#about-mods" data-toggle="tab">Modifications</a></li>
                        <li><a href="#about-credits" data-toggle="tab">Credits</a></li>
                        <li><a href="#about-guides" data-toggle="tab">Guides</a></li>
                    </ul>
                    <div className="tab-content">
                            {/** about-game pane */}
							<div className="tab-pane fade " id="about-game">
                              {/** About game info */}
                                    <div className="row">
                                            <div className="col-sm-5">
                                            <GameInfoBox dimensions=""/>
                                            </div>
                                            <div className="col-sm-7">
                                                <InputItem dimensions="col-sm-12"/>
                                                <InputItem dimensions="col-sm-12"/>
                                                <InputItem dimensions="col-sm-12"/>
                                                <InputItem dimensions="col-sm-12"/>
                                                <InputItem dimensions="col-sm-12"/>
                                                <InputItem dimensions="col-sm-12"/>
                                            </div>
                                    </div>
                             </div>

                              {/** ./About game pane */}
                             
                             {/** about-game pane */}
                            <div className="tab-pane fade in active " id="about-mods">
                                <div className="row">
                                 <SimpleTable title="Modifications" link="Game/tables/data1.json"
                                    headers={['question','answer']}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                                  <ModsForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12" />
                                </div>
                            
                            </div>
                            <div className="tab-pane fade " id="about-credits">
                                 <div className="row">
                                 <SimpleTable title="Credits" link="Game/tables/data1.json"
                                    headers={['question','answer']}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                                  <CreditForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12" />
                                </div>
                            </div>
                            <div className="tab-pane fade " id="about-guides">
                                 <div className="row">
                                 <SimpleTable title="Credits" link="Game/tables/data1.json"
                                    headers={['question','answer']}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                                  <GuideForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12" />
                                </div>
                            </div>
                    </div>

                 </div>
		
            </div>
            </div>

        )
        
    }
});


/**
 * Admins widgets
 */
var AdminForm=React.createClass({
    render:function()
    {
        return (
                <div className={this.props.dimensions}>
                <div className="panel panel-default">
					<div className="panel-heading" dangerouslySetInnerHTML={useSvg("plus-sign","plus-sign","Add Admin")} />
					<div className="panel-body">
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="question">Username</label>
                                <div className="col-md-9">
                                    <input id="username" name="username" type="text" placeholder="Username" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Password</label>
                                <div className="col-md-9">
                                     <input id="password" name="password" type="text" placeholder="" className="form-control" />
                                </div>
                            </div>

                             <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Type</label>
                                <div className="col-md-9">
                                     <select id="type" name="type" type="text" placeholder="" className="form-control" >
                                        <option value="super">Super</option>
                                        <option value="Standard">Standard</option>
                                     </select>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">Add </button>
                                </div>
                            </div>
                        </fieldset>
						</form>
					</div>
				</div>
                </div>
        )
    }
});
var AdminsBox=React.createClass({
   getInitialState:function()
    {
        return {
            widgets:[
                {name:"adminCount",count:0,description:"Admins",color:"blue",icon:"male user",xLink:"male-user"},
            ]
        }
    },
    render:function()
    {
        return(
            <div>
                <Header name="Admins"/>
                <div className="row">
                <CustomTable title="Admins" link="Game/tables/data1.json"
                                    headers={['question','answer']}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                 <AdminForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12"/>
                 </div>
            </div>
        )
    }
})

/**
 * profile widgets
 */
var SettingsForm=React.createClass({
    render:function()
    {
        return(
            <div className={this.props.dimensions}>
                <div className="panel panel-default">
					<div className="panel-heading" dangerouslySetInnerHTML={useSvg("monitor","monitor","Update Info")} />
					<div className="panel-body">
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="firstname">Firstname</label>
                                <div className="col-md-9">
                                    <input id="firstname" name="firstname" type="text" placeholder="firstname" className="form-control" />
                                </div>
                            </div>

                             <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="firstname">surname</label>
                                <div className="col-md-9">
                                    <input id="firstname" name="firstname" type="text" placeholder="surname" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Password</label>
                                <div className="col-md-9">
                                     <input id="password" name="password" type="text" placeholder="" className="form-control" />
                                </div>
                            </div>

                            
                             <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="firstname">Email</label>
                                <div className="col-md-9">
                                    <input id="firstname" name="firstname" type="text" placeholder="surname" className="form-control" />
                                </div>
                            </div>


                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">update</button>
                                </div>
                            </div>
                        </fieldset>
						</form>
					</div>
				</div>
                </div>
        )
    }
})
var SettingsBox=React.createClass({
    render:function(){
        return(
            <div>
                <Header name="Settings" />
                <SettingsForm  dimensions="col-sm-6 col-smd-6 col-lg-6 col-xs-12" />
            </div>
        )
    }
})
/**
 * render the components
 */
ReactDOM.render(<Dashboard />,document.getElementById("ds-section"));
ReactDOM.render(<QuestionSection />,document.getElementById("qn-section"));
ReactDOM.render(<StatSection />,document.getElementById("stat-section"));
ReactDOM.render(<ScoreSection />,document.getElementById("score-section"));
ReactDOM.render(<QContributions />,document.getElementById("Q-contrib-section"));
ReactDOM.render(<SContributions />,document.getElementById("S-contrib-section"));
ReactDOM.render(<About />,document.getElementById("about-section"));
ReactDOM.render(<AdminsBox />,document.getElementById("admin-section"));
ReactDOM.render(<SettingsBox />,document.getElementById("settings-section"));