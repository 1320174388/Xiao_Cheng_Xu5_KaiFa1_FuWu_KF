/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://biqzdow9.qcloud.la';

// 图片url路径地址
var host_image_Url = 'https://lg-14y7j4wa-1256666116.cos.ap-shanghai.myqcloud.com';

var config = {
    // 下面的地址配合云端 Demo 工作
    service: {
        host,
        host_image_Url,
        // 测试登录接口,获取令牌
        cheshiUrl: `${host}/api/home/login`,
        // 请求管理员可管理模块信息
        getAdminModular: `${host}/api/admin/Modular/getAdminModular`,
    },
    // 信息管理接口地址
    infomation: {
      host,
      // 获取项目配置信息接口
      get_service_config_type: `${host}/api/home/Get_Service_Config/Get_Service_Config_Type`,
      // 请求轮播图接口
      sowing_map_file: `${host}/api/admin/Set_Service_Config/Set_Config_Sowing_Map`,
      // 请求添加展示图接口
      set_notice_image_file: `${host}/api/admin/Set_Service_Config/Set_Config_Notice_Image`,
      // 请求删除展示图接口
       del_notice_image_file: `${host}/api/admin/Set_Service_Config/Del_Config_Notice_Image`,
      // 配置信息接口
      set_config_config_details: `${host}/api/admin/Set_Service_Config/Set_Config_Config_Details`,
      //获取推荐位产品信息接口
      get_product: `${host}/api/home/Product_Get/get_Product`,
      //请求推荐位信息接口
      set_config_product_key: `${host}/api/admin/Set_Service_Config/Set_Config_Product_Key`,
      //请求推荐位信息接口
      del_config_product_key: `${host}/api/admin/Set_Service_Config/Del_Config_Product_Key`,
    },
    //预约接口地址
    Subscribe:{
      host,
      // 预约提交
      Subscribe_file: `${host}/api/home/reserve/subit`,
      // 查看预约
      Subscribe_lists: `${host}/api/admin/reserve/lists`,
      // 处理预约
      Subscribe_update: `${host}/api/admin/reserve/update`,
    },
    //产品
    Product:{
      host,
      //获取产品信息接口
      Get_Product_file: `${host}/api/home/Product_Get/get_Product`,
      //添加产品信息
      Add_Product_file: `${host}/api/admin/Set_Product/add_Product`,
      //删除产品信息
      Del_Product_file: `${host}/api/admin/Set_Product/del_Product`,
      //修改产品信息
      Edit_Product_file: `${host}/api/admin/Set_Product/edit_Product`
    }
};

module.exports = config;