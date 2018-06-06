<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/6/6 0006
 * Time: 15:52
 */
class Store extends CI_Model
{

    private $tableName = 'data_stores';

    /**
     * 获取门店信息
     */
    public function selectStore()
    {
        return $this->db->get($this->tableName)->result();
    }

    /**
     * 添加门店信息
     */
    public function createStore($post,$data = [])
    {

        $data['store_name'] = $post['store_name'];

        $data['store_addr'] = $post['store_addr'];

        $data['store_img_url'] = $post['store_img_url'];

        $data['create_time'] = time();

        $res = $this->db->insert($this->tableName, $data);

        if($res) return true; else return false;

    }

    /**
     * 获取单个门店信息
     */
    public function storeFind($storid)
    {
        $res = $this->db->get_where($this->tableName, ['id'=>$storid]);

        if($res->result()){
            return $res->result()[0];
        }else{
            return false;
        }
    }

    /**
     * 删除单个门店信息
     */
    public function deleteStore($storid)
    {
        $res = $this->db->delete($this->tableName, ['id'=>$storid]);

        if($res) return true; else return false;
    }

    /**
     * 修改单个门店信息
     */
    public function updateStore($post,$data = [])
    {
        $data['store_name'] = $post['store_name'];

        $data['store_addr'] = $post['store_addr'];

        if($post['store_img_url']){
            $data['store_img_url'] = $post['store_img_url'];
        }

        $this->db->where('id', $post['store_id']);
        $res = $this->db->update($this->tableName,$data);

        if($res) return true; else return false;
    }

}