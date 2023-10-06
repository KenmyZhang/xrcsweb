
import request from '@/utils/request'

// 更新头像和昵称
export function customerUpdate(data) {
  return request({
    url: `/api/v3/customer/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 获取客服信息详情
export function customerDetail(data) {
  return request({
    url: `/api/v3/customer/info`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}