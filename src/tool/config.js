const config = {

  //  ip: 'http://localhost:57809/api/',
  //  chatip: 'http://localhost:57809/chat',
  ip: 'https://api.advisors-ally.com/api/',
  chatip: 'https://api.advisors-ally.com/chat',
  // ip:'http://localhost:8080',
  wechatlogin: "https://api.advisors-ally.com/api/wechat/step1?returnUrl=" + encodeURIComponent(window.location.href),
  enablephonecode: true, //启用短信验证
  version: '1.0.0', //接口版本号
  pageSize: 10, //分页条数
  OS: 'HTML', //平台类型
  cos: {
    imgShowUrl: "https://yuelinshe-1253333391.costj.myqcloud.com/",
    bucket: 'yuelinshe',
    appid: 1253333391,
    sid: "AKIDFQTPEwb6VyUvGSwREtdLxeDeyAYsD84t",
    skey: "qZ6Xq150nSzQjvzvlS1SlvxumV3UpEXg",
    region: 'tj',
    myFolder: '/vizcaya/'
  },

  taxCate: [{
      name: '企业所得税',
      id: 1
    },
    {
      name: '个人所得税',
      id: 2
    },
    {
      name: '增值税',
      id: 3
    },
    {
      name: '关联交易',
      id: 4
    },
    {
      name: '房产税收',
      id: 5
    },
    {
      name: '税收优惠',
      id: 6
    },
    {
      name: '税务检查',
      id: 7
    },
    {
      name: '征收管理',
      id: 8
    }
  ]

};

export default config;
