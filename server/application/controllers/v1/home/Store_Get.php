<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 17:51
 */
class Store_Get extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Store');
    }

    /**
     * 名称: get_Store()
     * 功能: 获取门店信息
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function get_Store()
    {
        $res = $this->Store->selectStore();

        return return_response( 0, '请求成功',$res);
    }
}