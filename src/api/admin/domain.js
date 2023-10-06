import request from '@/utils/request'



// 创建账号
export function add(data) {
  return request({
    url: `/api/v3/cs/code`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 删除账号
export function del(data) {
  return request({
    url: `/api/v3/cs/code/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 查询账号
export function get(data) {
  return request({
    url: `/api/v3/cs/code/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 编辑客服码
export function update(data) {
  return request({
    url: `/api/v3/cs/code/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 查询域名列表
export function getDomains(data) {
  return request({
    url: `/api/v3/nginx/domain/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}