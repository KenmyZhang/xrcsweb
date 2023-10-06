import request from '@/utils/request'



// 增加
export function syncData(data) {
  return request({
    url: `/api/v3/kefu/info/sync`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
