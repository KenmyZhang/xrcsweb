import request from '@/utils/request'



// 删除
export function fileDel(data) {
  return request({
    url: `/api/v3/nginx/file/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 统一加载文件
export function fileReload(data) {
  return request({
    url: `/api/v3/nginx/file/reload`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 列表获取
export function fileList(data) {
  return request({
    url: `/api/v3/nginx/file/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 新增编辑
export function fileSave(data) {
  return request({
    url: `/api/v3/nginx/file/save`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 详情
export function fileInfo(data) {
  return request({
    url: `/api/v3/nginx/file/info`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 配置文件检查
export function fileCheck(data) {
  return request({
    url: `/api/v3/nginx/file/check`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}