import request from "@/utils/request.js";//引入工具层

// 获取店铺详情
export const shopInfo = (params)=>{
    return request.get("/shop/info",params);
}
// 修改店铺详情
export const shopEdit = (params)=>{
    return request.post("/shop/edit",params);
}