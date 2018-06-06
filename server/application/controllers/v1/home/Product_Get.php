<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 20:31
 */
class Product_Get extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Product');
    }

    /**
     * 名称: get_Product()
     * 功能: 获取产品信息
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function get_Product()
    {
        $res = $this->Product->selectProduct();

        return return_response( 0, '请求成功',$res);
    }
}