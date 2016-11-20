'use strict'

/**
 * the Event dispatcher 
 */

function EventDispatcher(obj){
    var list={};

    obj.addEvent=function(type,listener){
        if(!list[type]){
            list[type]=[];
        }
        if(list[type].indexOf(listener)==-1){
            list[type].push(listener);
        }
    }
    obj.dispatchEvent=function(e){
        var evts=list[e.type];
        if(evts){
            if(!e.target) e.target=this;
            for(var index in evts){
                evts[index](e);
            }
        } 
    };
}
/**
 * Contestant logic class and prototypes
 */
function Contestant(id,fname){
    this.id=id;
    this.fname=fname;
    this.questions=0;
    this.answered=0;
    this.passed=0;
    this.failed=0;
    this._banked=0;
    this.state='inactive';
    this._strongestRound=null;
    this.isActive=true;
    this.roundInfo={
        answered:0,failed:0,banked:0,passed:0
    };
}

Contestant.prototype.banked=function(amount){
    this._banked+=amount;
}
Contestant.prototype.resetRoundInfo=function(){
    this.roundInfo.answered=0;
    this.roundInfo.failed=0
    this.roundInfo.banked=0
    this.roundInfo.passed=0;
}

/**
 * Game Round class
 */
function Round(round_number){
    this.roundNumber=round_number;
    this.moneyBanked=0;
    this.strongestLink="N/A";
    this.weakestLink="N/A";
    this.weakReason="N/A";
    this.strongReason="N/A";

    /*this.addEventListener('money-banked',function(amount){
        this.moneyBanked+=amount;
    })*/
}

/**
 * Game class and control information
 */
function Game(id){
    this.id=id;
    this.startTime=undefined;
    this.endTime=undefined;
    this.roundCount=0;
    this.currentRound=0;
    this.questions=0;
    this.answered=0;
    this.passed=0;
    this.currentBank=0;
    this.accumulated=0;
    this.rounds=[];
    this.history=[];

    this.startGame=function(){
        this.startTime=new Date();
    }
    this.getPlayTime=function(){
        this.endTime=new Date();
        this.playTime=this.endTime-this.startTime;
    }
/*
    //handle the money-banked event for the game
    this.addEventListener('money-banked',function(evt){

    });

    this.addEventListener('new-round',function(evt){
        console.log(evt);
        this.currentRound++;
        this.rounds.push(new Round(this.currentRound));
    });*/
}

/**
 * function to toggle fullscreen()
 */

function toggleFullScreen(elem)
{
    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenelement)
    {
        if(document.exitFullscreen){
            document.exitFullscreen();
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
        else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }else if(document.msExitFullScreen){
            document.msExitFullScreen();
        }

    }
    else{
        if(elem.requestFullScreen){
            elem.requestFullScreen();
        }else if(elem.webkitRequestFullscreen){
            elem.webkitRequestFullscreen();
        }
        else if(elem.mozRequestFullScreen){
            elem.mozRequestFullScreen();
        }else if(elem.msRequesFullscreen){
            elem.msRequesFullscreen();
        }
        
    }
}

/**
 * calculate and get the strongest Link
 * start by number of questions passed
 * if tied try amount banked
 */
function getStrongestPlayer(c_arr,thisRound){
  // by number of questions -get number of the top highest passed questions
  var scores=[],matches=0,high_,strongest;
  c_arr.map(function(player,index){
      scores.push(player.roundInfo.passed);
  });

  //get the highest score 
  scores.sort(function(a,b){return (b-a)})
  c_arr.map(function(player,index){
      if(player.roundInfo.passed==scores[0]) {
          matches++;
          high_=index;
      }
  });

  //there was a tie
  if(matches>1){ 
      // get strongest link by amount of money banked
      c_arr.map(function(player,index){
       scores.push(player.roundInfo.banked);
     });
     
     // get the highest banked amount
        scores.sort(function(a,b){return (b-a)})
            c_arr.map(function(player,index){
                if(player.roundInfo.banked==scores[0]) {
                    high_=index;
                    return;
                }
            });
        strongest=c_arr[high_].fname;
        thisRound.strongReason="Reason : Banked the most money/system select.";

  }
  else{
      strongest=c_arr[high_].fname;
      thisRound.strongReason="Reason : Answered the most correct questions.";
  }
  
  return strongest;

}

