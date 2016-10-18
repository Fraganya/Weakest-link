"use strict"
function useSvg(svgTag,xlinktag,extr)
{
        var useTag='<svg class="glyph stroked "'+svgTag+'">'+'<use xlink:href="#stroked-'+xlinktag+'"></use></svg>';
        useTag+=(extr) ? extr : '';
        return { __html:useTag }
}

var Header=React.createClass({displayName: "Header",
    render:function()
    {
        return(
            React.createElement("div", null, 
            React.createElement("div", {className: "row"}, 
                React.createElement("ol", {className: "breadcrumb"}, 
                    React.createElement("li", null, React.createElement("a", {href: "#", dangerouslySetInnerHTML: useSvg("home","home")})), 
                    React.createElement("li", {className: "active"}, this.props.name)
                )
		    ), 
                 /** Current Page header */
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-lg-12"}, 
                        React.createElement("h1", {className: "page-header"}, this.props.name)
                    )
                )
            )
        )
    }
});

var FilterForm=React.createClass({displayName: "FilterForm",
    getInitialState:function()
    {
        return {step:'get'}
    },
    getForm:function()
    {
        return (
           React.createElement("div", {className: this.props.dimensions}, 
				React.createElement("div", {className: "panel panel-primary"}, 
				React.createElement("div", {className: "panel-heading dark-overlay", dangerouslySetInnerHTML: useSvg("monitor","monitor","Inspect Contribution")}), 
                 React.createElement("div", {className: "panel-body"}, 
					React.createElement("p", null, "Enter ID")
                 ), 
                React.createElement("div", {className: "panel-footer"}, 
                React.createElement("div", {className: "input-group"}, 
                    React.createElement("input", {id: "btn-input", type: "text", className: "form-control input-md", placeholder: "Inspect Contribution"}), 
                    React.createElement("span", {className: "input-group-btn"}, 
                        React.createElement("button", {type: "button", className: "btn btn-primary btn-md", id: "btn-todo", onClick: this.getData}, "Inspect")
                    )
                )
				)
                )
            )
        )
          
    },
    getData:function()
    {
        this.setState({step:"gotten-data"})
    },
    displayData:function()
    {
        return (
                React.createElement("div", {className: this.props.dimensions}, 
                React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading", dangerouslySetInnerHTML: useSvg("monitor","monitor","Inspection Info")}), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "question"}, "Question"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "email", name: "email", type: "text", placeholder: "Question", className: "form-control"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Answer"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("textarea", {className: "form-control", id: "message", name: "message", placeholder: "Answer", rows: "5"})
                                )
                            ), 

                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "tag"}, "Tag"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "tag", name: "tag", type: "text", placeholder: "tag", className: "form-control"})
                                )
                            ), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, "Add To Main DB ")
                                )
                            )
                        )
						)
					)
				)
                )
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
var RateChart=React.createClass({displayName: "RateChart",
    componentDidMount:function(){
        var chart = document.getElementById(this.props.idName).getContext("2d");
        window.myLine= new Chart(chart).Line(lineChartData, {
            responsive: true
        });
    }, 
    render:function()
    {
        return(
            React.createElement("div", {className: this.props.dimensions}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading"}, this.props.name), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("div", {className: "canvas-wrapper"}, 
							React.createElement("canvas", {className: this.props.classes, id: this.props.idName, height: "200", width: "600"})
						)
					)
				)
		 )
        )
    }
});

var CustomTable=React.createClass({displayName: "CustomTable",
    render:function()
    {
        return(
			React.createElement("div", {className: this.props.dimensions}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading"}, this.props.title), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("table", {"data-toggle": "table", "data-url": this.props.link, "data-search": "true", 
                              "data-pagination": "true", "data-sort-question": "question", "data-sort-order": "desc", 
                              "data-select-item-name": "toolbar1", 
                              "data-show-refresh": "true", "data-show-toggle": "true", "data-show-columns": "true", "data-select-item-name": "toolbar1"
                              }, 
						    React.createElement("thead", null, 
						    React.createElement("tr", null, 
						        React.createElement("th", {"data-field": "state", "data-checkbox": "true"}, "ID"), 
                                
                                     this.props.headers.map(function(header,index){
                                       return(
                                        React.createElement("th", {"data-field": header, key: index, "data-sortable": "true"}, header)
                                     )
                                })
                                
						    )
						    )
						)
					)
				)
			)
        )
    }
});
/**
 * Dashboard section components
 */
