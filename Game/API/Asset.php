<?php
  class Asset{
  /**
  * js
  * create a formatted javascript html tag
  *
  * @param	string file name
  * @param	string type of script
  * @return	string
  */
  public function js($filename,$type="text/javascript")
  {
      return "<script src='".SERVER.APPNAME."/Game/Assets/js/".$filename.".js' type='".$type."'></script>";
  }

  /**
  * css
  * create a formatted css html link tag
  *
  * @param	string file name
  * @return	string
  */
  public function css($filename)
  {
      return "<link href='".SERVER.APPNAME."/Game/Assets/css/".$filename.".css' rel='stylesheet'/>";
  }

  /**
  * image
  * create a formatted image html tag
  *
  * @param	string file name
  * @param	string css class
  * @param  string alt name
  * @return	string
  */
  public function image($filename,$styles="",$alt="img")
  {
      return "<img src'".SERVER.APPNAME."/Game/Data/visuals/".$filename."' class='".$styles."'' alt='".$alt."/>";
  }

  /**
  * file
  * includes the specified file after checking existence
  *
  * @param	string file path
  * @param  string $data any items that the required file may need from the owner
  * @return	bool
  */
  public function file($filepath,$data=null)
  {
    if(file_exists($filepath))
    {
        //
      if($data)
      {
         foreach($data as $var=>$value)
          {
            ${$var}=$value;
          }
      }
      require_once($filepath);
    }
    else
    {
        trigger_error("Can not access {$filepath}");
    }
  }

  
  /**
  * link
  * create a formatted  html link tag
  *
  * @param	string file name
  * @return	string
  */
  public function icon($filename,$relationshirp='icon')
  {
      return "<link href='".SERVER.APPNAME."/Game/Data/Visuals/Icons/".$filename.".ico' rel='".$relationshirp."'/>";
  }

}
  

?>
