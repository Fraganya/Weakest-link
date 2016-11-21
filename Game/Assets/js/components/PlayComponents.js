"use strict"
/**
 * Display classes
 */

/**
 * ContestantBar
 * render the contestant's Bar'
 */
//console.log("Realoaded");
var ContestantBar=React.createClass({displayName: "ContestantBar",
    getDefaultProps:function()
    {
        return {players:[] }
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

/**
 * MoneyBar componentDidMount
 * renders the money-chain and has methods for setting active chain bar and retrieving money
 */
var MoneyBar=React.createClass({displayName: "MoneyBar",
    getInitialState:function()
    {
        return {money:0,moneyIntervals:[64000,32000,16000,8000,4000,2000,1000,500,250],cBar:8,nBar:7}
    },
    componentDidMount:function(){
      
    },
    raiseBar:function(){
        var nextBar=this.state.nBar;
        var c_money=this.state.moneyIntervals[this.state.cBar];
        var continue_status=true;
        if(nextBar<0){
            this.resetBar();
            continue_status=false;
        }
        else{
            this.setState({cBar:this.state.nBar,nBar:this.state.nBar-1,money:c_money});
        }
        return continue_status;
    },
    getCurrentMoney:function(){
        var money=this.state.money
        this.resetBar();
        return (money);
    },
    resetBar:function(){
        this.setState({cBar:8,nBar:7,money:0});
    },
    render:function()
    {
        var cBar=this.state.cBar;
        return (
             React.createElement("ul", {className: "list-unstyled money-chain"}, 
              
                  this.state.moneyIntervals.map(function(value,index){
                      return(
                          React.createElement("li", {key: index, className: (cBar==index) ? 'active-money' : ''}, 
                          value
                          )
                      )
                  })
              
             )
        );
    }
})

/**
 * Question panel 
 * Handles responses from the user 
 */
var QuestionPanel=React.createClass({displayName: "QuestionPanel",
    getInitialState:function(){return {q_time:20}},
    /**
     * the player answered -evaluate the answer
     */
    handleAnswer:function()
    {
        var status=true;
        // call the game-controllers handle answer method to make necessaryb updates
        if(status){
            this.props.aHwnd(true);
        }
        this.clearQTimer();
        this.askQuestion();
    },
    /**
     * player did not answer - the player failed the question
     */
    handlePass:function(){
        // call game-controllers handle pass method
       this.props.pHwnd();
       this.clearQTimer();
       this.askQuestion();
    }, 
    /**
     * startQTimer starts the question timers
     */
    startQCounter:function(){
        var timer=setInterval(this.updateQCounter,1000);
        this.setState({q_timer:timer})
    },
    updateQCounter:function(){
       if(this.state.q_time==0){
                window.clearInterval(this.state.q_timer);
                this.timeOut();
            }
            else{
                var timer=this.state.q_time-1;
                this.setState({q_time:timer});
         }
    },
    /**
     * ends question timer
     */
    clearQTimer:function(){
        this.setState({q_time:20});
        //console.log("I get HEre")
        if(this.state.q_timer){
           // console.log("Im in the clear zone")
             window.clearInterval(this.state.q_timer);
        }
    },  
    askQuestion:function(){
        this.startQCounter();
    },  
    timeOut:function()
    {
        this.handlePass();
    },
    render:function()
    {
        return (
            React.createElement("div", null, 
             React.createElement("div", {className: "panel panel-default"}, 
                   React.createElement("div", {className: "panel-heading"}, 
                         React.createElement("h3", {className: "panel-title"}, "Question", React.createElement("span", {className: "pull-right"}, this.state.q_time))
                   ), 
                   React.createElement("div", {className: "panel-body"}, 
                         "Sample question here"
                   )
             ), 
             
             
              React.createElement("form", {action: "", method: "POST", role: "form"}, 
                  React.createElement("div", {className: "form-group"}, 
                      React.createElement("input", {type: "text", ref: "answerBox", className: "form-control", id: "", placeholder: "Place your answer here"})
                  )
              ), 
              React.createElement("div", {className: "response-btns text-center"}, /* response btns for interaction */
               React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.handleAnswer}, "Answer"), 
               React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.handlePass}, "Pass"), 
               React.createElement("button", {type: "button", className: "btn wk-btn", onClick: this.props.banker}, "Bank")
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
    /**
     * Game holders that will contain props from the 
     */
    getInitialState:function()
    {
        return {isFullScreen:false,roundTime:90}
    },
    componentDidMount:function(){
       
    },
    /**
     * Toggle the fullscreen for the play window
     */
    goFullScreen:function(){
      var docElem=document.getElementById('game-play');
      toggleFullScreen(docElem)
      this.setState({isFullScreen:!this.state.isFullScreen});
    },
    /**
     * update timer controlls round timer
     * update the round timer and end round if time is up
     */
    updateTimer:function(){
            if(this.state.roundTime==0){
                this.setState({roundTime:90});
                window.clearInterval(this.state.r_timer);
                this.props.master.endRound();
            }
            else{
                var timer=this.state.roundTime-1;
                this.setState({roundTime:timer});
            }
            
    },
    /**
     * handleBank gets a values from its child moneyBar components and call the parent handleBank method
     */
    handleBank:function(){
        var moneyBar=this.refs.moneyBar;
        this.props.master.handleBank(moneyBar.getCurrentMoney())
    },
    /**
     * startRound starts the round timers
     */
    startRound:function(){
        var timer=setInterval(this.updateTimer,1000);
        //this.refs.qPanel.askQuestion();
        this.setState({r_timer:timer})
    },
    /**
     * end round
     */
    endRound:function(){
        this.setState({roundTime:90});
        console.log("Im ending the round");
        this.refs.qPanel.clearQTimer();
        window.clearInterval(this.state.r_timer);
    },
    render:function()
    {   
        var toggleClass=(this.state.isFullScreen) ? "fa-compress" : "fa-expand";
        return (
        React.createElement("div", {className: "modal fade", id: "game-play", "data-backdrop": "static"}, 
        React.createElement("div", {className: "modal-dialog modal-lg"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("h3", {className: "modal-title"}, React.createElement("span", {className: "fa fa-gamepad"}), " Game Play")
            ), 
            React.createElement("div", {className: "modal-body"}, 
             React.createElement("div", {className: "row"}, " ", /* modal body row */ 
             /* money chain section */
             React.createElement("div", {className: "col-sm-2 "}, 
                React.createElement(MoneyBar, {ref: "moneyBar"}), 
                React.createElement("div", {className: "well well-sm bank"}, this.props.info.cBank)
             ), /* end of money chain section */
             /* Main game play container  section */
             React.createElement("div", {className: "col-sm-8"}, 
                React.createElement(ContestantBar, {players: this.props.players}), 
                React.createElement(QuestionPanel, {ref: "qPanel", banker: this.handleBank, aHwnd: this.props.master.handleAnswer, tHwnd: this.props.master.handleTimeOut, pHwnd: this.props.master.handlePass})
             ), /* end of main game play container section */
             /* timer section */
             React.createElement("div", {className: "col-sm-2"}, 
             React.createElement("div", {className: "timer"}, 
               this.state.roundTime + " Sec(s)"
             )
             )
             )/*end of timer section */
            ), /* end of modal body row */
            React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-pause pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-play pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-circle wk-status-offline pull-left"}), 
                React.createElement("button", {type: "button", id: "fullscreen-btn", title: "Toggle Fullscreen", className: "btn wk-btn fa "+toggleClass+" pull-left", onClick: this.goFullScreen}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-close", "data-dismiss": "modal"})
            )
        )
        )
        )



        )
    }

});

/**
 * The statistics window class
 * renders game stats
 */
var StatisticsWindow=React.createClass({displayName: "StatisticsWindow",
 render:function(){
   return ( 
    React.createElement("div", {className: "modal fade", id: "game-stats", "data-backdrop": "static"}, 
    React.createElement("div", {className: "modal-dialog modal-md"}, 
        React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
                React.createElement("h3", {className: "modal-title"}, " ", React.createElement("span", {className: "fa fa-calculator"}), " Game Statistics")
            ), 
            React.createElement("div", {className: "modal-body"}, 
           
           /**contestant's perfomance section */ 
            React.createElement("div", {className: "well well-sm"}, 
                "Contestants' Perfomance"
            ), 
            
            React.createElement("table", {className: "table"}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        React.createElement("th", null, "Name"), 
                        React.createElement("th", null, "Asked"), 
                        React.createElement("th", null, "Answered"), 
                        React.createElement("th", null, "Passed"), 
                        React.createElement("th", null, "Failed")
                    )
                ), 
                React.createElement("tbody", null, 
                
                    this.props.players.map(function(player,index){
                        return(
                            React.createElement("tr", {key: index}, 
                            React.createElement("td", null, player.fname), 
                            React.createElement("td", null, player.questions), 
                            React.createElement("td", null, player.answered), 
                            React.createElement("td", null, player.passed), 
                            React.createElement("td", null, player.failed)
                        )
                        )
                    })
                
                    
                )
            ), 
             /**Game statistics */
             
             React.createElement("div", {className: "row"}, 
                /**round statistic information  */
                
                
                
                React.createElement("div", {className: "col-sm-8"}, 
                React.createElement("div", {className: "well well-sm"}, "Round info"), 
                React.createElement("div", {className: "table-responsive"}, 
                React.createElement("table", {className: "table  table-hover"}, 
                    React.createElement("thead", null, 
                        React.createElement("tr", null, 
                            React.createElement("th", null, "Round #"), 
                            React.createElement("th", null, "Strongest"), 
                            React.createElement("th", null, "Weakest"), 
                            React.createElement("th", null, "Accumulated")
                        )
                    ), 
                    React.createElement("tbody", null, 
                    
                        this.props.game.rounds.map(function(round,index){
                            return(
                             React.createElement("tr", {key: index}, 
                                React.createElement("td", null, round.roundNumber), 
                                React.createElement("td", null, round.strongestLink), 
                                React.createElement("td", null, round.weakestLink), 
                                React.createElement("td", null, round.moneyBanked)
                            )
                            );
                        })
                    
                    )
                )
                )
                ), " ", /**<!-- end of round statistic information --> */
                /** <!-- Game statistic information --> */
                React.createElement("div", {className: "col-sm-4"}, 
                React.createElement("div", {className: "well well-sm"}, "Misc info"), 
                React.createElement("div", {className: "table-responsive"}, 
                    React.createElement("table", {className: "table table-hover"}, 
                        React.createElement("thead", null, 
                            React.createElement("tr", null, 
                                React.createElement("th", null, "Category"), 
                                React.createElement("th", null, "Value")
                            )
                        ), 
                        React.createElement("tbody", null, 
                            React.createElement("tr", null, 
                                React.createElement("td", null, "Play Time(m)"), 
                                React.createElement("td", null, this.props.game.playTime)
                            ), 
                            React.createElement("tr", null, 
                                React.createElement("td", null, "Accumulated"), 
                                React.createElement("td", null, this.props.game.accumulated)
                            ), 
                            React.createElement("tr", null, 
                                React.createElement("td", null, "Questions"), 
                                React.createElement("td", null, this.props.game.questions)
                            )
                             
                        )
                    )
                )
                
                ), " "/** <!-- Game statistic information --> */
             )
            ), /** <!-- Game statistic information --> */
            React.createElement("div", {className: "modal-footer"}, 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-save pull-left"}), 
                React.createElement("button", {type: "button", className: "btn wk-btn fa fa-close", "data-dismiss": "modal"})
            )
        )
    )
));

    }
});
var VotingWindow=React.createClass({displayName: "VotingWindow",
    getInitialState:function(){
        return{isDone:false,voter:'',votables:[],count:0,cIndex:0,votes:[]}
    },
    componentWillReceiveProps:function(){
            
            var votables=this.state.votables;
            if(votables.length==0){
                var master=this.props.master;
                var players=master.state.activeContestants;
                var votes=this.state.votes;

                players.map(function(player,index){
                    votes.push({name:player.fname,cVotes:0});
                });

                for(var i=1;i<players.length;i++){
                    votables.push(players[i].fname);
                }
                this.setState({count:players.length,voter:players[0].fname,votables:votables});
                console.log("Received props");
            }
           
    },
    reset:function(){
        this.setState({isDone:false,voter:'',votables:[],count:0,cIndex:0,votes:[]});
    },
    prepNextVote:function(){
        var votables=[];
        var players=this.props.players;
        var cIndex=this.state.cIndex+1;
      
      if(this.state.tiedUp){
          var stackInfo={
              name:this.refs.voteBox.value,
              cVotes:"super",
          }
          this.props.master.dispatchEvent({type:'vote',ejected:stackInfo});
          console.log(stackInfo);
          $("#vote-window").modal('hide');
          this.reset();
          return;
      }
       if(cIndex==this.state.count){
            this.amendVotes();          
            return;
        }

      //generate votables
        for(var i=0;i<players.length;i++){
            if(i==cIndex){
            continue;
            }
            votables.push(players[i].fname);
        }
        
        this.setState({voter:players[cIndex].fname,votables:votables,cIndex:cIndex});
    },
    handleVote:function(){
        var votes=this.state.votes;
        var voted=this.refs.voteBox.value;
        for(var i=0;i<votes.length;i++)
        {
            if(votes[i].name===voted){
                votes[i].cVotes++;
            }
        }
        this.setState({votes:votes});
        this.prepNextVote();
    },
    amendVotes:function()
    {
        //get the most voted link
        var votes=this.state.votes;
        var ties=[];
        var tieStatus=false;
        var mostVoted=votes[0];
        for(var index=1;index<votes.length;index++)
        {
            if(votes[index].cVotes>mostVoted.cVotes){
                 mostVoted=votes[index];
            }
        }

        //check if there are ties
        for(var index=0;index<votes.length;index++)
        {
            if((votes[index].cVotes==mostVoted.cVotes) && (votes[index].name!=mostVoted.name)){
                ties.push(votes[index]);
                tieStatus=true;
            }
        }
        if(tieStatus){
                ties.push(mostVoted); //consolidate ties byb adding the initial highest voted
                var votables=[];
                var master=this.props.master;
                var voter=master.state.game.rounds[master.state.game.currentRound].strongestLink;

                for(var i=0;i<ties.length;i++)
                {
                    if(voter==ties[i].name) continue;
                    votables.push(ties[i].name);
                } 
                this.setState({voter:voter,votables:votables,tiedUp:true});
        }
        else{
            this.props.master.dispatchEvent({type:'vote',ejected:mostVoted});
            $("#vote-window").modal('hide');
            this.reset();
        }  
    },
    getVote:function(){
        var tieMsg=function(){};
        if(this.state.tiedUp){
            tieMsg=function(){return(
                 React.createElement("p", {className: ""}, 
                 "We have a tie!", 
                 React.createElement("br", null), 
                 this.state.voter, "," + ' ' +
                 "You are the Strongest Link and your decision is final!"
                )
            )}.bind(this);
        }
        return(
            React.createElement("div", null, 
             React.createElement("h3", null, this.state.voter), 
                    React.createElement("div", {className: "well well-sm"}, 
                    tieMsg(), 
                    React.createElement("p", null, "Who Do you think is the weakest link that's slowing you down")
                    ), 
                    React.createElement("select", {className: "form-control", ref: "voteBox"}, 
                        
                            this.state.votables.map(function(player,index){
                                return(
                                    React.createElement("option", {key: index, value: player}, player)
                                )
                            })
                        
            ), 
            React.createElement("button", {className: "btn wk-btn  marg-top", onClick: this.handleVote}, "Vote")
            )
        );
    },
    render:function(){
        var aproFooter=function(){};
        if(this.state.isDone){
            aproFooter=function(){
                return(
                        React.createElement("div", {className: "modal-footer"}, /** <!--footer--> */
                            React.createElement("button", {className: "btn wk-btn"}, "Done")
                        )
                    )
            } 
        }
        return(
            React.createElement("div", {className: "modal fade", id: "vote-window", "data-backdrop": "static"}, 
            React.createElement("div", {className: "modal-dialog modal-sm"}, 
            React.createElement("div", {className: "modal-content"}, 
                React.createElement("div", {className: "modal-header"}, 
                     React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
                     React.createElement("h3", {className: "modal-title"}, "Vote")
                ), 
                React.createElement("div", {className: "modal-body"}, 
                 (!this.state.isDone) ? this.getVote():'this.FinalResponse()'
                ), 
                aproFooter()
            )
            )
            )
        )
    }
})
/**
 * The game controller class 
 * Controls core game components - statistics, playwindow and history
 */
