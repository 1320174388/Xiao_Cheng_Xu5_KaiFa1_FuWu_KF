<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 19:30
 */
class Set_Product extends LoginController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin/Product');
        $this->load->model('Config/My_Service_Config');
        $this->load->helper('token');
        $this->load->helper('uploads');
    }

    /**
     * 名称: add_Product()
     * 功能: 添加产品信息
     * 参数: $token            => '用户令牌',
     * 参数: $product_name     => '产品名称',
     * 参数: $product_info     => '产品介绍',
     * 参数: $product_img_file => '图片文件',
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function add_Product()
    {
        $post = $this->input->post();

        if(!$post['product_name']) return return_response( 2, '请填写产品名称');

        if(!$post['product_info']) return return_response( 3, '请填写产品介绍');

        $product_name = $this->Product->ProductNameFind($post['product_name']);

        if($product_name) return return_response( 4, '产品名称已存在');

        $post['product_img_url'] = upload_create('product','product_img_file');

        if(!$post['product_img_url']){
            return return_response( 5, '请正确上传产品图片');
        }

        $res = $this->Product->createProduct($post);

        if($res){
            return return_response( 0, '添加成功');
        }else{
            return return_response( 5, '添加失败');
        }

    }

    /**
     * 名称: del_Product()
     * 功能: 删除产品信息
     * 参数: $token      => '用户令牌',
     * 参数: $product_id => '产品ID',
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function del_Product()
    {
        $post = $this->input->post();

        if(!$post['product_id']) return return_response( 2, '请发送要删除的产品ID');

        $product_key = $this->My_Service_Config->select_service_config(
            'config_index',
            "config_type = 'product_key' and config_content = {$post['product_id']}"
        );

        if($product_key){
            return return_response( 3, '产品已被推荐');
        }

        $productInfo = $this->Product->ProductFind($post['product_id']);

        @upload_delete($productInfo->product_img_url);

        $res = $this->Product->deleteProduct($post['product_id']);

        if($res){
            return return_response( 0, '删除成功');
        }else{
            return return_response( 4, '删除失败');
        }
    }

    /**
     * 名称: edit_Product()
     * 功能: 修改产品信息
     * 参数: $token            => '用户令牌',
     * 参数: $product_id       => '产品ID',
     * 参数: $product_name     => '产品名称',
     * 参数: $product_info     => '产品介绍',
     * 参数: $product_img_file => '图片文件',
     * 返回: {'errNum':'返回编号','retMsg':'提示信息','retData':'返回数据'}
     */
    public function edit_Product()
    {
        $post = $this->input->post();

        if(!$post['product_id']) return return_response( 2, '请发送要修改的产品ID');

        if(!$post['product_name']) return return_response( 3, '请填写产品名称');

        if(!$post['product_info']) return return_response( 4, '请填写产品介绍');

        $product_name = $this->Product->ProductNameFind($post['product_name']);

        if($product_name && ($post['product_id']!=$product_name->id)){
            return return_response( 5, '产品名称已存在');
        }

        $post['product_img_url'] = upload_create('product','product_img_file');

        if($post['product_img_url']){
            $productInfo = $this->Product->ProductFind($post['product_id']);
            @upload_delete($productInfo->product_img_url);
        }

        $res = $this->Product->updateProduct($post);

        if($res){
            return return_response( 0, '更新成功');
        }else{
            return return_response( 6, '更新失败');
        }

    }
}