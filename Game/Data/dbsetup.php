<?php
$db=new sqlite3('Gameinfo.db');

$sql=sprintf("describe  modifications");
$result=$db->query($sql);
var_dump($result);
/*
$count=0;
while($count<$result->changes())
{
    $row=
}
*/
?>