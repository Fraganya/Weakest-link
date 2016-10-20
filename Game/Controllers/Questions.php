<?php
/**
 *  include required files
 */
$load=new Asset();
$load->file(APIPATH.'Session.php');
$load->file(APIPATH.'Response.php');
$load->file(MODELSPATH.'M_WKL_BASE.php');
$load->file(MODELSPATH.'M_Questions.php');
/**
 * Main questions  controller
 */
class Questions
{
    /**
     * holds the questions model
     * @var object 
     */
    private $questionMgr;
    /**
     * initialise controller variables here 
     */
    public function __construct()
    {
        $this->questionMgr=new WKL_QuestionMgr();
    }
    /**
     * returns the number of questions in the main DB
     * @return int
     */
    public function count()
    {
        $count=$this->questionMgr->getQuestionCount();
        return Response::respondWithJSON(array('count'=>$count),"questions");
    }
   /**
    * gets all the questions in the DB
    * @return object
    */
   public function all()
   {
       $data=$this->questionMgr->getQuestions();
       return Response::respondWithJSON($data,"questions");
   }

   /**
   * adds a question into the DB and associated answer in the answer table
   *@return bool
   */
   public function add()
   {
       if(valid(array('question','answer','tag','category'),$_POST))
       {
           extract($_POST,EXTR_PREFIX_ALL,'Ex');
           return Response::passive($this->questionMgr->add($Ex_question,$Ex_answer,$Ex_tag,$Ex_category));
       }
   }
   /**
    * gets the questions tagged easy
    * @return object
    */
   public function getEasy()
   {
       $data=$this->questionMgr->getByDifficulty();
       return Response::respondWithJSON($data,"questions");
   }
   /**
    * gets all questions tagged medium
    * @return object
    */
   public function getMedium()
   {
       $data=$this->questionMgr->getByDifficulty("medium");
       return Response::respondWithJSON($data,"questions");
   }

   /**
    * gets all questions tagged brainy
    * @return object
    */
   public function getBrainy()
   {
       $data=$this->questionMgr->getByDifficulty("brainy");
       return Response::respondWithJSON($data,"questions");
   }

    /**
     * gets the number of difficult questions tagged brainy
     * @return int
     */
   public function brainy_count()
   {
       $data=$this->questionMgr->getByDifficulty("brainy");
       Response::respondWithJSON(array('count'=>count($data)),"questions");
   }
}

?>