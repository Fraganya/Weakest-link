<?php

/*
|---------------------------------------------------------------------
|                    Game screen routes
-----------------------------------------------------------------------
| a list of all the available screens the player can access
| its structure is controller => array of available methods
*/

$routes['Admin']=array("index","home");
$routes['Setup']=array("index","installation","bug");
$routes['Game']=array("index","register","play","getPlayData","contributions","scores");
$routes['Contributions']=array("index","getContributors","getTopContributors","updateContributor","addQuestion","addIdea");
$routes['About']=array("getAboutInfo","getAboutInfo_about","getCreditInfo","updateInfo");
$routes['Acknowledgements']=array("getAcknowledgements","addAcknowledgement","updateAcknowldgement");
$routes['Guides']=array("index","getGuides","addGuide","removeGuide","updateGuide");
$routes['Modifications']=array("index","getMods","addMod","removeMod","updateMod","");
?>