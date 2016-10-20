<?php

/**
 * Handles all requests to do with the questions
 */
class WKL_QuestionMgr extends M_WKL_BASE
{
   public function __construct()
   {
       parent::__construct();
   }
   
   /**
    * adds a question and answer to the main DB
    * @param type $question
    * @param type $answer
    * @param type $tag
    * @param type $cat
    * @return boolean
    */
   public function add($question,$answer,$tag,$cat)
   {
       $query=sprintf('INSERT INTO wkl_questions(question,category,difficulty,last_access) VALUES("%s","%s","%s",CURTIME())',
                     $question,$cat,$tag);
       $this->_setSql($query);
       $this->_contactDB();

       // get the id of the just added Questions
       $this->_setSql("select question_id from wkl_questions order by question_id desc limit 1");
       $this->_contactDB();

       $id=$this->contactMgr->fetch_array(MYSQLI_ASSOC)['question_id'];

       $this->_setSql("insert into wkl_answers(to_qid,answer) values('{$id}','{$answer}')");
       $this->_contactDB();

       return true;
   }
   /**
    * gets number of questions in the main DB
    * @return int
    */
   public function getQuestionCount()
   {
       $this->_setSql("select question_id from wkl_questions");
       $this->_contactDB();

        $count=0;
        while($row=$this->contactMgr->fetch_array(MYSQLI_ASSOC))
        {
              $count++ ;     
        }

        return $count;
   }
   
   /**
    * gets question data from the main production DB
    * @return array
    */
   public function getQuestions()
   {
       $this->_setSql("SELECT * FROM wkl_questions INNER JOIN wkl_answers ON wkl_questions.question_id=wkl_answers.to_qid");
       $this->_contactDB();

       //encode the questions into an array
        for($counter=0;$counter<$this->contactMgr->num_rows;$counter++)
        {
            $c_question=$this->contactMgr->fetch_array(MYSQLI_ASSOC);
            $this->tempArray[]=array(
                'id'=>$c_question['question_id'],
                'question'=>$c_question['question'],
                'answer'=>$c_question['answer'],
                'cat'=>$c_question['category'],
                'last_accessed'=>$c_question['last_access']

            );
        }

        return $this->tempArray;
   }
   
   /**
    * gets all questions tagged by the @var difficulty
    * @param type $difficulty
    * @return type
    */
   public function getByDifficulty($difficulty="easy")
   {
       //get questions and corresponding answers in the DB
       $query=sprintf("SELECT * FROM wkl_questions INNER JOIN wkl_answers ON wkl_questions.question_id=wkl_answers.to_qid WHERE difficulty='%s'",
                      $difficulty);
       $this->_setSql($query);
       $this->_contactDB();

       //encode the questions into an array
        for($counter=0;$counter<$this->contactMgr->num_rows;$counter++)
        {
            $c_question=$this->contactMgr->fetch_array(MYSQLI_ASSOC);
            $this->tempArray[]=array(
                'id'=>$c_question['question_id'],               
                'question'=>$c_question['question'],
                'answer'=>$c_question['answer'],
                'cat'=>$c_question['category'],
                'last_accessed'=>$c_question['last_access']

            );
        }
        if(empty($this->tempArray)) $this->tempArray=array();
        return $this->tempArray;
   }
   
}
?>