var WidgetList=React.createClass({displayName: "WidgetList",
    render:function()
    {
        return (
            React.createElement("div", {className: "row"}, 
            
                this.props.widgets.map(function(widget,count){
                    return (
                        React.createElement("div", {className: "col-xs-12 col-md-6 col-lg-3", key: count}, " ", /**second widget game contributions */
                            React.createElement("div", {className: "panel panel-"+widget.color+" panel-widget "}, 
                                React.createElement("div", {className: "row no-padding"}, 
                                React.createElement("div", {className: "col-sm-3 col-lg-5 widget-left", dangerouslySetInnerHTML: useSvg(widget.icon,widget.xLink)}), 
                                React.createElement("div", {className: "col-sm-9 col-lg-7 widget-right"}, 
                                React.createElement("div", {className: "large"}, widget.count), 
                                React.createElement("div", {className: "text-muted"}, widget.description)
                                )
                                )
                            )
                        ) ) }) 
            
            )
        )
    }
});

var ToDoList=React.createClass({displayName: "ToDoList",
    render:function()
    {
        return(
            React.createElement("div", {className: "col-md-4 col-lg-4 col-sm-4 col-xs-12"}, 
				React.createElement("div", {className: "panel panel-blue"}, 
				React.createElement("div", {className: "panel-heading dark-overlay", dangerouslySetInnerHTML: useSvg("clipboard-with-paper","clipboard-with-paper","To-do List")}), 
                 React.createElement("div", {className: "panel-body"}, 
						React.createElement("ul", {className: "todo-list"}, 
                        
                            this.props.todos.map(function(todo,index){
                                return(
                                    React.createElement("li", {className: "todo-list-item", key: index}, 
                                    React.createElement("div", {className: "checkbox"}, 
                                        React.createElement("input", {type: "checkbox", id: "checkbox"}), 
                                        React.createElement("label", {htmlFor: "checkbox"}, todo.description)
                                    ), 
                                    React.createElement("div", {className: "pull-right action-buttons"}, 
                                        React.createElement("a", {href: "#", dangerouslySetInnerHTML: useSvg("pencil","pencil")}), 
                                        React.createElement("a", {href: "#", dangerouslySetInnerHTML: useSvg("flag","flag")}), 
                                        React.createElement("a", {href: "#", dangerouslySetInnerHTML: useSvg("trash","trash")})
                                    )
							        )
                                )
                            }), 
                        
                        React.createElement("div", {className: "panel-footer"}, 
						React.createElement("div", {className: "input-group"}, 
							React.createElement("input", {id: "btn-input", type: "text", className: "form-control input-md", placeholder: "Add new task"}), 
							React.createElement("span", {className: "input-group-btn"}, 
								React.createElement("button", {className: "btn btn-primary btn-md", id: "btn-todo"}, "Add")
							)
						)
					)
                        )
                  )
                  )
            )
        )
    }
})
var Dashboard=React.createClass({displayName: "Dashboard",
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
            React.createElement("div", null, 
               React.createElement(Header, {name: "Dashboard"}), 
                /** WKL counter widgets */
                React.createElement(WidgetList, {widgets: this.state.widgets}), 
                React.createElement("div", {className: "row"}, 
                React.createElement(RateChart, {idName: "line-chart", name: "Rating - (Dummy stats)", classes: "main-chart", dimensions: "col-lg-8 col-sm-md-8 col-sm-8 col-xs-12"}), 
                React.createElement(ToDoList, {todos: this.state.todos})
                )
            )
        )
    }
});

/**
 * Question section components
 */

var CustomPanel=React.createClass({displayName: "CustomPanel",
    render:function(){
        return(
            React.createElement("div", {className: "col-xs-12 col-md-12 col-lg-12"}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-body easypiechart-panel"}, 
						React.createElement("h4", null, this.props.tag), 
						React.createElement("div", {className: "easypiechart", id: "easypiechart-"+this.props.color, "data-percent": this.props.percent}, React.createElement("span", {className: "percent"}, this.props.percent, "%")
						)
					)
				)
			)
        )
        
    }
});
var QuestionSection=React.createClass({displayName: "QuestionSection",
    getInitialState:function()
    {
        return {QCount:10,DQCount:50}
    },
    render:function()
    {
        return(
            React.createElement("div", null, 
                React.createElement(Header, {name: "Questions"}), 
                /** main question components */
                React.createElement("div", {className: "row"}, 
                React.createElement(CustomTable, {title: "Questions in DB", link: "Game/tables/data1.json", 
                     headers: ['question','answer','lastAccessed'], 
                     dimensions: "col-lg-9 col-md-9 col-sm-9 col-xs-12"}), 
                 React.createElement("div", {className: "col-sm-3 col-lg-3 col-md-3"}, 
                     React.createElement(CustomPanel, {percent: this.state.QCount, tag: "To Max Goal", color: "red"}), 
                     React.createElement(CustomPanel, {percent: this.state.DQCount, tag: "Difficult", color: "blue"})
                 )
                )
            )
        );
    }
});


