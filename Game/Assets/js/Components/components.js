var ContestantBar=React.createClass({displayName: "ContestantBar",
    getDefaultProps:function()
    {
        return {
            players:[
                         {id:'2',state:'passive',fname:'francis'},
                         {id:'1',state:'passive',fname:'Joshua'},
                         {id:'2',state:'active',fname:'Dyna'}
                    ]
        }
    },
    render:function()
    {
        var players=this.props.players;
        return(
             React.createElement("ul", {className: "contestant-bar list-inline list-unstyled"}, 
             
                 players.map(function(player,index){
                     return(
                         React.createElement("li", {key: index, "data-id": player.id, className: player.state}, player.fname)
                     )
                 })
             
            )
        );       
    }
});

var MoneyBar=React.createClass({displayName: "MoneyBar",
    getDefaultProps:function()
    {
        return {moneyIntervals:[250,500,1000,2500,5000,8000,16000,32000,64000]}
    },
    render:function()
    {
        return (
             React.createElement("ul", {className: "list-unstyled money-chain"}, 
              
                  this.props.MoneyBar.map(function(value,index){
                      return(
                          React.createElement("li", {key: index}, value)
                      )
                  })
              
             )
        );
    }
})

var QuestionPanel=React.createClass({displayName: "QuestionPanel",
    render:function()
    {
        return (
            React.createElement("div", null, 
             React.createElement("div", {className: "panel panel-default"}, 
                   React.createElement("div", {className: "panel-heading"}, 
                         React.createElement("h3", {className: "panel-title"}, "Question ", React.createElement("span", {className: "pull-right q-timer"}, "0:20:0"))
                   ), 
                   React.createElement("div", {className: "panel-body"}, 
                         "Sample question here"
                   )
             ), 
             
             
              React.createElement("form", {action: "", method: "POST", role: "form"}, 
                  React.createElement("div", {className: "form-group"}, 
                      React.createElement("input", {type: "text", className: "form-control", id: "", placeholder: "Place your answer here"})
                  )
              ), 
              React.createElement("div", {className: "response-btns text-center"}, /* response btns for interaction */
               React.createElement("button", {type: "button", className: "btn wk-btn"}, "Answer"), 
               React.createElement("button", {type: "button", className: "btn wk-btn"}, "Pass"), 
               React.createElement("button", {type: "button", className: "btn wk-btn"}, "Bank")
               ), 
              
              React.createElement("div", {className: "panel panel-default marg-top"}, /*Interactive messages box */
                  React.createElement("div", {className: "panel-body"}, 
                     React.createElement("span", {className: "fa fa-envelope correct"}), 
                     React.createElement("span", {id: "game-play-msg"}, " That's wrong")
                  )
              )
              )
        )
    }
})
var PlayWindow=React.createClass({displayName: "PlayWindow",
    render:function()
    {
        return (
    React.createElement("div", {className: "modal fade", id: "game-play"}, 
    React.createElement("div", {className: "modal-dialog modal-lg"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("h3", {className: "modal-title"}, React.createElement("span", {className: "fa fa-gamepad"}), " Game Play")
            ), 
            React.createElement("div", {className: "modal-body"}, 
             React.createElement("div", {className: "row"}, " ", /* modal body row */ 
             /* money chain section */
             React.createElement("div", {className: "col-sm-2 "}, 
                React.createElement(MoneyBar, null), 
                React.createElement("div", {className: "well well-sm bank"}, "2000")
             ), /* end of money chain section */
             /* Main game play container  section */
             React.createElement("div", {className: "col-sm-8"}, 
                React.createElement(ContestantBar, null), 
                React.createElement(QuestionPanel, null)
             ), /* end of main game play container section */
             /* timer section */
             React.createElement("div", {className: "col-sm-2"}, 
             React.createElement("div", {className: "timer"}, "0:90:30")
             )
             )/*end of timer section */
            ), /* end of modal body row */
            React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-pause pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-play pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-circle wk-status-offline pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-expand pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-close", "data-dismiss": "modal"})
            )
        )
    )
)



        )
    }

})

var GameController=React.createClass({displayName: "GameController",
    getInitialState:function()
    {
        return {contestants:[]}
    },

    render:function()
    {
        return (
            React.createElement("div", null, 
                React.createElement(PlayWindow, null)
            )

        );
    }
});

ReactDOM.render(React.createElement(GameController, null),document.getElementById('game-controller'));