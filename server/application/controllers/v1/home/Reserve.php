<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/5/21
 * Time: 12:52
 */

class Reserve extends LoginController {

    public function __construct(){
        parent::__construct();
        $this->load->model('admin/Makes');
    }

    public function subit(){
        $name = $this->input->post('name');
        $phone = $this->input->post('phone');
        $sex = $this->input->post('sex');
        if( !$name || !$phone ){
            return return_response( 0, '缺少参数' );
        }
        $result = $this->Makes->add_info( $name, $phone, $sex );

        return $result;
    }

}