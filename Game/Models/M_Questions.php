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

    public function sanitize()
    {
        $questions=$this->getQuestions();
        $query='';
        foreach($questions as $question)
        {
            $str=$question['question'];
            if($str[strlen($str)-1]!='?') 
            {
                $question['question'].="?";
                $query.="update wkl_questions set question=\"{$question['question']}\" where question_id={$question['id']};";
            }
        }
        $this->_setSql($query);
        $this->_contactDB(TRUE);

        echo "done";
    }
   public function add($question,$answer,$tag,$cat,$UPDATE=FALSE,$id=null)
   {
       if($UPDATE){
           $query=sprintf('UPDATE wkl_questions SET question="%s" ,category="%s",difficulty="%s" where question_id=%d', $question,$cat,$tag,$id);
       }
       else{
           $query=sprintf('INSERT INTO wkl_questions(question,category,difficulty,last_access) VALUES("%s","%s","%s",CURTIME())',
                     $question,$cat,$tag);
       }
       
       $this->_setSql($query);
       $this->_contactDB();

       if(!$UPDATE)
       {
            // get the id of the just added Questions
            $this->_setSql("select question_id from wkl_questions order by question_id desc limit 1");
            $this->_contactDB();

            $id=$this->contactMgr->fetch_array(MYSQLI_ASSOC)['question_id'];
            $this->_setSql("insert into wkl_answers(to_qid,answer) values('{$id}','{$answer}')");
       }
       else{
           $this->_setSql("update wkl_answers set answer='{$answer}' where to_qid={$id}");
       }
      
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
   public function getQuestions($SINGLE=FALSE,$id=NULL)
   {
       if($SINGLE==TRUE && $id!=NULL){
           $this->_setSql("SELECT * FROM wkl_questions INNER JOIN wkl_answers ON wkl_questions.question_id=wkl_answers.to_qid 
                          where question_id={$id}");
       }
       else{
            $this->_setSql("SELECT * FROM wkl_questions INNER JOIN wkl_answers ON wkl_questions.question_id=wkl_answers.to_qid");
       }
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
        if(empty($this->tempArray)) $this->tempArray=null;
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
    
    public function removeQuestion($id)
    {
        $this->_setSql("delete from wkl_questions where question_id={$id};delete from wkl_answers where to_qid={$id};");
        $this->_contactDB(TRUE);
        
     
        return true;
    }
}
?>