let config = {
    port: 3000,
    host: 'localhost',
    session: {
        secret: 'huangxinzheng',
        resave: true, //即使 session 没有被修改，也保存 session 值，默认为 true（！不添加报错,下同）
        saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 过期时间，过期后 cookie 中的 session id 自动删除
        }
    },
    mongodb: 'mongodb://localhost:27017/myblog',
    // 测试用数据
    testData: [{
            id: '1',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '2',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '3',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '4',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '5',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '6',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '7',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '8',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '9',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '10',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '11',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        },
        {
            id: '12',
            title: '文章标题',
            description: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒，起舞弄清影，何似在人间。',
            preImage: 'logo.png'
        }
    ]
}

export default config