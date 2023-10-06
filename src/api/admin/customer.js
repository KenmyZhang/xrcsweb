import request from '@/utils/request'



// 修改昵称
export function updatename(data) {
  return request({
    url: `/api/v3/kefu/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 创建账号
export function add(data) {
  return request({
    url: `/api/v3/kefu`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 删除账号
export function del(data) {
  return request({
    url: `/api/v3/kefu/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 查询账号
export function get(data) {
  return request({
    url: `/api/v3/kefu/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 账号续期
export function addDays(data) {
  return request({
    url: `/api/v3/kefu/days`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}