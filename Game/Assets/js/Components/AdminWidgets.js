"use strict"
/**
 * Adminstartion page script
 * @author Francis Ganya
 */


function validate(inputTag){
     var arr=$(inputTag);
        var errors=0;
        arr.map(function(index,input){
            if(input.value.trim().length==0){
                $(this).addClass('animated shake validation-error');
                errors++;
            }
        });

        setTimeout(function() {
            $(inputTag).removeClass('animated shake validation-error');
        }.bind(this), 1500);

        if(errors!=0) return false; 
        return true;
}
/**
 * returns a formated svg tag
 * @param svgTag - the tag to use in the svg class 
 * @param xlinkTag the tag to use in the xlink href
 */
function useSvg(svgTag,xlinktag,extr)
{
        var useTag='<svg class="glyph stroked "'+svgTag+'">'+'<use xlink:href="#stroked-'+xlinktag+'"></use></svg>';
        useTag+=(extr) ? extr : '';
        return { __html:useTag }
}

/**
 * header components
 * prints header info for the current tab pane
 */
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

/**
 * Filter form for the questions section
 */
var FilterForm=React.createClass({displayName: "FilterForm",
    getInitialState:function()
    {
        return {step:'get',id:""}
    },
    getDefaultProps:function()
    {
        return{ 
            saveURL:"./?controller=questions&method=add",
            getURL:"./?controller=contributions&method=question",
            removeLink:"./?controller=contributions&method=removeQuestion",
            btnText:"+ DB",mainHeader:"Inspect Contribution"
        }
    },
    reset:function()
    {
        this.setState({step:'init'});
    },
    handleChange:function()
    {
        var val=$("#filter-box").val();
        this.setState({id:val});
    },
    // render the initial form for entering the question ID
    getForm:function()
    {
        return (
           React.createElement("div", {className: this.props.dimensions}, 
				React.createElement("div", {className: "panel panel-primary"}, 
				React.createElement("div", {className: "panel-heading dark-overlay", dangerouslySetInnerHTML: useSvg("monitor","monitor",this.props.mainHeader)}), 
                 React.createElement("div", {className: "panel-body"}, 
					React.createElement("p", null, "Enter ID")
                 ), 
                React.createElement("div", {className: "panel-footer"}, 
                React.createElement("div", {className: "input-group"}, 
                    React.createElement("input", {id: "filter-box", type: "text", value: this.state.id, onChange: this.handleChange, className: "form-control input-md", placeholder: "Inspect"}), 
                    React.createElement("span", {className: "input-group-btn"}, 
                        React.createElement("button", {type: "button", className: "btn btn-primary btn-md", onClick: this.getData}, "inspect"), 
                         React.createElement("button", {type: "button", className: "btn btn-danger btn-md", onClick: this.deleteQ}, "delete")
                    )
                )
				)
                )
            )
        )
          
    },
    fix:function()
    {
        var qBoxContent=this.refs.qBox.value;
        var aBoxContent=this.refs.ansBox.value;

        while(qBoxContent.lastIndexOf("\"")!=-1){
            qBoxContent=qBoxContent.replace("\"","'");
        }

        while(aBoxContent.lastIndexOf("\"")!=-1){
            aBoxContent=aBoxContent.replace("\"","'");
        }

        this.refs.qBox.value=qBoxContent;
        this.refs.ansBox.value=aBoxContent;
    },
    deleteQ:function(){
        if(!validate("#filter-box")) return;
        var removeQ=new Promise(function(done){
             $.post(this.props.removeLink,{id:this.state.id},function(data,status){
                if(data=='true'){
                   done();
                }
                else{
                    console.error("Error"+data)
                     $("#filter-box").addClass("validation-error");
                }
            })
        }.bind(this));

        removeQ.then(function(){
           $("#filter-box").val('');
           this.setState({step:"init",id:''});
        }.bind(this));
    },
    add:function()
    {
      
        if(!validate(".q-inspect-input")) return
         var sendData=new Promise(function(done){
            $.post(this.props.saveURL,{ 
                question:this.refs.qBox.value,
                answer:this.refs.ansBox.value,
                tag:this.refs.tagBox.value,
                category:this.refs.catBox.value,
                id:(this.props.formCat=="main-DB") ? this.state.id :''
            },function(data,status){
                if(data==='true'){
                    done();
                }
                else{
                    console.error("Something went wrong");
                    console.error(data);
                }
            })
        }.bind(this));

        sendData.then(function(){
            return new Promise(function(done){
                if(this.props.formCat!="main-DB"){
                    $.post(this.props.removeLink,{id:this.state.id},function(data,status){
                    if(data=='true'){
                        done();
                    }
                 });
                }
                else{
                    done();
                }
                
                
            }.bind(this))
        }.bind(this)).then(function(){
             this.setState({step:"init",id:''});
        }.bind(this))
    },
    // gets the data from the server using the supplied Question ID
    getData:function()
    {
        if(!validate("#filter-box")) return ;
        var getData=new Promise(function(done){
            $.post(this.props.getURL,{id:this.state.id},function(data,status){
                if(data!='false' && data.trim().length!=0){
                   try{
                       var data=JSON.parse(data);
                        $("#filter-box").removeClass("validation-error");
                    done(data);
                    }
                    catch(e){
                    console.error("Something went wrong");
                    console.error(data);
                    $("#filter-box").addClass("validation-error");
                }
                }
                else{
                    console.error("Error"+data)
                    $("#filter-box").addClass("validation-error");
                }
            })
        }.bind(this));

        getData.then(function(data){
            this.setState({step:"gotten-data"});
            if(this.props.formCat!="main-DB"){
                this.refs.qBox.value=data.question;
                this.refs.ansBox.value=data.answer;
            }
            if(this.props.formCat=="main-DB"){
                this.refs.qBox.value=data[0].question;
                this.refs.ansBox.value=data[0].answer;
                this.refs.tagBox.value=data[0].tag;
                this.refs.catBox.value=data[0].cat
            }
        }.bind(this));
    },
    // render a new form for modifying the data
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
                                    React.createElement("textarea", {ref: "qBox", placeholder: "Question", className: "form-control q-inspect-input", rows: "5"})
                                )
                            ), 
    
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "answer"}, "Answer"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {ref: "ansBox", className: "form-control q-inspect-input", id: "message", name: "message", placeholder: "Answer"})
                                )
                            ), 

                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "tag"}, "Tag"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("select", {ref: "tagBox", type: "text", placeholder: "tag", className: "form-control q-inspect-input"}, 
                                        React.createElement("option", {value: "easy"}, "Easy"), 
                                        React.createElement("option", {value: "medium"}, "Medium"), 
                                        React.createElement("option", {value: "brainy"}, "Brainy")
                                    )
                                )
                            ), 

                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: "tag"}, "Category"), 
                                React.createElement("div", {className: "col-md-9"}, 
                                    React.createElement("input", {ref: "catBox", type: "text", list: "cats", placeholder: "category", className: "form-control q-inspect-input"}), 
                                    React.createElement("datalist", {id: "cats"}, 
                                         React.createElement("option", {value: "computers"}), 
                                         React.createElement("option", {value: "sports"}), 
                                         React.createElement("option", {value: "food"}), 
                                         React.createElement("option", {value: "animals"}), 
                                         React.createElement("option", {value: "General Knowledge"})
                                    )
                                )
                            ), 
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-success btn-md pull-right", onClick: this.add}, this.props.btnText), 
                                    React.createElement("button", {type: "button", className: "btn btn-primary btn-md pull-right", style: {marginRight:3+'px'}, onClick: this.reset}, "Cancel "), 
                                    React.createElement("button", {type: "button", className: "btn btn-danger btn-md pull-right", style: {marginRight:3+'px'}, onClick: this.fix}, "fix ")
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
/**
 * Advanced form components
 * takes field objects and builds up form fields
 */
