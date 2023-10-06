import request from '@/utils/request'



export function statistics(data) {
  return request({
    url: `/api/v3/user/statistics`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}