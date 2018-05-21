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

    public function lists(){
        $status = $this->input->post('status');

        $status = $this->validateclass->validator( $status, 1 );
        $result = $this->Makes->getreserve_list_by_status( $status );

        return $result;
    }

    public function update(){
        $id = $this->input->post('id');
        $status = $this->input->post('status');

        if( !$id || !$status ){
            return return_response( 0, '缺少参数');
        }

        $result = $this->Makes->update_status( $id, $status );

        return return_response( (int) $result, $result );
    }

}