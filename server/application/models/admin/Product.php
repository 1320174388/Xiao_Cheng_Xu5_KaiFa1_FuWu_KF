<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 19:34
 */
class Product extends CI_Model
{
    private $tableName = 'data_products';

    /**
     * 获取产品信息
     */
    public function selectProduct()
    {
        return $this->db->get($this->tableName)->result();
    }

    /**
     * 添加产品信息
     */
    public function createProduct($post,$data = [])
    {

        $data['product_name'] = $post['product_name'];

        $data['product_info'] = $post['product_info'];

        $data['product_img_url'] = $post['product_img_url'];

        $data['create_time'] = time();

        $res = $this->db->insert($this->tableName, $data);

        if($res) return true; else return false;

    }

    /**
     * 获取单个产品信息
     */
    public function ProductFind($productid)
    {
        $res = $this->db->get_where($this->tableName, ['id'=>$productid]);

        if($res->result()){
            return $res->result()[0];
        }else{
            return false;
        }
    }

    /**
     * 获取对应名称产品信息
     */
    public function ProductNameFind($productName)
    {
        $res = $this->db->get_where($this->tableName, ['product_name'=>$productName]);

        if($res->result()){
            return $res->result()[0];
        }else{
            return false;
        }
    }

    /**
     * 删除单个产品信息
     */
    public function deleteProduct($productid)
    {
        $res = $this->db->delete($this->tableName, ['id'=>$productid]);

        if($res) return true; else return false;
    }

    /**
     * 修改单个产品信息
     */
    public function updateProduct($post,$data = [])
    {
        $data['product_name'] = $post['product_name'];

        $data['product_info'] = $post['product_info'];

        if($post['product_img_url']){
            $data['product_img_url'] = $post['product_img_url'];
        }

        $this->db->where('id', $post['product_id']);
        $res = $this->db->update($this->tableName,$data);

        if($res) return true; else return false;
    }

}