/**
 * calculate and get the weakest Link
 */

function getWeakestPlayer(c_arr,thisRound)
{
  var scores=[],matches=0,low_,weakest;
  c_arr.map(function(player,index){
      scores.push(player.roundInfo.failed);
  });

  //get the lowest score 
  scores.sort(function(a,b){return (b-a)})
  c_arr.map(function(player,index){
      if(player.roundInfo.failed==scores[0]) {
          matches++;
          low_=index;
      }
  });

  //there was a tie
  if(matches>1){ 
      // many contestants failed
      // get weakest link by amount of money banked
        c_arr.map(function(player,index){
        scores.push(player.roundInfo.banked);
        });
     
     //get the least banked amount
        scores.sort(function(a,b){return (a-b)})
            c_arr.map(function(player,index){
                if(player.roundInfo.banked==scores[0]) {
                    low_=index;
                    matches++ 
                    thisRound.weakReason="Banked the least amount of money";
                    return;
                }
            });
        weakest=(matches>1) ? "N/A" :c_arr[low_].fname;

  }
  else{
      weakest=c_arr[low_].fname;
      thisRound.weakReason="Got the most incorrect answers";
  }
  
  return weakest;

}

/**
 * handleCore
 * handles the logic of the game
 * evaluates value of the first interactivity button and perfoms an accor action
 */
function handleCore(controller){
    var action=$("#int-btn-1").text();
    if(action==='start game'){
        $('#game-play').modal('show');
        setTimeout(controller.dispatchEvent({type:'start'}),50000);
        setInteraction("Interaction 1","Game in progress",function(){
            $("#int-btn-1").removeClass('animated flash focused');
        });
        
    }    
}

/**
 * handleSub
 * handles the logic of the game
 * evaluates the value of the second interactivity button and perfoms an accord action
 */
function handleSub(controller){
    
}

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

function Host(){
    this.speak_plain=function(msgs,target,callback){
        var timer=setInterval(function(){
        if(msgs.length==0){
            clearInterval(timer);
            if(callback) callback();
            return;
        }
        $(target).text(msgs[0]);
        this.speak_voice(msgs[0]);
        msgs.shift();
      }.bind(this),5000);
    }

    this.speak_voice=function(){
        var thisMsg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        thisMsg.voiceURI = 'native';
        thisMsg.volume = 1; // 0 to 1
        thisMsg.rate = 1; // 0.1 to 10
        thisMsg.pitch = 2; //0 to 2
        thisMsg.lang = 'en-UK';

        thisMsg.onend = function(e,callback) {
        if(callback){
            calback();
        }
        };

        this.speak=function(text,callback){
            thisMsg.text = text;
            speechSynthesis.speak(thisMsg);
        }
    }

    this.notifyPlayers=function(msgs,callback){
        this.speak_plain(msgs,"#off-play-msg-box",callback);
    }
}

function setInteraction(btnText,msgBoxText,callback)
{
    $("#int-btn-1").text(btnText);
    $("#off-play-msg-box").text(msgBoxText);
    callback();
}

function getRoundRemarks(container,earnings)
{
    var remark_index=null;
    if(earnings<10000){
        remark_index=0;
    }
    else if(earnings<20000){
        remark_index=1;
    }
    else if(earnings<30000){
        remark_index=2;
    }
    else if(earnings<40000){
        remark_index=3;
    }
    else if(earnings<50000){
        remark_index=4;
    }
    else if(earnings<60000){
        remark_index=5;
    }
    else if(earnings>60000 && earnings<64000){
        remark_index=6;
    }
    else{
         remark_index=7;
    }
    container.push("You managed to get "+remarks[remark_index]+" "+earnings);
    container.push("That money will go to the next round but one of you will "+(['certainly','definately','surely'])[Math.floor(Math.random()*3)] +" not")
    container.push(puns[Math.floor(Math.random()*5)]);
    container.push("it's time to vote off the weakest link!");
}
var host=new Host();
