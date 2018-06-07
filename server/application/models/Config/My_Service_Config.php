<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/16 0016
 * Time: 14:23
 */
class My_Service_Config extends CI_Model
{
    private $CI;

    private $tableName = 'data_config_info';

    public function __construct()
    {
        $this->CI =& get_instance();
        parent::__construct();
    }

    /**
     * 名称: create_service_config()
     * 功能: 添加一条配置信息
     */
    public function insert_service_config($values)
    {
        $query_sql = $this->insert_data_arr($values);

        return $this->CI->db->query($query_sql);
    }

    /**
     * 名称: delete_service_config()
     * 功能: 删除数据库内数据
     */
    public function delete_service_config($where)
    {
        $query_sql = "delete from {$this->tableName} where {$where}";

        return $this->CI->db->query($query_sql);

    }

    /**
     * 名称: select_service_config()
     * 功能: 查看数据库内信息
     */
    public function select_service_config($field,$where)
    {
        $query_sql = "select {$field} from {$this->tableName} ";

        if($where){
            $query_sql .= " where {$where}";
        }

        return $this->CI->db->query($query_sql)->result();

    }

    /**
     * 名称: get_notice_image_number()
     * 功能: 获取推荐位图片最大下标
     */
    public function get_notice_image_number()
    {
        $query_sql = "select config_infos from {$this->tableName} ";

        $query_sql .= " where config_type = 'notice_image'";

        $query_sql .= " order by config_infos+0 desc";

        return $this->CI->db->query($query_sql)->result()[0]->config_infos;
    }

    /**
     * 名称: insert_data_arr()
     * 功能: 处理添加配置信息时传递的数据信息
     * 参数: array()
     */
    private function insert_data_arr($values)
    {
        $query_sql = "insert into {$this->tableName}(";

        $query_sql .= $this->insert_data_arr_key($values);

        $query_sql .= ') values(';

        $query_sql .= $this->insert_data_arr_values($values);

        $query_sql .= ')';

        return $query_sql;
    }

    /**
     * 名称: insert_data_arr_key()
     * 功能: 处理数组信息的字段名
     * 参数: array()
     */
    private function insert_data_arr_key($values,$num = 0)
    {
        $query_sql = '';
        foreach($values as $k=>$v)
        {
            if(is_array($v)){
                foreach($v as $key=>$value)
                {
                    if($num == 1){
                        $query_sql .= ','.$key;
                    } else {
                        $query_sql .= $key;
                        $num++;
                    }
                }
                return $query_sql;
            }else{
                if($num == 1){
                    $query_sql .= ','.$k;
                } else {
                    $query_sql .= $k;
                    $num++;
                }
            }
        }
        return $query_sql;
    }

    /**
     * 名称: insert_data_arr_values()
     * 功能: 处理数组信息的数据
     */
    public function insert_data_arr_values($values,$num = 0,$number = 1)
    {
        $query_sql = '';

        foreach($values as $k=>$v)
        {
            if(is_array($v)){
                if($num >= 2){
                    $query_sql .= '),(';
                    foreach($v as $key=>$value) {
                        if($number == $num){
                            $query_sql .= ','.'\''.$value.'\'';
                        } else {
                            $query_sql .= '\''.$value.'\'';
                            $number++;
                        }
                    }
                    $num++;
                } else {
                    foreach($v as $key=>$value) {
                        if($num == 1){
                            $query_sql .= ','.'\''.$value.'\'';
                        } else {
                            $query_sql .= '\''.$value.'\'';
                            $num++;
                        }
                    }
                    $num++;
                }
            }else{
                if($num == 1){
                    $query_sql .= ','.'\''.$v.'\'';
                } else {
                    $query_sql .= '\''.$v.'\'';
                    $num++;
                }
            }
        }
        return $query_sql;
    }

}