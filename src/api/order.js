import request from "@/utils/request.js";//引入工具层

// 获取订单列表
export const orderList = (params)=>{
    return request.get("/order/list",params);
}
// 获取订单详情
export const orderDetail = (params)=>{
    return request.get("/order/detail",params);
}
// 修改订单详情
export const orderEdit = (params)=>{
    return request.post("/order/edit",params);
}