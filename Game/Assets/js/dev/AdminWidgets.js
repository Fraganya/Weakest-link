"use strict"
/**
 * Adminstartion page script
 * @author Francis Ganya
 */
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

/**
 * Filter form for the questions section
 */
var FilterForm=React.createClass({
    getInitialState:function()
    {
        return {step:'get',id:""}
    },
    getDefaultProps:function()
    {
        return{ 
            saveURL:"./?controller=questions&method=add",
            getURL:"./?controller=contributions&method=question",
            removeLink:"./?controller=contributions&method=removeQuestion"
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
           <div className={this.props.dimensions}>
				<div className="panel panel-primary">
				<div className="panel-heading dark-overlay" dangerouslySetInnerHTML={useSvg("monitor","monitor","Inspect Contribution")} />
                 <div className="panel-body">
					<p>Enter ID</p>
                 </div>
                <div className="panel-footer">
                <div className="input-group">
                    <input id="filter-box" type="text" value={this.state.id} onChange={this.handleChange} className="form-control input-md" placeholder="Inspect Contribution" />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-primary btn-md" onClick={this.getData}>Inspect</button>
                    </span>
                </div>
				</div>
                </div>
            </div>
        )
          
    },
    add:function()
    {
         var sendData=new Promise(function(done){
            $.post(this.props.saveURL,{
                question:this.refs.qBox.value,
                answer:this.refs.ansBox.value,
                tag:this.refs.tagBox.value,
                category:this.refs.catBox.value
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
                $.post(this.props.removeLink,{id:this.state.id},function(data,status){
                    if(data=='true'){
                        done();
                    }
                });
            }.bind(this))
        }.bind(this)).then(function(){
             this.setState({step:"init",id:''});
        }.bind(this))
    },
    // gets the data from the server using the supplied Question ID
    getData:function()
    {
        if($("#filter-box").val().trim().length==0){
            $("#filter-box").addClass('animated shake validation-error');
            return ;
        }
        $("#filter-box").removeClass('animated shake validation-error');
        var getData=new Promise(function(done){
            $.post(this.props.getURL,{id:this.state.id},function(data,status){
                if(data!='false'){
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
                }
            })
        }.bind(this));

        getData.then(function(data){
            this.setState({step:"gotten-data"});
            this.refs.qBox.value=data.question;
            this.refs.ansBox.value=data.answer;
        }.bind(this));
    },
    // render a new form for modifying the data
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
                                    <input ref="qBox" placeholder="Question" className="form-control" />
                                </div>
                            </div>
    
                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="answer">Answer</label>
                                <div className="col-md-9">
                                    <textarea ref="ansBox"className="form-control" id="message" name="message" placeholder="Answer" rows="5"></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="tag">Tag</label>
                                <div className="col-md-9">
                                    <input ref="tagBox" type="text" placeholder="tag" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="tag">Category</label>
                                <div className="col-md-9">
                                    <input ref="catBox" type="text" placeholder="category" className="form-control" />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="button" className="btn btn-primary btn-md pull-right" onClick={this.add}>Add To Main DB </button>
                                    <button type="button" className="btn btn-primary btn-md pull-right" style={{marginRight:3+'px'}}onClick={this.reset}>Cancel </button>
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
/**
 * Advanced form components
 * takes field objects and builds up form fields
 */
var AdvancedForm=React.createClass({
    render:function()
    {
        return (
                <div className={this.props.dimensions}>
                <div className="panel panel-default">
					<div className="panel-heading" dangerouslySetInnerHTML={this.props.headerFnx()} />
					<div className="panel-body">
						<form className="form-horizontal" action="" method="post">
                        <fieldset>    
                        {
                            this.props.fields.map(function(field,index){
                                if(field.tag==="input")
                                {
                                    return(
                                        <div className="form-group" key={index}>
                                            <label className="col-md-3 control-label" htmlFor={field.name}>{field.name}</label>
                                            <div className="col-md-9">
                                                <input  type={field.type} placeholder={field.holder} className="form-control" />
                                            </div>
                                        </div>
                                    )
                                }
                                else if(field.tag==="textarea")
                                {
                                    return(
                                        <div className="form-group" key={index}>
                                                <label className="col-md-3 control-label" htmlFor={field.name}>{field.name}</label>
                                                <div className="col-md-9">
                                                    <textarea className="form-control" placeholder={field.holder} rows={field.rows}></textarea>
                                                </div>
                                        </div>
                                    )
                                }
                                else if(field.tag==="select")
                                {
                                    return (
                                        <div className="form-group" key={index}>
                                            <label className="col-md-3 control-label" htmlFor={field.name}>{field.name}</label>
                                            <div className="col-md-9">
                                                <select  type="text" placeholder="" className="form-control" >
                                                    {
                                                        field.options.map(function(option,index){
                                                            return(
                                                                <option value={option.value} key={index}>{option.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                            
                                    )
                                }
                            })

                        }
                            
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="submit" className="btn btn-primary btn-md pull-right">{this.props.btnCaption}</button>
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
/**
 * Rate chart components - renders a chart 
 */
var RateChart=React.createClass({
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
        
        else if(this.props.type==="bar")
        {
            return(
                    <div className={this.props.dimensions}>
                        <div className="panel panel-default">
                            <div className="panel-heading">{this.props.name}</div>
                            <div className="panel-body">
                                <div className="canvas-wrapper">
                                    <canvas className={this.props.classes}  id={this.props.idName} height="200" width="600"></canvas>
                                </div>
                            </div>
                             </div>
                    </div>
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

/**
 * prints card widgets
 * 
 */
var WidgetList=React.createClass({
    render:function()
    {
        return (
            <div className="row">
            {
                this.props.widgets.map(function(widget,index){
                    return (
                        <div className="col-xs-12 col-md-6 col-lg-3" key={index}> {/**second widget game contributions */}
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


/**
 * the Dashboard component
 */
var Dashboard=React.createClass({
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
                {name:"gameCount",count:0,description:"Games played",color:"blue",icon:"chain",xLink:"chain"},
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
            <div>
               <Header name="Dashboard"/>
                {/** WKL counter widgets */}
                <WidgetList widgets={this.state.widgets} />
                <div className="row">
                <RateChart type="line" idName="line-chart" name="Rating - (Dummy stats)" classes="main-chart" dimensions="col-lg-8 col-sm-md-8 col-sm-8 col-xs-12"/>
                </div>
            </div>
        )
    }
});

/**
 * Question section components
 */

/**
 * prints a custom round panel with a percentage
 */
var CustomPanel=React.createClass({  
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
            <div className="col-xs-12 col-md-12 col-lg-12">
				<div className="panel panel-default">
					<div className="panel-body easypiechart-panel">
						<h4>{this.props.tag}</h4>
						<div className="easypiechart" id={this.props.id} data-percent={this.props.percent} ><span className="percent">{this.props.percent}%</span>
						</div>
					</div>
				</div>
			</div>
        )
        
    }
});

/** Questions section tab pane structure */
var QuestionSection=React.createClass({
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
        return {panels:[]}
    },
    render:function()
    {
        return(
            <div>
                <Header name="Questions"/>
                {/** main question components */}
                <div className="row">
                <CustomTable title="Questions in DB" link={this.props.q_link}
                     headers={['id','question','answer',"last_accessed"]}
                     dimensions="col-lg-9 col-md-9 col-sm-9 col-xs-12" />
                 <div className="col-sm-3 col-lg-3 col-md-3">
                 {
                     this.state.panels.map(function(panel,index){
                         return(
                             <CustomPanel key={index} id={panel.id} percent={panel.count} tag={panel.text} color={panel.color}/>
                         )
                     })
                 }
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
    getDefaultProps:function(){
        return {    
            g_link:"./?controller=game&method=get_all",
            g_schema:['tag','players','money']
        }
    },
    render:function()
    {
        return(
           <div>
             <Header name="Statistics" />
             <div className="row">
               <CustomTable title="Games Played" link={this.props.g_link}
                        headers={this.props.g_schema}
                        dimensions="col-sm-12 col-md-12 col-lg-12 col-xs-12"/>
            </div>
                
           </div>
        )
    }
});

/**
 * Score section components
 */

var ScoreSection=React.createClass({
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
            <div>
                <Header name="Scores" />
                <div className="row">
                <CustomTable title="Scores" link={this.props.g_link}
                            headers={this.props.g_schema}
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
/** question contributions */
var QContributions=React.createClass({
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
            <div>
                <Header name="Contributions/Questions" />
                <div className="row">
                    <CustomTable title="Contributed Questions" link={this.props.q_link}
                        headers={this.props.q_schema}
                        dimensions="col-sm-8 col-md-8 col-lg-8 col-xs-12"/>
                    <FilterForm dimensions="col-sm-4 col-md-4 col-lg-4 col-xs-12" />
                </div>
            </div>
        )
    }
});

/** suggestion contributions */
var SContributions=React.createClass({
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
            <div>
                <Header name="Contributions/Suggestions" />
                <div className="row">
                    <CustomTable title="Contributed Questions" link={this.props.s_link}
                        headers={this.props.s_schema}
                        dimensions="col-sm-12 col-md-12 col-lg-12 col-xs-12"/>
                </div>
            </div>
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
var StandardForm=React.createClass({
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
        <div className={this.props.dimensions}>
						<form className="form-horizontal" action="" method="post">
                        <fieldset>  
                        {
                              this.props.fields.map(function(field,index){
                                  if(field.tag==="input")
                                  {
                                     return(
                                       <div className="form-group" key={index}>
                                            <label className="col-md-3 control-label" htmlFor={field.name}>{field.name}</label>
                                            <div className="col-md-9">
                                                <input  type={field.type }id={field.name+"-input"} placeholder={field.holder} className={"form-control "+valClass} />
                                            </div>
                                        </div>
                                     )
                                  }
                                  else if(field.tag==="textarea")
                                  {
                                      return (
                                            <div className="form-group" key={index}>
                                                <label className="col-md-3 control-label" htmlFor={field.name}>{field.name}</label>
                                                <div className="col-md-9">
                                                    <textarea className={"form-control "+valClass} id={field.name+"-input"} placeholder={field.holder} rows={field.rows}></textarea>
                                                </div>
                                            </div>
                                      )
                                  }
                                 
                             })
                             }                              
                            <div className="form-group">
                                <div className="col-md-12 widget-right">
                                    <button type="button" className="btn btn-primary btn-md pull-right" onClick={this.add}>Add</button>
                                </div>
                            </div>
                        </fieldset>
						</form>
                </div>
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
var InputItem=React.createClass({
    mixins:[Input],
    render:function()
    {
        return(
            <div className={this.props.dimensions}>
				<div className="panel panel-primary">
                <div className="input-group">
                    <input ref="box" type="text" onChange={this.handleChange} className="form-control input-md" value={this.state.boxInfo} disabled/>
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

/**a child class of the Input component for rendering multi  line info fields - esp game info */
var GameInfoBox=React.createClass({
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
            <div className="panel panel-primary">
            <div className="form-group">
                    <textarea ref="box" className="form-control" onChange={this.handleChange} value={this.state.boxInfo} rows="11" disabled/>
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

/** simple table component with no panel wrappers */
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

/**
 * About component - about tanle pane
 */
var About=React.createClass({
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
							<div className="tab-pane fade in active  " id="about-game">
                              {/** About game info */}
                                    <div className="row">
                                            <div className="col-sm-5">
                                            <GameInfoBox   getURL={this.props.infoURL} field="info" />
                                            </div>
                                            <div className="col-sm-7">
                                            {
                                                this.state.inputs.map(function(input,index){
                                                    return(
                                                       <InputItem key={index} dimensions="col-sm-12" field={input.field} data={input.data} /> 
                                                    )
                                                })
                                            }
                                            </div>
                                    </div>
                             </div>

                              {/** ./About game pane */}
                             
                             {/** about-game pane */}
                            <div className="tab-pane fade " id="about-mods">
                                <div className="row">
                                 <SimpleTable title="Modifications" link={this.props.m_link}
                                    headers={this.props.modHeaders}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                                  <StandardForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12" valClass="m_input" saveLink={this.props.m_save_link} fields={this.props.modsFormSchema} />
                                </div>
                            
                            </div>
                            <div className="tab-pane fade " id="about-credits">
                                 <div className="row">
                                 <SimpleTable title="Credits" link={this.props.c_link}
                                    headers={this.props.creditSchema}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                                 <StandardForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12" saveLink={this.props.c_save_link} valClass="c_form" fields={this.props.creditFormSchema} />
                                </div>
                            </div>
                            <div className="tab-pane fade " id="about-guides">
                                 <div className="row">
                                 <SimpleTable title="Credits" link={this.props.g_link}
                                    headers={this.props.guideSchema}
                                    dimensions="col-sm-7 col-md-7 col-lg-7 col-xs-12"/>
                                  <StandardForm dimensions="col-sm-5 col-md-5 col-lg-5 col-xs-12" saveLink={this.props.g_save_link} valClass="g_form" fields={this.props.guideFormSchema} />
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
 * render the components
 */
ReactDOM.render(<Dashboard />,document.getElementById("ds-section"));
ReactDOM.render(<QuestionSection />,document.getElementById("qn-section"));
ReactDOM.render(<StatSection />,document.getElementById("stat-section"));
ReactDOM.render(<ScoreSection />,document.getElementById("score-section"));
ReactDOM.render(<QContributions />,document.getElementById("Q-contrib-section"));
ReactDOM.render(<SContributions />,document.getElementById("S-contrib-section"));
ReactDOM.render(<About />,document.getElementById("about-section"));
