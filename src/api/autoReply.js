import request from '@/utils/request'



// 增加
export function addGroup(data) {
  return request({
    url: `/api/v3/autoreply/group/setting`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 查询
export function getGroup(data) {
  return request({
    url: `/api/v3/autoreply/group/setting`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 更新
export function updateGroup(data) {
  return request({
    url: `/api/v3/autoreply/group/setting/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 删除
export function delGroup(data) {
  return request({
    url: `/api/v3/autoreply/group/setting/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}



// 增加
export function add(data) {
  return request({
    url: `/api/v3/autoreply/setting`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 查询
export function get(data) {
  return request({
    url: `/api/v3/autoreply/setting`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 更新
export function update(data) {
  return request({
    url: `/api/v3/autoreply/setting/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 删除
export function del(data) {
  return request({
    url: `/api/v3/autoreply/setting/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}