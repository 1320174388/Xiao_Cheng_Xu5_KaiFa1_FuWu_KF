<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/5/21
 * Time: 12:54
 */

class Makes extends CI_Model {

    private $CI;

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    public function get_reserve_list_by_status( $status ){
        $makes = $this->CI->db->get_where( 'data_makes', [ 'make_status' => $status ] );
        return $makes->result();
    }

    public function update_status( $ids ){

        $this->CI->db->where('id in('.$ids.')');
        $result = $this->CI->db->update( 'data_makes', [ 'make_status' => 2 ] );
        return $result;
    }

    public function add_info( $name, $phone, $sex = 1 ){
        $result = $this->CI->db->insert( 'data_makes', [
            'make_name' => $name,
            'make_phone' => $phone,
            'make_sex' => $sex,
            'make_status' => 1,
            'make_time' => date('Y-m-d H:i',time())
        ] );

        return $result;
    }
}