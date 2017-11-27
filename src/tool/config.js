/*
* Copyright 杭州异人异想网络科技有限公司  异人异想手机网贷理财wap版软件 All Rights Reserved
* @version 1.0
*/
const config = {
    //ip:'https://api.huiyuanjinfu.com',
    //activityIp:'https://act.huiyuanjinfu.com',
    //ip:'http://192.168.1.115:8083',
    //ip:'http://localhost:57809/api/',
    ip:'http://api.advisors-ally.com/api/',
    // ip:'http://localhost:8080',
    activityIp:'http://192.168.1.198:3001',

    version:'1.0.0',//接口版本号
    pageSize:10,//分页条数
    OS:'HTML',//平台类型


    taxCate:[
             {name:'企业所得税',id:1},
             {name:'个人所得税',id:2},
             {name:'增值税',id:3},
             {name:'关联交易',id:4},
             {name:'房产税收',id:5},
             {name:'税收优惠',id:6},
             {name:'税务检查',id:7},
             {name:'征收管理',id:8}
    ]

};

export default config;
