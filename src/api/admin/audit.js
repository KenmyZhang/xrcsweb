import request from '@/utils/request'



// 查询账号
export function get(data) {
  return request({
    url: `/api/v3/audit/log`,
    method: 'get',
    params: data,
  })
}
