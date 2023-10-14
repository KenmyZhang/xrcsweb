import request from '@/utils/request'


// 关键词列表
export function keywordList(data) {
  return request({
    url: `/api/v3/keyword/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 删除关键词
export function keywordDel(data) {
  return request({
    url: `/api/v3/keyword/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 密码检查
export function validPasswd(data) {
  return request({
    url: `/api/v3/check/passwd`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 是否有设置密码
export function keywordHasPasswd(data) {
  return request({
    url: `/api/v3/has/passwd`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 更新关键词
export function keywordUpdate(data) {
  return request({
    url: `/api/v3/keyword/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 添加关键词
export function keywordAdd(data) {
  return request({
    url: `/api/v3/keyword/add`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 检查关键词是否存在
export function keywordCheck(data) {
  return request({
    url: `/api/v3/keyword/check`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}