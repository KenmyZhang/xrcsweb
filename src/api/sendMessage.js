import request from '@/utils/request'



// 增加
export function send(data) {
  return request({
    url: `/api/v3/groupsend/msg`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}


export function getUserList(data) {
  return request({
    url: `/api/v3/customer/visitors`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
