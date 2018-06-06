<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 15:38
 */
class Store_Management extends LoginController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Store');
        $this->load->helper('token');
        $this->load->helper('uploads');
    }

    /**
     * 名称: add_Store()
     * 功能: 添加门店信息
     * 参数: $token          => '用户令牌',
     * 参数: $store_name     => '门店名称',
     * 参数: $store_addr     => '门店地址',
     * 参数: $store_img_file => '图片文件',
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function add_Store()
    {
        $post = $this->input->post();

        if(!$post['store_name']) return return_response( 2, '请填写门店名称');

        if(!$post['store_addr']) return return_response( 3, '请填写门店地址');

        $post['store_img_url'] = upload_create('store','store_img_file');

        if(!$post['store_img_url']){
            return return_response( 4, '请正确上传门店图片');
        }

        $res = $this->Store->createStore($post);

        if($res){
            return return_response( 0, '添加成功');
        }else{
            return return_response( 5, '添加失败');
        }

    }

    /**
     * 名称: del_Store()
     * 功能: 删除门店信息
     * 参数: $token    => '用户令牌',
     * 参数: $store_id => '门店ID',
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function del_Store()
    {
        $post = $this->input->post();

        if(!$post['store_id']) return return_response( 2, '请发送要删除的门店ID');

        $storeInfo = $this->Store->storeFind($post['store_id']);

        @upload_delete($storeInfo->store_img_url);

        $res = $this->Store->deleteStore($post['store_id']);

        if($res){
            return return_response( 0, '删除成功');
        }else{
            return return_response( 3, '删除失败');
        }
    }

    /**
     * 名称: edit_Store()
     * 功能: 修改门店信息
     * 参数: $token    => '用户令牌',
     * 参数: $store_id => '门店ID',
     * 参数: $store_addr     => '门店地址',
     * 参数: $store_img_file => '图片文件',
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function edit_Store()
    {
        $post = $this->input->post();

        if(!$post['store_id']) return return_response( 2, '请发送要修改的门店ID');

        if(!$post['store_name']) return return_response( 3, '请填写门店名称');

        if(!$post['store_addr']) return return_response( 4, '请填写门店地址');

        $post['store_img_url'] = upload_create('store','store_img_file');

        if($post['store_img_url']){
            $storeInfo = $this->Store->storeFind($post['store_id']);
            @upload_delete($storeInfo->store_img_url);
        }

        $res = $this->Store->updateStore($post);

        if($res){
            return return_response( 0, '更新成功');
        }else{
            return return_response( 5, '更新失败');
        }

    }
}