$(document).ready(function()
{
    /**
     * initialise bootstrap popovers
     * for perfomance these are opt in and have to be manually initialised
     */
    $("[data-toggle=popover]").popover();
})

 var welcomeMsgs=[
                "You will have to work together as a team to earn the highest amount of money as possible.",
                "But only one of you will make it to the end as round by round we eliminate the player voted the weakest link",
                "Lets play the weakest link!"
                 ]
    /**
     * puns for eliminating players 
     */
var puns=[  
        "Who should go back to waiting tables",
        "Who was'nt worth the cost of our AJAX calls",
        "Who should revisit their books",
        "who isnt worth your time, eject the idiot",
        "One of you has reached the end of their journey",
        "Who did a lot to graduate on top of their class"
        ];

    /**
     * remarks on the money bancked
     * arranged According to peromance
     */
    var remarks=[
                    "a deeply distressing",
                    "a distressing",
                    "a terrible",
                    "a sad",
                    "a reasonable",
                    "an encouraging",
                    "a motivating",
                    "a wonderful"
                ]; 