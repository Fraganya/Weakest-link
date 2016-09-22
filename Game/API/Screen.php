<?php
  class Screen{
    public function __construct()
    {
      
    }
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
