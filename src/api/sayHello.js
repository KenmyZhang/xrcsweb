import request from '@/utils/request'



// 增加打招呼
export function add(data) {
  return request({
    url: `/api/v3/sayhello/setting`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 查询打招呼配置
export function get(data) {
  return request({
    url: `/api/v3/sayhello/setting`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 更新打招呼配置
export function update(data) {
  return request({
    url: `/api/v3/sayhello/setting/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 删除打招呼配置
export function del(data) {
  return request({
    url: `/api/v3/sayhello/setting/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}