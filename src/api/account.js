import request from "@/utils/request.js";//引入工具层


//登录
export const login = (params)=>{
    return request.post("/users/checkLogin",params);
}
//添加账号
export const accountAdd = (params)=>{
    return request.post("/users/add",params);
}
//修改账号
export const accountUpdate = (params)=>{
    return request.post("/users/edit",params);
}
//删除账号
export const accountDel = (params)=>{
    return request.get("/users/del",params);
}
//账号列表
export const accountList = (params)=>{
    return request.get("/users/list",params);
}
//检查旧密码是否正确
export const checkoldpwd = (params)=>{
    return request.get("/users/checkoldpwd",params);
}
//修改密码
export const updatepwd = (params)=>{
    return request.post("/users/editpwd",params);
}
////获取账号（个人中心）信息
export const accountinfo = (params)=>{
    return request.get("/users/accountinfo",params);
}
//修改图片
export const avataredit = (params)=>{
    return request.get("/users/avataredit",params);
}
//获取用户角色
export const getRole = (params)=>{
    return request.get("/users/role",params);
}