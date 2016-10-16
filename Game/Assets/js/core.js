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
function getStrongestPlayer(c_arr){
  // by number of questions

}

/**
 * calculate and get the weakest Link
 */

function getWeakestPlayer(c_arr)
{

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
    }
}

/**
 * handleSub
 * handles the logic of the game
 * evaluates the value of the second interactivity button and perfoms an accord action
 */
function handleSub(controller){

}