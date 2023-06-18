export default {
    'POST /api/user/login' : {
        code:200,
        data:{
            avatar:'https://immisso.oss-cn-hangzhou.aliyuncs.com/avatar/001.png',
            email:'3115988782@qq.com',
            id: 1,
            account_type:"ADMIN",
            token: "asxascsdcsdovjbnskdfijbvoajenbrvjenborbvaoeijrbcaojwneovcjebrjovabncsdocihnaowjb"
        }
    },
    'POST /api/user/logout' : {
        code:200,
        data : {
            message:"退出成功"
        }
    }
}