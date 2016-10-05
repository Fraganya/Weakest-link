<?php
/**
 * The screen class loads a screen [page]
 * it cannot be instanciated as it has static functions only
 */
  class Screen{
    public function __construct()
    {
      
    }
    /**
     * render loads the passed in screen name 
     * and creates variables from the associative indices of the passed in array
     * @param string $screenPage
     * @param object $data
     */
    public static function render($screenPage,$data)
    {
      //explode the elements of the $data array into variables
     if($data)
     {
        foreach($data as $var=>$value)
          {
            ${$var}=$value;
          }
     }
      require_once(SCREENSPATH.$screenPage.'.php');
    }
   
  }
?>
