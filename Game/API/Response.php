<?php
/**
 * Response class that handles all Ajax responses
 * @author Francis Ganya
 */
class Response
{
    
    /**
     * echoes a response message that is derived from the boolean status
     * @param bool $status
     */
    public static function passive($status)
    {
        echo ($status ? 'true' : 'false');
    }

    /**
     * echo an encoded json text 
     * @param mixed $arr
     * @param string $j_object
     */
    public static function respondWithJSON($arr,$j_object)
    {   
            echo json_encode($arr);   
    }
}
?>