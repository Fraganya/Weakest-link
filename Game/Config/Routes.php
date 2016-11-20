<?php

/*
|---------------------------------------------------------------------
|                    Game screen routes
-----------------------------------------------------------------------
| a list of all the available screens the player can access
| its structure is controller => array of available methods
*/

$routes['Admin']=array("index");
$routes['Setup']=array("index","installation","bug");
$routes['Game']=array("index","register","play","getPlayData","topGames","get_all","scores","topScore","lowScore","count");
$routes['Questions']=array("all","add","count","question","update","remove","getBrainy",
                        "brainy_count","getEasy","getMedium","addQMarker");
$routes['Contributions']=array(
                            "index","contributors","top_contributors","count",
                            "questions","question","removeQuestion","suggestions",
                            "updateContributor","addQuestion","addIdea"
                            );
$routes['About']=array("info","summary","credits","update");
$routes['Acknowledgements']=array("get","add","update");
$routes['Guides']=array("index","get","all","add","remove","update");
$routes['Modifications']=array("index","get","add","remove","update","");
?>