var GameController=React.createClass({displayName: "GameController",
    getInitialState:function()
    {
        /**
         * @var contestants - holds the player Objects
         * @var game -holds the game Object 
         * @vars c_player and c_round holds  the current player index and the current round number respectively
         */
        return {activeContestants:[],contestants:[],game:new Game(),c_player:0,c_round:0}
    },
     /**
     * Get game data and initialise player Objects
     */
    componentDidMount:function()
    {
        /**
         * Get player details and use result to initialise player objects
         */
        $.post("./?controller=Game&method=getPlayData",{},function(data,status){
            if(data!='false')
            {
                var gameInfo,currentPlayer;
                var playerArr=[];
                try{
                    gameInfo=JSON.parse(data);
                    gameInfo.players.map(function(player,index){
                        currentPlayer=new Contestant(player.id,player.fname);
                        /**
                         * set the state of the first player to active - 
                         * - (the one to go first) and at the begining
                         */
                        if(index==0) currentPlayer.state="active";
                        playerArr.push(currentPlayer);
                    });
                    this.setState({activeContestants:playerArr,contestants:playerArr.slice(0,playerArr.length),MAX_ROUNDS:(playerArr.length-1)});
                    this.state.game.id=gameInfo.game_id;
                }
                catch(err)
                {
                    alert(err.toString());
                }
            }
            else{
                alert("Something went wrong");
            }
        }.bind(this));

        /**
         * Register the game event start with this controller 
         * once the signal is dispatched the game starts a new round;
         */
        EventDispatcher(this);
        this.addEvent('start',function(){
            this.startRound();
        }.bind(this));
        
        //register the voting event
        this.addEvent('vote',function(stackInfo){
            //prep ejection msg
           var weakPlayer=this.state.game.rounds[this.state.game.currentRound].weakestLink;
           var msg=[];
           if(weakPlayer==="N/A"){
               msg.push("Statistically there is no weak player.");
               msg.push("But the group thinks your services are no longer required :)");
           }
           else{
               msg.push("Statistically "+weakPlayer+" is the weakest link.");
               msg.push(this.state.game.rounds[this.state.game.currentRound].weakReason);
               if(weakPlayer!=stackInfo.ejected.name){
                   msg.push("But the group does not think so.");
               }
           } 
           msg.push(stackInfo.ejected.name+" you are the weakest link");
           msg.push("GoodBye!!");
           host.notifyPlayers(msg,function(){
               //remove the player
               var players=this.state.activeContestants;
               for(var i=0;i<players.length;i++)
               {
                   if(players[i].fname==stackInfo.ejected.name){
                        players.splice(i,1);
                   }
               }
               this.setState({activeContestants:players});
               host.notifyPlayers(["Lets play the next round"],function(){
                   $("#int-btn-1").addClass('animated flash focused');
                   $("#int-btn-1").text('Start round');
               })
           }.bind(this))
        }.bind(this));

        
        document.getElementById('int-btn-1').addEventListener('click',function(){handleCore(this)}.bind(this));
        document.getElementById('int-btn-2').addEventListener('click',function(){handleSub(this)}.bind(this));

        //welcome the players
        host.speak_plain(welcomeMsgs,"#off-play-msg-box",function(){
        $("#int-btn-1").addClass('animated flash focused');
        $("#int-btn-1").text('start game');
       
    }); 
    },
    /**
     * handle answer
     * @param bool status 
     * indicates wheather the current player answered the question correctly or not 
     * evaluate conditions and accodingly update game counters
     */
    handleAnswer:function(status){
        // update game and player counters for the answer action
        var promiseToUpdate=new Promise(function(resolve,reject){
            var game=this.state.game;
            var players=this.state.activeContestants;
            var c_index=this.state.c_player;
            var thisRound=this.state.c_round-1;
            var updateActive=true;
            if(status==true)
            {
                game.passed++;
                players[c_index].roundInfo.answered++;
                players[c_index].roundInfo.passed++;
                if(!this.refs.pWindow.refs.moneyBar.raiseBar()){
                    // the players have answered all the questions in the chain add 64000
                    game.currentBank+=64000;
                    game.rounds[thisRound].moneyBanked+=64000;
                    this.endRound();
                    this.refs.pWindow.endRound();
                    updateActive=false;
                }
            }
            else{
                players[c_index].roundInfo.failed++;
                this.refs.pWindow.refs.moneyBar.resetBar();
            }
            players[c_index].questions++


            game.questions++;
            game.answered++;

            resolve({p_hldr:players,g_hldr:game,update:updateActive});
        }.bind(this))
    
        promiseToUpdate.then(function(response){
            this.setState({activeContestants:response.p_hldr,game:response.g_hldr})
            if(response.update) this.setActivePlayer();
        }.bind(this))
        
    },
    /**
     * The player failed to attempt the question and simply let it pass
     * update game counters accodingly
     */
    handlePass:function(){
        //update game counters for the pass action
        
        var promiseToUpdate=new Promise(function(resolve,reject){
            var game=this.state.game;
            var players=this.state.activeContestants;
            var c_index=this.state.c_player;

            game.questions++;
            players[c_index].questions++;
            players[c_index].roundInfo.failed++;
            this.refs.pWindow.refs.moneyBar.resetBar();

            resolve({p_hldr:players,g_hldr:game});
        }.bind(this))

        promiseToUpdate.then(function(response){
            this.setState({activeContestants:response.p_hldr,game:response.g_hldr})
            this.setActivePlayer();
        }.bind(this));


    },
    /**
     * The current player banked some money
     * accondigly update game counters 
     */
    handleBank:function(amount){
        //update game counters for the bank action
        var promiseToUpdate=new Promise(function(resolve,reject){
            var game=this.state.game;
            var players=this.state.activeContestants;
            var c_index=this.state.c_player;
            var thisRound=(this.state.c_round)-1;

            // increment  the banked money with the amount in the current chain
            game.currentBank+=amount;
            game.rounds[thisRound].moneyBanked+=amount;
            // add the amount to the amount this player has banked in this round
            players[c_index].roundInfo.banked+=amount;
         
            resolve({p_hldr:players,g_hldr:game});
        }.bind(this))

        promiseToUpdate.then(function(response){
            this.setState({activeContestants:response.p_hldr,game:response.g_hldr});
        }.bind(this))
    },
     /**
     * set active player
     */
     setActivePlayer:function(){
        var players=this.state.activeContestants;
        var c_index=null;
        for(var c=0;c<players.length;c++)
        {
            if(players[c].state=="active"){
                var nextIndex=(c==(players.length-1)) ? 0 : (c+1);
                players[c].state="inactive";
                players[nextIndex].state="active";
                c_index=nextIndex
                break;
            }
        }
        this.setState({activeContestants:players,c_player:c_index});
    },
    /**
     * start  new round
     */
    startRound:function(){
        
        var game_hldr=this.state.game;
        var player_hldr=this.state.activeContestants;
        var thisRound=(this.state.c_round)+1;
        var MAX_ROUNDS=this.state.MAX_ROUNDS;

         /**
         * reset necessary components from prev round
         * reset money Bar in case the game time was up
         */
        this.refs.pWindow.refs.moneyBar.resetBar();
        game_hldr.currentBank=0;
        //reset round info for each player
        for(var index=0;index<player_hldr.length;index++)
        {
            player_hldr[index].resetRoundInfo();
        }

        //assign round number and add new round
        game_hldr.rounds.push(new Round(thisRound));

        this.setState({game:game_hldr,c_round:thisRound});

        // start game time counter 
        console.log(thisRound);
        if(thisRound!=MAX_ROUNDS)
        {
             this.refs.pWindow.startRound();
        }
        else{
           // this.refs.headWindow.startRound();
           console.log("Boost up round");
        }
       
    },
    /**
     * end the current round and make necessary calculations
     */
    endRound:function(){
        // close play window
        $("#game-play").modal("hide");

        // update game counters for this round
        var game_hldr=this.state.game;
        var player_hldr=this.state.activeContestants;
        var thisRound=this.state.c_round-1;
        var allContestants=this.state.contestants;
    
        //game counters
        game_hldr.accumulated+=game_hldr.currentBank;
        game_hldr.getPlayTime();

        //player counters
        for(var index=0;index<player_hldr.length;index++)
        {
            player_hldr[index].banked(player_hldr[index].roundInfo.banked);
            player_hldr[index].answered+=player_hldr[index].roundInfo.answered;
            player_hldr[index].failed+=player_hldr[index].roundInfo.failed;
            player_hldr[index].passed+=player_hldr[index].roundInfo.passed;
        }

        game_hldr.rounds[thisRound].strongestLink=getStrongestPlayer(player_hldr,game_hldr.rounds[thisRound]);
        game_hldr.rounds[thisRound].weakestLink=getWeakestPlayer(player_hldr,game_hldr.rounds[thisRound]);
        
        //update statistics
        for(var index=0;index<player_hldr.length;index++)
        {
            for(var innerIndex=0;innerIndex<allContestants.length;innerIndex++)
            {
                if(allContestants[innerIndex].fname==player_hldr[index].fname){
                    allContestants[innerIndex]=player_hldr[index];
                    break;
                }
            }
        }
        this.setState({activeContestants:player_hldr,contestants:allContestants,game:game_hldr});
        //notify players of perfomance
         var msgs=["Out of the 64,000 target"];
         getRoundRemarks(msgs,game_hldr.currentBank);
        if((thisRound+1)<this.state.MAX_ROUNDS){
            host.notifyPlayers(msgs,function(){
             $('#vote-window').modal('show');
             })
        }
        else if((thisRound+1)==this.state.MAX_ROUNDS){
             host.notifyPlayers(msgs,function(){
                 $("#int-btn-1").addClass('animated flash focused');
                 $("#int-btn-1").text('Play Last Round');
             })
        }
        else{
            $("#int-btn-1").addClass('animated flash focused');
            $("#int-btn-1").text('Play Head to Head');
        }
       
        

        
       

       // this.setState({contestants:player_hldr,game:game_hldr});
    },
    render:function()
    {
        var playInfo={cBank:this.state.game.currentBank}
        return (
            React.createElement("div", null, 
                React.createElement(PlayWindow, {ref: "pWindow", players: this.state.activeContestants, info: playInfo, master: this}), 
                React.createElement(StatisticsWindow, {ref: "statWindow", players: this.state.contestants, game: this.state.game, master: this}), 
                React.createElement(VotingWindow, {ref: "vWindow", players: this.state.activeContestants, master: this})
            )

        );
    }
});

var GameCtrl=React.createElement(GameController, null)
ReactDOM.render(GameCtrl,document.getElementById('game-controller'));



/**
 *  Game Interaction buttons
 */
document.getElementById('int-btn-1').addEventListener('click',handleCore(GameCtrl));