/**
 * statistics section components
 */

var StatSection=React.createClass({displayName: "StatSection",
    render:function()
    {
        return(
           React.createElement("div", null, 
             React.createElement(Header, {name: "Statistics"}), 
             React.createElement("div", {className: "row"}, 
                 React.createElement(RateChart, {idName: "play-chart", name: "Play Rate", classes: "stat-chart", dimensions: "col-sm-6 col-md-6 col-lg-6 col-xs-12"}), 
                 React.createElement(CustomTable, {title: "Games Played", link: "Game/tables/data2.json", 
                        headers: ['GameTag','Players','Money'], 
                        dimensions: "col-sm-6 col-md-6 col-lg-6 col-xs-12"})
            )
                
           )
        )
    }
});

/**
 * Score section components
 */

var ScoreSection=React.createClass({displayName: "ScoreSection",
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
            React.createElement("div", null, 
                React.createElement(Header, {name: "Scores"}), 
                React.createElement("div", {className: "row"}, 
                React.createElement(CustomTable, {title: "Scores", link: "Game/tables/data2.json", 
                            headers: ['GameTag','Money'], 
                            dimensions: "col-sm-6 col-md-6 col-lg-6 col-xs-12"}), 
               
                    React.createElement(WidgetList, {widgets: this.state.widgets})
                )
            )
        )
    }
})

/**
 * Contributions Section
 */

var QContributions=React.createClass({displayName: "QContributions",
    render:function()
    {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {name: "Contributions/Questions"}), 
                React.createElement("div", {className: "row"}, 
                    React.createElement(CustomTable, {title: "Contributed Questions", link: "Game/tables/data1.json", 
                        headers: ['question','answer'], 
                        dimensions: "col-sm-8 col-md-8 col-lg-8 col-xs-12"}), 
                    React.createElement(FilterForm, {dimensions: "col-sm-4 col-md-4 col-lg-4 col-xs-12"})
                )
            )
        )
    }
});

var SContributions=React.createClass({displayName: "SContributions",
    render:function()
    {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {name: "Contributions/Suggestions"}), 
                React.createElement("div", {className: "row"}, 
                    React.createElement(CustomTable, {title: "Contributed Questions", link: "Game/tables/data2.json", 
                        headers: ['GameTag','Money'], 
                        dimensions: "col-sm-12 col-md-12 col-lg-12 col-xs-12"})
                )
            )
        )
    }
});

/**
 * About Widgets
 */

var ModsForm=React.createClass({displayName: "ModsForm",
    render:function()
    {
        return (
        React.createElement("div", {className: this.props.dimensions}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "question"}, "Modification"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "mod", name: "mod", type: "text", placeholder: "Mod", className: "form-control"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Real"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("textarea", {className: "form-control", id: "real", name: "real", placeholder: "Reality", rows: "3"})
                                )
                            ), 

                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Changes"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("textarea", {className: "form-control", id: "changes", name: "changes", placeholder: "Changes", rows: "3"})
                                )
                            ), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, "Add")
                                )
                            )
                        )
						)
                )
        )
    }
});

var CreditForm=React.createClass({displayName: "CreditForm",
    render:function()
    {
        return (
        React.createElement("div", {className: this.props.dimensions}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "project"}, "Project"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "project", name: "project", type: "text", placeholder: "project", className: "form-control"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Website"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                     React.createElement("input", {id: "website", name: "website", type: "text", placeholder: "website", className: "form-control"})
                                )
                            ), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, "Add")
                                )
                            )
                        )
						)
                )
        )
    }
});

