<?php
/*-----------------------------------------------------------------------------
|                      definition of constants                                   
------------------------------------------------------------------------------*/
define("MODELSPATH","../Models");

/*-----------------------------------------------------------------------------
|                       require core files functions                          |         
-----------------------------------------------------------------------------*/
require_once('../API/Asset.php');

/*-----------------------------------------------------------------------------
|                       declare global objects                            
------------------------------------------------------------------------------*/


$load=new Asset();

/*-----------------------------------------------------------------------------
|                       load dependency function files                         |         
-----------------------------------------------------------------------------*/
$load->file('../API/Helpers.php');
$load->file("../API/Response.php");

/*Test variables
$_POST['cat']="Modifications";
$_POST['cmd']='remove-modification';
$_POST['modID']=1;
$_POST['field']="real";
$_POST['value']="contest-Timer";
*/



/*-----------------------------------------------------------------------------
|                       declare global variables                            
------------------------------------------------------------------------------*/
$cat=valid('cat',$_POST) ? $_POST['cat']:null;
$cmd=valid('cmd',$_POST) ? $_POST['cmd']:null;

switch($cat)
{
  # about operations     
  case 'About':
          $load->file(MODELSPATH."/M_About.php");
          $infoMgr=new AboutMgr();
          switch($cmd)
          {
              case 'get-about-info':
                  $info=$infoMgr->getAboutInfo();
                  Response::respondWithJSON($info,"about");
                  break;
              case 'update-info':
                        if(valid(array('field','value'),$_POST))
                        {
                                // Extract all values into variables and prefix with Ex for Extracted
                                extract($_POST,EXTR_PREFIX_ALL, 'Ex');
                                return (Response::passive($infoMgr->updateAboutInfo($Ex_field,$Ex_value)));
                        }
                        Response::passive(false);
                        break;
             default:
                       Response::passive(false);
                       break;
          }
          break;
  # Acknowldgement operations 
  case 'Acknowledgements':
        $load->file(MODELSPATH."/M_Acknowledgements.php");
        $ackMgr=new AcknowledgementMgr();
        switch($cmd)
        {
        case 'get-acknowledgements':
                $acks=$ackMgr->getAcknowledgements();
                Response::respondWithJSON($acks,"Acknowldgements");
                break;
        case 'add-acknowledgement':
                if(valid(array('project','website'),$_POST))
                {
                        extract($_POST, EXTR_PREFIX_ALL, 'Ex');
                        return (Response::passive($ackMgr->addAcknowledgement($Ex_project,$Ex_website)));   
                }
                return (Response::passive(false));
                break;
        case 'update-acknowledgement':
                if(valid(array('id','field','value'),$_POST))
                {
                        extract($_POST, EXTR_PREFIX_ALL, 'Ex');
                        return (Response::passive($ackMgr->updateAcknowledgement($Ex_id,$Ex_field,$Ex_value)));
                }
                return (Response::passive(false));
                break;
        default:
                return (Response::passive(false));
                break;        
        }
        break;
  
  # Contribution operations
  case 'Contributions':
        $load->file(MODELSPATH."/M_Contributors.php");  
        $contribMgr=new ContributorMgr();
        switch($cmd)
        {
        case 'get-contributions':
                $contribs=$contribMgr->getContributors();
                Response::respondWithJSON($contribs,"Contributors");
                break;
        case 'add-contributor':
                if(valid(array('fname','sname'),$_POST))
                {
                  extract($_POST,EXTR_PREFIX_ALL,'Ex');
                  return (Response::passive($contribMgr->addContributor($Ex_fname,$Ex_sname)));
                }
                return (Response::passive(false));
                break;
        case 'update-contributor':
                if(valid(array('id','contribution_count'),$_POST))
                {
                        extract($_POST,EXTR_PREFIX_ALL,'Ex');
                        return (Response::passive($contribMgr->updateContributor($Ex_id,$Ex_contribution_count)));
                }
                return (Response::passive(false));
                break;
        default:
                return (Response::passive(false));
        }  
        break;       


  # Guide operations
  case 'Guides':
       $load->file(MODELSPATH."/M_Guides.php");
       $guidesMgr=new GuideMgr();
       switch($cmd)
       {
          case 'get-guides':
               $guides=$guidesMgr->getGuides();
               Response::respondWithJSON($guides,"Guides");
               break;
          case 'add-guide':
                if(valid(array('guideName','guideContent'),$_POST))
                {
                      extract($_POST,EXTR_PREFIX_ALL,'Ex');
                      return (Response::passive($guidesMgr->addGuide($Ex_guideName,$Ex_guideContent)));
                }
                Response::passive(false);
                break;
         case  'remove-guide':
                if(valid(array('guideId'),$_POST))
                {
                      extract($_POST,EXTR_PREFIX_ALL,'Ex');
                      return (Response::passive($guidesMgr->removeGuide($Ex_guideId)));
                }
                Response::passive(false);
                break;
        case 'update-guide':
                if(valid(array('guideId','field','value'),$_POST))
                {
                      extract($_POST,EXTR_PREFIX_ALL,'Ex');
                      return (Response::passive($guidesMgr->updateGuide($Ex_guideId,$Ex_field,$Ex_value))); 
                }
                Response::passive(false);
                break;
        default:
                Response::passive(false);
       }
       break;
  # Modification operations
  case 'Modifications':
        $load->file(MODELSPATH."/M_Modifications.php");
        $modMgr=new ModificationsMgr();
        switch($cmd)
        {
                case 'get-modifications':
                        $mods=$modMgr->getModifications();
                        Response::respondWithJSON($mods,"Modifications");
                        break;
                case 'add-modification':
                        if(valid(array('mod','real','changes'),$_POST))
                        {
                           extract($_POST,EXTR_PREFIX_ALL,'Ex');
                           return (Response::passive($modMgr->addModification($Ex_mod,$Ex_real,$Ex_changes)));
                        }
                        Response::passive(false);
                        break;
                case 'remove-modification':
                        if(valid(array('modID'),$_POST))
                        {
                            extract($_POST,EXTR_PREFIX_ALL,'Ex');
                            return (Response::passive($modMgr->removeModification($Ex_modID)));
                        }
                        Response::passive(false);
                        break;
                case 'update-modification':
                        if(valid(array('modID','field','value'),$_POST))
                        {
                            extract($_POST,EXTR_PREFIX_ALL,'Ex');
                            return (Response::passive($modMgr->updateModification($Ex_modID,$Ex_field,$Ex_value)));
                        }
                        Response::passive(false);
                        break;
                default:
                Response::passive(false);
                break;
          }
        break;
  #no category was specified
  default :
    Response::passive(false);
    break;
}

?>