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
        $this->load->library('validateclass');
    }

    public function lists(){

        $status = $this->input->post('status');

        $type = $this->validateclass->validator( $status, 'int' );

        if( $type ) return return_response( 2, '参数错误');

        $result = $this->Makes->get_reserve_list_by_status( $status );

        return return_response( 0, '请求成功', $result );

    }

    public function update(){

        $ids = $this->input->post('ids');

        if(!$ids){
            return return_response( 2, '缺少参数');
        }

        $res = $this->Makes->update_status( $ids );

        if($res){
            return return_response( 0,'处理成功');
        }else{
            return return_response( 3,'处理失败');
        }

    }

}