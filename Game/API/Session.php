<?php
/**
 * Game session class
 * intialises the game and is used to hold game structure during runtime
 * @author Francis Ganya
 */
class Session 
{
    private $playerCount;
    private $status;
    private $id;
    private $difficulty;
    private $playTime;
    private $winner;
    private $questions;
    private $accuracy;
    private $money_accumalated;
    public $type;
    public $teamTag;
    
    /**
     * Initalise the game sesison 
     * and set all props that will be involved in increment operations to 0
     * @param string $gameType
     */
    public function __construct($gameType,$difficulty)
    {
        $this->type=$gameType;
        $this->status='init';
        $this->questions=0;
        $this->playTime=0;
        $this->money_accumalated=0;
        $this->teamTag='unused';
        $this->difficulty=$difficulty;
    }
    
    /**
     * sets or gets the game id
     * @param string $operation
     * @param string $value
     * @return string
     */
    public function id($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->id;
        }
        
        $this->id=$value;
    }
    
    /**
     * status sets or gets the status of this game
     * @param string $operation
     * @param string $value
     * @return string
     */
    public function status($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->status;
        }
        
        $this->status=$value;
    }
    
    /**
     * sets or gets the difficulty of this game
     * @param string $operation
     * @param string $value
     * @return string
     */
    public function difficulty($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->difficulty;
        }
        
        $this->difficulty=$value;
    }
    /**
     * gets or sets the player count
     * @param string $operation
     * @param string $value
     * @return string
     */
    public function player_count($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->playerCount;
        }
        
        $this->playerCount=$value;
    }
   
    /**
     *  gets or sets the accuracy of the game
     * @param string $operation
     * @param string $value
     * @return string
     */
     public function accuracy($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->accuracy;
        }
        
        $this->accuracy=$value;
    }
    
    /**
     * gets or sets the team tag property of this game
     * @param string $operation
     * @param string $value
     * @return string
     */
    public function team_tag($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->teamTag;
        }
        
        $this->teamTag=$value;
    }
    
    /**
     * gets or sets the winner of this game
     * @param string $operation
     * @param string $value
     * @return string
     */
    public function winner($operation='SET',$value=NULL)
    {
        if($operation=='GET' && $value==NULL)
        {
            return $this->winner;
        }
        
        $this->winner=$value;
    }
    /**
     * updates the status of the game
     * @param string $newStatus
     */
    public function update_status($newStatus)
    {
        $this->status=$newStatus;
    }
    
    /**
     * updates the number of questions asked during the game runtime
     * @param integer $newQCount
     */
    public function update_questions($newQCount)
    {
        $this->questions+=$newQCount;
    }
    
    /**
     * updates the money accumulated during the game runtime
     * @param integer $newMoney
     */
    public function update_money($newMoney)
    {
        $this->money_accumalated+=$newMoney;
    }
    
    /**
     * updates the game playtime
     * @param integer $newPlayTime
     */
    public function update_playTime($newPlayTime)
    {
        $this->playTime+=$newPlayTime;
    }
       
    
}
