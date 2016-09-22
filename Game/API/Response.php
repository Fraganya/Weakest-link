<?php
class Response
{
    public static function passive($status)
    {
        echo ($status ? 'true' : 'false');
    }

    public static function respondWithJSON($arr,$j_object)
    {
        echo "{'{$j_object}':";
        echo json_encode($arr);
        echo "}";
    }
}
?>