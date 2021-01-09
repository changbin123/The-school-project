import request from "@/utils/request.js";//引入工具层

// 获取商品列表
export const goodList = (params)=>{
    return request.get("/goods/list",params);
}
// 获取商品分类
export const goodCate = (params)=>{
    return request.get("/goods/catelist",params);
}
// 添加商品
export const goodAdd = (params)=>{
    return request.post("/goods/add",params);
}
// 添加分类
export const addcate = (params)=>{
    return request.post("/goods/addcate",params);
}
// 修改分类
export const editcate = (params)=>{
    return request.post("/goods/editcate",params);
}
// 删除分类
export const delcate = (params)=>{
    return request.get("/goods/delcate",params);
}
// 修改商品
export const edit = (params)=>{
    return request.post("/goods/edit",params);
}
// 获取商品分类
export const categories  = (params)=>{
    return request.get("/goods/categories ",params);
}