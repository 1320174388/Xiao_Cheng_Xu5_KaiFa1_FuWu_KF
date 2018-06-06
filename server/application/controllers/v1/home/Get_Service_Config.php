<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/17 0017
 * Time: 21:14
 */
class Get_Service_Config extends CI_Controller {

    private $config_type_key = [
        'config_data',
        'sowing_map',
        'product_key',
        'notice_image',
        'config_details'
    ];

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Config/My_Service_Config');
        $this->load->model('admin/Product');
    }

    /**
     * 名称: Get_Service_Sowing_Map()
     * 功能: 获取配置信息接口
     * 参数: service_type = config_data  获取所有项目数据信息
     * 参数: service_type = sowing_map 首页轮播图img_url路径地址
     * 参数: service_type = product_key 推荐位产品的信息
     * 参数: service_type = notice_image 展示位图片的img_url路径地址
     * 参数: service_type = config_details 获取项目配置项信息
     */
    public function Get_Service_Config_Type()
    {
        $service_type = $this->input->post('service_type');

        if(!$service_type) {
            return return_response( 1, '请发送数据标识');
        }

        if(!in_array($service_type,$this->config_type_key)){
            return return_response( 2, '数据标识发送错误');
        }

        $config_data = $this->Get_Service_Success_Data($service_type);

        return return_response( 0, '请求成功',$config_data);

    }

    /**
     * 名称: Get_Service_Success_Data()
     * 功能: 判断用户是否发送数据
     */
    private function Get_Service_Success_Data($service_type)
    {

        if( $service_type == 'config_data' ){
            $data = [];
            $data['sowing_map']     = $this->Get_Service_Sowing_Map();
            $data['product_key']    = $this->Get_Service_Product_Key();
            $data['notice_image']   = $this->Get_Service_Notice_Image();
            $data['config_details'] = $this->Get_Service_Config_Details();
            return $data;
        }
        if( $service_type == 'sowing_map' ) {
            return $this->Get_Service_Sowing_Map();
        }
        if( $service_type == 'product_key' ) {
            return $this->Get_Service_Product_Key();
        }
        if( $service_type == 'notice_image' ) {
            return $this->Get_Service_Notice_Image();
        }
        if( $service_type == 'config_details' ) {
            return $this->Get_Service_Config_Details();
        }

    }

    /**
     * 名称: Get_Service_Sowing_Map()
     * 功能: 获取轮播图数据信息
     */
    private function Get_Service_Sowing_Map()
    {
        return $this->My_Service_Config->select_service_config(
            'config_index,config_infos,config_content',
            "config_type = 'sowing_map' order by config_infos asc"
        );
    }

    /**
     * 名称: Get_Service_Product_Key()
     * 功能: 获取推荐位图片信息
     */
    private function Get_Service_Product_Key()
    {
        $data = $this->My_Service_Config->select_service_config(
            'config_index,config_content',
            "config_type = 'product_key'"
        );

        foreach($data as $key => $value){
            $res = $this->Product->ProductFind($value->config_content);
            $value->config_content = $res;
        }

        return $data;
    }

    /**
     * 名称: Get_Service_Notice_Image()
     * 功能: 获取展示位图片信息
     */
    private function Get_Service_Notice_Image()
    {
        return $this->My_Service_Config->select_service_config(
            'config_index,config_content',
            "config_type = 'notice_image'"
        );
    }

    /**
     * 名称: Get_Service_Config_Details()
     * 功能: 获取项目配置信息
     */
    private function Get_Service_Config_Details()
    {
        $config_details =  $this->My_Service_Config->select_service_config(
            'config_index,config_name,config_content',
            "config_type = 'config_details'"
        );

        $config_details_data = [];

        foreach ( $config_details as $key => $value )
        {
            $config_details_data[$value->config_name] = $config_details[$key];
        }

        return $config_details_data;
    }

}