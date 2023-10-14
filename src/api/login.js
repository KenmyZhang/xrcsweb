import request from '@/utils/request'




export function login(data) {
  return request({
    url: `/api/v3/customer/login`,
    method: 'post',
    data
    // method: 'get'
    // params: data
  })
}