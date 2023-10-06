import request from '@/utils/request'

export function getCode(data) {
  return request({
    url: `/api/v1/customer/service/code`,

    // method: 'post',
    // data
    method: 'get',
    params: data
  })
}
export function createCode(data) {
  return request({
    url: `/api/v1/customer/service/code`,
    method: 'post',
    data
    // method: 'get',
    // params: data,
  })
}

export function getList(data) {
  // const { account, page_num, page } = data
  return request({
    url: `/api/v1/customer/statistics`,
    // method: 'post',
    // data
    method: 'get',
    params: data
  })
}
export function checkCode(data) {
  return request({
    url: `/api/v1/customer/service/code/check`,
    // method: 'post',
    // data
    method: 'get',
    params: data
  })
}