var GuideForm=React.createClass({displayName: "GuideForm",
    render:function()
    {
        return (
        React.createElement("div", {className: this.props.dimensions}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "title"}, "Title"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "project", name: "project", type: "text", placeholder: "project", className: "form-control"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "content"}, "Content"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                     React.createElement("textarea", {className: "form-control", id: "changes", name: "changes", placeholder: "Chnages", rows: "7"})
                                )
                            ), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, "Add")
                                )
                            )
                        )
						)
                )
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
var InputItem=React.createClass({displayName: "InputItem",
    mixins:[Input],
    render:function()
    {
        return(
            React.createElement("div", {className: this.props.dimensions}, 
				React.createElement("div", {className: "panel panel-primary"}, 
                React.createElement("div", {className: "input-group"}, 
                    React.createElement("input", {ref: "box", type: "text", className: "form-control input-md", placeholder: "Inspect Contribution", disabled: true}), 
                    React.createElement("span", {className: "input-group-btn"}, 
                        React.createElement("button", {type: "button", 
                            className: (this.state.editing) ? "btn btn-primary btn-md  glyphicon glyphicon-floppy-disk" : " btn btn-primary btn-md  glyphicon glyphicon-pencil", 
                            onClick: (this.state.editing) ? this.save :this.edit})
                    )
				)
                )
            )
            )
       
    }
});
var GameInfoBox=React.createClass({displayName: "GameInfoBox",
    mixins:[Input],
    render:function()
    {
        return (
            React.createElement("div", {className: "panel panel-primary"}, 
            React.createElement("div", {className: "form-group"}, 
                    React.createElement("textarea", {ref: "box", className: "form-control", id: "message", name: "message", placeholder: "Answer", rows: "11", disabled: true}), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("div", {className: "col-md-12 widget-right"}, 
                        React.createElement("button", {type: "button", 
                         className: (this.state.editing) ? "btn btn-primary btn-md pull-right glyphicon glyphicon-floppy-disk" : " btn btn-primary btn-md pull-right glyphicon glyphicon-pencil", 
                         onClick: (this.state.editing) ? this.save :this.edit})
                    )
                )
            )
            )
        )
    }
});

