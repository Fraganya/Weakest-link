var SetupModal=React.createClass({displayName: "SetupModal",
getInitialState:function()
{
    return {step:'init'};
},
onStepInit:function()
{
    this.setState({playerCount:this.refs.playerNum.value});
    this.setState({gameDifficulty:this.refs.difficulty.value});
    this.setState({step:'get-names'});
},
buildFields:function(count)
{
    var fields='<form class="form-horizontal col-sm-12 col-xs-12>';
    for(var counter=0;counter<count;counter++)
    {
        fields+='<div class="section-label col-sm-12">Player '+(counter+1)+'</div';
        fields+='<div class="form-group" id="player-'+counter+'">';
        fields+='<div class="col-sm-4">';
        fields+='<input type="text" class="form-control col-sm-4" placeholder="First-name" />';
        fields+='</div>';
        fields+='<div class="col-sm-4">';
        fields+='<input type="text" class="form-control " placeholder="Surname" />';
        fields+='</div>';
        fields+='<div class="col-sm-4">';
        fields+='<input type="text" class="form-control " placeholder="Location e.g Blantyre" />';
        fields+='</div>';
        fields+='</div>';
    }
    fields+='</form>';
    return {__html :fields}
},
getInitialData:function()
{
    var playerNums=[1,4,5,6,7,8,9];
    var difficulties=['Easy','Medium','Brainy'];
    return(
        
        React.createElement("form", {className: "col-sm-6 col-xs-7"}, 
            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "number of players", className: ""}, "Players "), 
            React.createElement("select", {ref: "playerNum", className: "form-control"}, 
            playerNums.map(function(num,index){
                return(
                    React.createElement("option", {key: index, value: num}, num)
                ); 
            })
            )
            ), 

            React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: ""}, "Difficulty "), 
             React.createElement("select", {ref: "difficulty", className: "form-control"}, 
              difficulties.map(function(difficulty,index){
                return(
                    React.createElement("option", {key: index, value: difficulty}, difficulty)
                ); 
            })
            )
            ), 

            React.createElement("div", {className: "form-group"}, 
             React.createElement("button", {type: "button", className: "btn wk-btn pull-right", onClick: this.onStepInit}, "Next")
            )
        )
        
    );
},
getNames:function()
{
    return (
         React.createElement("div", {dangerouslySetInnerHTML: this.buildFields(this.state.playerCount)})
    );
},
render:function()
{
    var aprofnx=null;
    if(this.state.step=='setup-session')
    {
        aprofnx=this.establishSession;
    }
    else if(this.state.step=='get-names')
    {
        aprofnx=this.getNames;
    }
    else
    {
        aprofnx=this.getInitialData;
    }
    return(     
        React.createElement("div", {className: "modal fade", id: "game-setup"}, 
        React.createElement("div", {className: "modal-dialog"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                React.createElement("h4", {className: "modal-title"}, "Setup")
            ), 
            React.createElement("div", {className: "modal-body"}, 
                React.createElement("div", {className: "row"}, 
                 aprofnx()
                )
            )
        )
        )
        )
    );
}

});

ReactDOM.render(React.createElement(SetupModal, null),document.getElementById('setup-modal'));