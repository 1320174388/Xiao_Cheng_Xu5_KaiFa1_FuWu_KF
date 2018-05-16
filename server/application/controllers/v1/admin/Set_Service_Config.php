<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/16 0016
 * Time: 14:07
 */
class Set_Service_Config extends LoginController
{

    /**
     * 名称: __construct()
     * 功能: 加载父类构造函数、加载本类控制器需要使用类库文件、加载Model模型类
     */
       public function __construct(){
        parent::__construct();
        $this->load->model('Config/My_Service_Config');
        $this->load->helper('token');
        $this->load->helper('uploads');
        $this->load->helper('deletedir');
    }

    /**
     * 名称: Set_Config_Sowing_Map()
     * 功能: 设置首页轮播图配置信息接口
     * 参数: string the_first_map = 1; 功能：如果是 1 删除数据库内原来的轮播图
     * 参数: file sowing_map_file 图片文件信息
     */
    public function Set_Config_Sowing_Map()
    {
        $the_first_map = $this->input->post('the_first_map');

        if($the_first_map){
            $this->My_Service_Config->delete_service_config('config_type = \'sowing_map\'');
            deldir('./uploads/sowingmap');
        }

        $sowing_map_file = upload_create('sowingmap','sowing_map_file');

        if($sowing_map_file){

            $res = $this->My_Service_Config->insert_service_config([
                'config_index'   => token(),
                'config_name'    => '轮播图',
                'config_type'    => 'sowing_map',
                'config_content' => $sowing_map_file,
                'config_infos'   => $the_first_map
            ]);

            if($res){
                return return_response( 0, '上传成功');
            }else{
                return return_response( 3, '上传失败');
            }

        }else{
            return return_response( 2, '请正确上传图片');
        }

    }

    /**
     * 名称: Set_Config_Product_Key()
     * 功能: 推荐位信息管理接口
     * 参数: product_key 被选中要被添加到推荐位产品的主键ID字符串 1,2,3
     */
    public function Set_Config_Product_Key()
    {
        $product_key = $this->input->post('product_key');

        if($product_key){
            return_response( 2, '请选择产品');
        }

        $product_key_Arr = explode(',',$product_key);

        $product_data_Arr = $this->product_data_Arr($product_key_Arr);

        $res = $this->My_Service_Config->insert_service_config($product_data_Arr);

        return $this->json($res);

        if($res){
            return return_response( 0, '添加成功');
        }else{
            return return_response( 3, '添加失败');
        }

    }

    /**
     * 名称: product_data_Arr()
     * 功能: 处理推荐位信息数据格式
     */
    private function product_data_Arr($product_key_Arr)
    {
        $product_data_Arr = [];

        foreach($product_key_Arr as $k=>$v)
        {
            $product_data_Arr[] = $this->product_data_find($v);
        }

        return $product_data_Arr;
    }

    /**
     * 名称: product_data_find()
     * 功能: 返回单一数据格式
     */
    private function product_data_find($product_key)
    {
        return [
            'config_index'   => token(),
            'config_name'    => '推荐位图片',
            'config_type'    => 'product_key',
            'config_content' => $product_key,
        ];
    }
}