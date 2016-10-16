$(document).ready(function()
{
    /**
     * initialise bootstrap popovers
     * for perfomance these are opt in and have to be manually initialised
     */
    $("[data-toggle=popover]").popover();

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
     */
    var remarks=[
                    "distressing",
                    "terrible",
                    "deeply distressing",
                    "sad"
                ]
}) 