var AdvancedForm=React.createClass({displayName: "AdvancedForm",
    render:function()
    {
        return (
                React.createElement("div", {className: this.props.dimensions}, 
                React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading", dangerouslySetInnerHTML: this.props.headerFnx()}), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                        
                            this.props.fields.map(function(field,index){
                                if(field.tag==="input")
                                {
                                    return(
                                        React.createElement("div", {className: "form-group", key: index}, 
                                            React.createElement("label", {className: "col-md-3 control-label", htmlFor: field.name}, field.name), 
                                            React.createElement("div", {className: "col-md-9"}, 
                                                React.createElement("input", {type: field.type, placeholder: field.holder, className: "form-control"})
                                            )
                                        )
                                    )
                                }
                                else if(field.tag==="textarea")
                                {
                                    return(
                                        React.createElement("div", {className: "form-group", key: index}, 
                                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: field.name}, field.name), 
                                                React.createElement("div", {className: "col-md-9"}, 
                                                    React.createElement("textarea", {className: "form-control", placeholder: field.holder, rows: field.rows})
                                                )
                                        )
                                    )
                                }
                                else if(field.tag==="select")
                                {
                                    return (
                                        React.createElement("div", {className: "form-group", key: index}, 
                                            React.createElement("label", {className: "col-md-3 control-label", htmlFor: field.name}, field.name), 
                                            React.createElement("div", {className: "col-md-9"}, 
                                                React.createElement("select", {type: "text", placeholder: "", className: "form-control"}, 
                                                    
                                                        field.options.map(function(option,index){
                                                            return(
                                                                React.createElement("option", {value: option.value, key: index}, option.name)
                                                            )
                                                        })
                                                    
                                                )
                                            )
                                        )
                            
                                    )
                                }
                            }), 

                        
                            
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "submit", className: "btn btn-primary btn-md pull-right"}, this.props.btnCaption)
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
/**
 * Rate chart components - renders a chart 
 */
var RateChart=React.createClass({displayName: "RateChart",
    componentDidMount:function(){
        if(this.props.type==="line")
        {
            var chart = document.getElementById(this.props.idName).getContext("2d");
            window.myLine= new Chart(chart).Line(lineChartData, {
                responsive: true
            });
        }else if(this.props.type==="bar"){
            var chart2 = document.getElementById("bar-chart").getContext("2d");
            window.myBar = new Chart(chart2).Bar(barChartData, {
                responsive : true
            });
        }

    },    
    render:function()
    {
        if(this.props.type==="line")
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
        
        else if(this.props.type==="bar")
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
    }
});

/**
 * table components
 * renders a table and requires 
 * @props link - the link to get the data from and
 * @props headers the headers to use when rendering the table
 */
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

/**
 * prints card widgets
 * 
 */
var WidgetList=React.createClass({displayName: "WidgetList",
    render:function()
    {
        return (
            React.createElement("div", {className: "row"}, 
            
                this.props.widgets.map(function(widget,index){
                    return (
                        React.createElement("div", {className: "col-xs-12 col-md-6 col-lg-3", key: index}, " ", /**second widget game contributions */
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


/**
 * the Dashboard component
 */
var Dashboard=React.createClass({displayName: "Dashboard",
    /** define links to get data from 
     * gc-link -game count link,
     * q_link - question count link
     * c_link - contributions count link
     * s_link -top score link
     * 
    */
    getDefaultProps:function()
    {
        return {
            gc_link:"./?controller=game&method=count",
            q_link:"./?controller=questions&method=count",
            c_link:"./?controller=contributions&method=count",
            s_link:"./?controller=game&method=topScore"

        }
    },
    /** define widgets */
    getInitialState:function()
    {
        return {
            widgets:[
                {name:"gameCount",count:0,description:"Game(s) played",color:"blue",icon:"chain",xLink:"chain"},
                {name:"questionCount",count:0,description:"Question(s)",color:"red",icon:"internal hard drive",xLink:"internal-hard-drive"},
                {name:"contribCount",count:0,description:"Contributions(+)",color:"teal",icon:"basket",xLink:"basket"},
                {name:"topScore",count:0,description:"is the top score",color:"teal",icon:"flag",xLink:"flag"}
            ]
        }
    },
    /** gets the components data */
    componentDidMount:function()
    {
        /**
         * Get widget data
         */
        var widgetsTmp=this.state.widgets;
        var updateGameCount=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.gc_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        widgetsTmp[0].count=gameData.count;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);

        //question count
        var updateQCount=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.q_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        widgetsTmp[1].count=gameData.count;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);
        
        //contributions count
         var updateContribCount=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.c_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        widgetsTmp[2].count=gameData.count;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);

        //update top score
        var updateTopScore=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.s_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        widgetsTmp[3].count=gameData.score;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);
    
    // update the component after all data requests have been completed
      updateGameCount().then(function(){
          return updateQCount();
      }).then(function(){
          return updateContribCount();
      }).then(function(){
          return updateTopScore();
      }).then(function(){
          this.setState({widgets:widgetsTmp});
      }.bind(this));
       


        
    },
    render:function()
    {
        return (
            React.createElement("div", null, 
               React.createElement(Header, {name: "Dashboard"}), 
                /** WKL counter widgets */
                React.createElement(WidgetList, {widgets: this.state.widgets}), 
                React.createElement("div", {className: "row"}, 
                React.createElement(RateChart, {type: "line", idName: "line-chart", name: "Rating - (Dummy stats)", classes: "main-chart", dimensions: "col-lg-8 col-sm-md-8 col-sm-8 col-xs-12"})
                )
            )
        )
    }
});

/**
 * Question section components
 */

/**
 * prints a custom round panel with a percentage
 */
var CustomPanel=React.createClass({displayName: "CustomPanel",  
    componentDidMount:function()
    {
        var color=this.props.color;
        $(function() {
            $("#"+this.props.id).easyPieChart({
                scaleColor: false,
                barColor:color
            });
         }.bind(this));

    },
    render:function(){
        return(
            React.createElement("div", {className: "col-xs-12 col-md-12 col-lg-12"}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-body easypiechart-panel"}, 
						React.createElement("h4", null, this.props.tag), 
						React.createElement("div", {className: "easypiechart", id: this.props.id, "data-percent": this.props.percent}, React.createElement("span", {className: "percent"}, this.props.percent, "%")
						)
					)
				)
			)
        )
        
    }
});

/** Questions section tab pane structure */
var QuestionSection=React.createClass({displayName: "QuestionSection",
    /**
     * defines links for getting data
     * question link ,question count link ,difficult question count link and maximum # of questions to be in DB
     */
    getDefaultProps:function()
    {
        return{
            q_link:"./?controller=Questions&method=all",
            qc_link:"./?controller=Questions&method=count",
            dc_link:"./?controller=Questions&method=brainy_count",
            getURL:"./?controller=questions&method=question",
            saveLink:"./?controller=Questions&method=update",
            removeLink:"./?controller=questions&method=remove",
            max:10000

        }
    },
    /** get the data to update the components */
    componentDidMount:function()
    {
        var q_count,d_count;
        // get question count
        var updateQcount=function(){
            return new Promise(function(done){
                 $.get(this.props.qc_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        q_count=gameData.count;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
            }.bind(this))
        }.bind(this);

        //get difficult question count
        var updateDcount=function(){
            return new Promise(function(done){
                 $.get(this.props.dc_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        d_count=gameData.count;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this))
        }.bind(this);

        //after all requests update the panels
        updateQcount().then(function(){
            return updateDcount()
        }).then(function(){
            //calculate the %s
           d_count=Math.floor((d_count/q_count)*100);
           q_count=(((q_count/this.props.max)*100)).toPrecision(1);
           var panelsT=[
               {count:q_count,text:"To Max Goal",color:"#f9243f",id:"q_bar"},
               {count:d_count,text:"Difficult",color:'#30a5ff',id:"d_bar"},
           ]
           this.setState({panels:panelsT});
        }.bind(this));

    },
    getInitialState:function()
    {
        return {panels:[],edit:false}
    },
    toggleEdit:function()
    {
        this.setState({edit:!this.state.edit});
    },
    render:function()
    {
        var aproRender=null;
        if(this.state.edit==false){
            aproRender=function(){
                 return this.state.panels.map(function(panel,index){
                         return(
                             React.createElement(CustomPanel, {key: index, id: panel.id, percent: panel.count, tag: panel.text, color: panel.color})
                         )
                     });
            }.bind(this);
        }
        else{
            aproRender=function(){
                return(
                    React.createElement(FilterForm, {formCat: "main-DB", getURL: this.props.getURL, saveURL: this.props.saveLink, 
                        removeLink: this.props.removeLink, mainHeader: "update", btnText: "update"})
                )
            }.bind(this);
        }
        return(
            React.createElement("div", null, 
                React.createElement(Header, {name: "Questions"}), 
                /** main question components */
                React.createElement("div", {className: "row"}, 
                React.createElement(CustomTable, {title: "Questions in DB", link: this.props.q_link, 
                     headers: ['id','question','answer',"cat","last_accessed"], 
                     dimensions: "col-lg-8 col-md-7 col-sm-8 col-xs-12"}), 
                 React.createElement("div", {className: "col-sm-3 col-lg-3 col-md-3"}, 
                       aproRender(), 
                 
                     React.createElement("button", {type: "button", className: "btn btn-primary", style: {marginRight:3+'px',marginLeft:20+'px'}, onClick: this.toggleEdit}, "Toggle Edit")
                   
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
    getDefaultProps:function(){
        return {    
            g_link:"./?controller=game&method=get_all",
            g_schema:['tag','players','money']
        }
    },
    render:function()
    {
        return(
           React.createElement("div", null, 
             React.createElement(Header, {name: "Statistics"}), 
             React.createElement("div", {className: "row"}, 
               React.createElement(CustomTable, {title: "Games Played", link: this.props.g_link, 
                        headers: this.props.g_schema, 
                        dimensions: "col-sm-12 col-md-12 col-lg-12 col-xs-12"})
            )
                
           )
        )
    }
});

/**
 * Score section components
 */

var ScoreSection=React.createClass({displayName: "ScoreSection",
    getDefaultProps:function(){
        return {    
            g_link:"./?controller=game&method=get_all",
            top_link:"./?controller=game&method=topScore",
            low_link:"./?controller=game&method=lowScore",
            g_schema:['tag','money']
        }
    },
    getInitialState:function()
    {
        return {
            widgets:[
                {count:0,description:"Top Score",color:"blue",icon:"chain",xLink:"chain"},
                {count:0,description:"Lowest Score",color:"red",icon:"arrow down",xLink:"arrow-down"}
            ]
     }
    },
    componentDidMount:function()
    {
        var widgetsTmp=this.state.widgets;
        var updateLowestScore=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.top_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        widgetsTmp[0].count=gameData.score;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);
        //update top score
        var updateTopScore=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.low_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        widgetsTmp[1].count=gameData.score;
                    }
                    catch(e){
                        console.log(e.toString());
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);
        
     updateTopScore().then(function(){
        return updateLowestScore()
     }).then(function(){
          this.setState({widgets:widgetsTmp});
      }.bind(this));
       
    },
    render:function()
    {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {name: "Scores"}), 
                React.createElement("div", {className: "row"}, 
                React.createElement(CustomTable, {title: "Scores", link: this.props.g_link, 
                            headers: this.props.g_schema, 
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
/** question contributions */
var QContributions=React.createClass({displayName: "QContributions",
    getDefaultProps:function(){
        return {  
            /** question link and table schema */  
            q_link:"./?controller=contributions&method=questions",
            q_schema:['id','question','answer']
        }
    },
    render:function()
    {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {name: "Contributions/Questions"}), 
                React.createElement("div", {className: "row"}, 
                    React.createElement(CustomTable, {title: "Contributed Questions", link: this.props.q_link, 
                        headers: this.props.q_schema, 
                        dimensions: "col-sm-8 col-md-8 col-lg-8 col-xs-12"}), 
                    React.createElement(FilterForm, {dimensions: "col-sm-4 col-md-4 col-lg-4 col-xs-12"})
                )
            )
        )
    }
});

/** suggestion contributions */
var SContributions=React.createClass({displayName: "SContributions",
   getDefaultProps:function(){
        return {   
            /** suggestion link and table schema */ 
            s_link:"./?controller=contributions&method=suggestions",
            s_schema:['about','added']
        }
    },
    render:function()
    {
        return (
            React.createElement("div", null, 
                React.createElement(Header, {name: "Contributions/Suggestions"}), 
                React.createElement("div", {className: "row"}, 
                    React.createElement(CustomTable, {title: "Contributed Questions", link: this.props.s_link, 
                        headers: this.props.s_schema, 
                        dimensions: "col-sm-12 col-md-12 col-lg-12 col-xs-12"})
                )
            )
        )
    }
});

/**
 * About Widgets
 */

/**
 * standard form component that has no panel wrapper
 * builds form fields
 */
var StandardForm=React.createClass({displayName: "StandardForm",
    add:function()
    {
        // validate
        var arr=$('.'+this.props.valClass);
        var errors=0;
        arr.map(function(index,input){
            if(input.value.trim().length==0){
                $(this).addClass('animated shake validation-error');
                errors++;
            }
        });

        setTimeout(function() {
            $('.'+this.props.valClass).removeClass('animated shake validation-error');
        }.bind(this), 1500);

        if(errors!=0) return;
        var data=[];
        var encapsulate=new Promise(function(done){
            this.props.fields.map(function(field,index){
                var fieldName=field.name;
                var val=$("#"+fieldName+"-input").val();
                data.push({value:val});
            }.bind(this));

            done();
        }.bind(this));

        encapsulate.then(function(){
          $.post(this.props.saveLink,{data},function(data,status){
              if(data=='true'){
                  $('.'+this.props.valClass).val('');
                  $('.'+this.props.valClass).removeClass("validation-error");
              }
              else{
                  $('.'+this.props.valClass).addClass("validation-error");
                  console.error("Something went wrong");
                  console.log(data);
              }
          }.bind(this))
        }.bind(this));
    },
    render:function()
    {
        var valClass=this.props.valClass;
        return (
        React.createElement("div", {className: this.props.dimensions}, 
						React.createElement("form", {className: "form-horizontal", action: "", method: "post"}, 
                        React.createElement("fieldset", null, 
                        
                              this.props.fields.map(function(field,index){
                                  if(field.tag==="input")
                                  {
                                     return(
                                       React.createElement("div", {className: "form-group", key: index}, 
                                            React.createElement("label", {className: "col-md-3 control-label", htmlFor: field.name}, field.name), 
                                            React.createElement("div", {className: "col-md-9"}, 
                                                React.createElement("input", {type: field.type, id: field.name+"-input", placeholder: field.holder, className: "form-control "+valClass})
                                            )
                                        )
                                     )
                                  }
                                  else if(field.tag==="textarea")
                                  {
                                      return (
                                            React.createElement("div", {className: "form-group", key: index}, 
                                                React.createElement("label", {className: "col-md-3 control-label", htmlFor: field.name}, field.name), 
                                                React.createElement("div", {className: "col-md-9"}, 
                                                    React.createElement("textarea", {className: "form-control "+valClass, id: field.name+"-input", placeholder: field.holder, rows: field.rows})
                                                )
                                            )
                                      )
                                  }
                                 
                             }), 
                             
                            React.createElement("div", {className: "form-group"}, 
                                React.createElement("div", {className: "col-md-12 widget-right"}, 
                                    React.createElement("button", {type: "button", className: "btn btn-primary btn-md pull-right", onClick: this.add}, "Add")
                                )
                            )
                        )
						)
                )
        )
    }
});

/** base input component */
var Input={
   getDefaultProps:function()
    {
        return {  
            // the link to use in updating this field
            saveLink:"./?controller=About&method=update",
        }
    },
   getInitialState:function()
    {
        return {editing:false,boxInfo:this.props.data}
    },
    edit:function()
    {
        this.refs.box.disabled=false;
        this.setState({editing:true})
    },
    save:function()
    {
        var sendUpdate=new Promise(function(done,failed){
            var newValue=this.refs.box.value;
            var thisField=this.props.field
            $.post(this.props.saveLink,{value: newValue,field:thisField},function(data,status){
                if(data=='true')  done()
                else{
                    console.log(data);
                    failed()
                }
            })
        }.bind(this));

        sendUpdate.then(function(){
            this.refs.box.disabled=true;
             this.setState({editing:false})
        }.bind(this)).catch(function(failed){
            console.error("Something went wrong and could not update");
        });
        
    },
    handleChange:function()
    {
        var value=this.refs.box.value;
        this.setState({boxInfo:value});
    }
}

/**a child class of the Input component for rendering single line info fields */
var InputItem=React.createClass({displayName: "InputItem",
    mixins:[Input],
    render:function()
    {
        return(
            React.createElement("div", {className: this.props.dimensions}, 
				React.createElement("div", {className: "panel panel-primary"}, 
                React.createElement("div", {className: "input-group"}, 
                    React.createElement("input", {ref: "box", type: "text", onChange: this.handleChange, className: "form-control input-md", value: this.state.boxInfo, disabled: true}), 
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

/**a child class of the Input component for rendering multi  line info fields - esp game info */
var GameInfoBox=React.createClass({displayName: "GameInfoBox",
    mixins:[Input],
    componentDidMount:function()
    {
        var getInfo=new Promise(function(done){
            var info=this.state.boxInfo;
            $.get(this.props.getURL,function(data,status){
                try{
                    var newInfo=JSON.parse(data);
                    info=newInfo.gameinfo;
                }
                catch(err){
                    console.log(e.toString())
                    console.log("Response :-->"+data);
                }
                done(info);
            })
        }.bind(this))

        getInfo.then(function(info){
            this.setState({boxInfo:info});
        }.bind(this))
    },
    render:function()
    {
        return (
            React.createElement("div", {className: "panel panel-primary"}, 
            React.createElement("div", {className: "form-group"}, 
                    React.createElement("textarea", {ref: "box", className: "form-control", onChange: this.handleChange, value: this.state.boxInfo, rows: "11", disabled: true}), 
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

/** simple table component with no panel wrappers */
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

/**
 * About component - about tanle pane
 */
var About=React.createClass({displayName: "About",
    getDefaultProps:function()
    {
        /** initialise defaul properties - 
         * form schemas for - modifications,credits and guides
         * data urls  
         */
        return{
            modsFormSchema:[
                {tag:"input",type:"text",name:"Modification",holder:"modification"},
                {tag:"textarea",name:"Real",holder:"Reality",rows:3},
                {tag:"textarea",name:"Changes",holder:"changes",rows:3}
            ],
            modHeaders:["mod","real","changes"],
            creditFormSchema:[
                {tag:"input",type:"text",name:"Project",holder:"project"},
                {tag:"input",type:"text",name:"Website",holder:"website"},
            ],
            creditSchema:["project","website"],
            guideFormSchema:[
                {tag:"input",type:"text",name:"Tile",holder:"tile"},
                {tag:"textarea",name:"Content",holder:"content",rows:5}
            ],
            guideSchema:["g_name","content"],
            infoURL:"./?controller=about&method=info",
            s_link:"./?controller=about&method=summary",
            d_link:"./?controller=about&method=credits",
            m_link:"./?controller=modifications&method=get",
            c_link:"./?controller=acknowledgements&method=get",
            g_link:"./?controller=guides&method=all",

            c_save_link:"./?controller=acknowledgements&method=add",
            g_save_link:"./?controller=guides&method=add",
            m_save_link:"./?controller=modifications&method=add",

        }
    },
    componentDidMount:function()
    {
        var inputTmp=this.state.inputs;
        //get summary info -version ,gamename and overview
        var getSummaryInfo=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.s_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        inputTmp.push({data:gameData.gamename,field:"gamename",});
                        inputTmp.push({data:gameData.version,field:"version"});
                        inputTmp.push({data:gameData.overview,field:"overview"});
                    }
                    catch(e){
                        console.log(e.toString());
                        console.log(data);
                    }
                 done();
            });
          }.bind(this));
        }.bind(this); 

        //get developer info - website and email
        var getDeveloperInfo=function(){
            return new Promise(function(done){
                // get games played
                $.get(this.props.d_link,function(data,status){
                    try{
                        var gameData=JSON.parse(data);
                        inputTmp.push({data:gameData.website,field:"website",});
                        inputTmp.push({data:gameData.email,field:"email"});
                    }
                    catch(e){
                        console.log(e.toString());
                        console.log(data);
                    }
                 done();
            });
          }.bind(this));
        }.bind(this);     

    //update after all data requests have completed
     getSummaryInfo().then(function(){
         return getDeveloperInfo();
     }).then(function(){
          this.setState({inputs:inputTmp});
      }.bind(this));
       
    },
    getInitialState:function()
    {
        return {inputs:[]}
    },
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
							React.createElement("div", {className: "tab-pane fade in active  ", id: "about-game"}, 
                              /** About game info */
                                    React.createElement("div", {className: "row"}, 
                                            React.createElement("div", {className: "col-sm-5"}, 
                                            React.createElement(GameInfoBox, {getURL: this.props.infoURL, field: "info"})
                                            ), 
                                            React.createElement("div", {className: "col-sm-7"}, 
                                            
                                                this.state.inputs.map(function(input,index){
                                                    return(
                                                       React.createElement(InputItem, {key: index, dimensions: "col-sm-12", field: input.field, data: input.data}) 
                                                    )
                                                })
                                            
                                            )
                                    )
                             ), 

                              /** ./About game pane */
                             
                             /** about-game pane */
                            React.createElement("div", {className: "tab-pane fade ", id: "about-mods"}, 
                                React.createElement("div", {className: "row"}, 
                                 React.createElement(SimpleTable, {title: "Modifications", link: this.props.m_link, 
                                    headers: this.props.modHeaders, 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                                  React.createElement(StandardForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12", valClass: "m_input", saveLink: this.props.m_save_link, fields: this.props.modsFormSchema})
                                )
                            
                            ), 
                            React.createElement("div", {className: "tab-pane fade ", id: "about-credits"}, 
                                 React.createElement("div", {className: "row"}, 
                                 React.createElement(SimpleTable, {title: "Credits", link: this.props.c_link, 
                                    headers: this.props.creditSchema, 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                                 React.createElement(StandardForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12", saveLink: this.props.c_save_link, valClass: "c_form", fields: this.props.creditFormSchema})
                                )
                            ), 
                            React.createElement("div", {className: "tab-pane fade ", id: "about-guides"}, 
                                 React.createElement("div", {className: "row"}, 
                                 React.createElement(SimpleTable, {title: "Credits", link: this.props.g_link, 
                                    headers: this.props.guideSchema, 
                                    dimensions: "col-sm-7 col-md-7 col-lg-7 col-xs-12"}), 
                                  React.createElement(StandardForm, {dimensions: "col-sm-5 col-md-5 col-lg-5 col-xs-12", saveLink: this.props.g_save_link, valClass: "g_form", fields: this.props.guideFormSchema})
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
 * render the components
 */
ReactDOM.render(React.createElement(Dashboard, null),document.getElementById("ds-section"));
ReactDOM.render(React.createElement(QuestionSection, null),document.getElementById("qn-section"));
ReactDOM.render(React.createElement(StatSection, null),document.getElementById("stat-section"));
ReactDOM.render(React.createElement(ScoreSection, null),document.getElementById("score-section"));
ReactDOM.render(React.createElement(QContributions, null),document.getElementById("Q-contrib-section"));
ReactDOM.render(React.createElement(SContributions, null),document.getElementById("S-contrib-section"));
ReactDOM.render(React.createElement(About, null),document.getElementById("about-section"));
