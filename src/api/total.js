import request from "@/utils/request.js";//引入工具层


//首页报表接口
export const homeTotaldata = (params)=>{
    return request.get("/order/totaldata",params);
}
//订单报表接口
export const ordertotal = (params)=>{
    return request.get("/order/ordertotal",params);
}

