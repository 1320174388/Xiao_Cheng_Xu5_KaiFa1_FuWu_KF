<?php
/**
 * Created by PhpStorm.
 * User: Yanjie
 * Date: 2018/5/21
 * Time: 12:52
 */

class Reserve extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('admin/Makes');
        $this->load->library('validateclass');
    }

    public function subit(){

        $name = $this->input->post('name');

        if($this->validateclass->validator( $name, 'empty' )) {
            return return_response( 1, '请输入姓名');
        }

        $phone = $this->input->post('phone');

        if($this->validateclass->validator( $phone, 'phone' )) {
            return return_response( 2, '请正确输入电话号码');
        }

        $sex = $this->input->post('sex');

        if($this->validateclass->validator( $sex, 'empty' )) {
            $sex = '用户未输入性别';
        }

        $result = $this->Makes->add_info( $name, $phone, $sex );

        if($result){
            return return_response( 0, '预约成功');
        }else{
            return return_response( 3, '预约失败');
      }

    }

}