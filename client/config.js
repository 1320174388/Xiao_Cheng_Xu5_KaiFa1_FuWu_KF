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
    }


};

module.exports = config;