var SimpleTable=React.createClass({displayName: "SimpleTable",
    render:function()
    {
        return(
			React.createElement("div", {className: this.props.dimensions}, 
						React.createElement("table", {"data-toggle": "table", "data-url": this.props.link, "data-search": "true", 
                              "data-pagination": "true", "data-sort-question": "question", "data-sort-order": "desc", 
                              "data-select-item-name": "toolbar1", 
                              "data-show-refresh": "true", "data-show-toggle": "true", "data-show-columns": "true", "data-select-item-name": "toolbar1"
                              }, 
						    React.createElement("thead", null, 
						    React.createElement("tr", null, 
						        React.createElement("th", {"data-field": "state", "data-checkbox": "true"}, "ID"), 
                                
                                     this.props.headers.map(function(header,index){
                                       return(
                                        React.createElement("th", {"data-field": header, key: index, "data-sortable": "true"}, header)
                                     )
                                })
                                
						    )
						    )
						)
			)
        )
    }
});
var About=React.createClass({displayName: "About",
    render:function()
    {
        return(
            React.createElement("div", null, 
            React.createElement(Header, {name: "About"}), 
                React.createElement("div", {className: "panel panel-default"}, 
                React.createElement("div", {className: "panel-body tabs"}, 
                
                    React.createElement("ul", {className: "nav nav-pills"}, 
                        React.createElement("li", {className: "active"}, React.createElement("a", {href: "#about-game", "data-toggle": "tab"}, "Game")), 
                        React.createElement("li", null, React.createElement("a", {href: "#about-mods", "data-toggle": "tab"}, "Modifications")), 
                        React.createElement("li", null, React.createElement("a", {href: "#about-credits", "data-toggle": "tab"}, "Credits")), 
                        React.createElement("li", null, React.createElement("a", {href: "#about-guides", "data-toggle": "tab"}, "Guides"))
                    ), 
                    React.createElement("div", {className: "tab-content"}, 
                            /** about-game pane */
							React.createElement("div", {className: "tab-pane fade ", id: "about-game"}, 
                              /** About game info */
                                    React.createElement("div", {className: "row"}, 
                                            React.createElement("div", {className: "col-sm-5"}, 
                                            React.createElement(GameInfoBox, {dimensions: ""})
                                            ), 
                                            React.createElement("div", {className: "col-sm-7"}, 
                                                React.createElement(InputItem, {dimensions: "col-sm-12"}), 
                                                React.createElement(InputItem, {dimensions: "col-sm-12"}), 
                                                React.createElement(InputItem, {dimensions: "col-sm-12"}), 
                                                React.createElement(InputItem, {dimensions: "col-sm-12"}), 
                                                React.createElement(InputItem, {dimensions: "col-sm-12"}), 
                                                React.createElement(InputItem, {dimensions: "col-sm-12"})
                                            )
                                    )
                             ), 

                              /** ./About game pane */
                             
                             /** about-game pane */
                            React.createElement("div", {className: "tab-pane fade in active ", id: "about-mods"}, 
                                React.createElement("div", {className: "row"}, 
                                 React.createElement(SimpleTable, {title: "Modifications", link: "Game/tables/data1.json", 
                                    headers: ['question','answer'], 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                                  React.createElement(ModsForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12"})
                                )
                            
                            ), 
                            React.createElement("div", {className: "tab-pane fade ", id: "about-credits"}, 
                                 React.createElement("div", {className: "row"}, 
                                 React.createElement(SimpleTable, {title: "Credits", link: "Game/tables/data1.json", 
                                    headers: ['question','answer'], 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                                  React.createElement(CreditForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12"})
                                )
                            ), 
                            React.createElement("div", {className: "tab-pane fade ", id: "about-guides"}, 
                                 React.createElement("div", {className: "row"}, 
                                 React.createElement(SimpleTable, {title: "Credits", link: "Game/tables/data1.json", 
                                    headers: ['question','answer'], 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                                  React.createElement(GuideForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12"})
                                )
                            )
                    )

                 )
		
            )
            )

        )
        
    }
});


/**
 * Admins widgets
 */
var AdminForm=React.createClass({displayName: "AdminForm",
    render:function()
    {
        return (
                React.createElement("div", {className: this.props.dimensions}, 
                React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading", dangerouslySetInnerHTML: useSvg("plus-sign","plus-sign","Add Admin")}), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "question"}, "Username"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "username", name: "username", type: "text", placeholder: "Username", className: "form-control"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Password"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                     React.createElement("input", {id: "password", name: "password", type: "text", placeholder: "", className: "form-control"})
                                )
                            ), 

                             React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Type"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                     React.createElement("select", {id: "type", name: "type", type: "text", placeholder: "", className: "form-control"}, 
                                        React.createElement("option", {value: "super"}, "Super"), 
                                        React.createElement("option", {value: "Standard"}, "Standard")
                                     )
                                )
                            ), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, "Add ")
                                )
                            )
                        )
						)
					)
				)
                )
        )
    }
});
var AdminsBox=React.createClass({displayName: "AdminsBox",
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
            React.createElement("div", null, 
                React.createElement(Header, {name: "Admins"}), 
                React.createElement("div", {className: "row"}, 
                React.createElement(CustomTable, {title: "Admins", link: "Game/tables/data1.json", 
                                    headers: ['question','answer'], 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                 React.createElement(AdminForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12"})
                 )
            )
        )
    }
})

/**
 * profile widgets
 */
var SettingsForm=React.createClass({displayName: "SettingsForm",
    render:function()
    {
        return(
            React.createElement("div", {className: this.props.dimensions}, 
                React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading", dangerouslySetInnerHTML: useSvg("monitor","monitor","Update Info")}), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "firstname"}, "Firstname"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "firstname", name: "firstname", type: "text", placeholder: "firstname", className: "form-control"})
                                )
                            ), 

                             React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "firstname"}, "surname"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "firstname", name: "firstname", type: "text", placeholder: "surname", className: "form-control"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Password"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                     React.createElement("input", {id: "password", name: "password", type: "text", placeholder: "", className: "form-control"})
                                )
                            ), 

                            
                             React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "firstname"}, "Email"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {id: "firstname", name: "firstname", type: "text", placeholder: "surname", className: "form-control"})
                                )
                            ), 


                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, "update")
                                )
                            )
                        )
						)
					)
				)
                )
        )
    }
})
var SettingsBox=React.createClass({displayName: "SettingsBox",
    render:function(){
        return(
            React.createElement("div", null, 
                React.createElement(Header, {name: "Settings"}), 
                React.createElement(SettingsForm, {dimensions: "col-sm-6 col-smd-6 col-lg-6 col-xs-12"})
            )
        )
    }
})
/**
 * render the components
 */
ReactDOM.render(React.createElement(Dashboard, null),document.getElementById("ds-section"));
ReactDOM.render(React.createElement(QuestionSection, null),document.getElementById("qn-section"));
ReactDOM.render(React.createElement(StatSection, null),document.getElementById("stat-section"));
ReactDOM.render(React.createElement(ScoreSection, null),document.getElementById("score-section"));
ReactDOM.render(React.createElement(QContributions, null),document.getElementById("Q-contrib-section"));
ReactDOM.render(React.createElement(SContributions, null),document.getElementById("S-contrib-section"));
ReactDOM.render(React.createElement(About, null),document.getElementById("about-section"));
ReactDOM.render(React.createElement(AdminsBox, null),document.getElementById("admin-section"));
ReactDOM.render(React.createElement(SettingsBox, null),document.getElementById("settings-section"));