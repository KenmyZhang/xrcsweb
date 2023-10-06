

import request from '@/utils/request'



export function customerAccounts(data) {
  const { account, page_num, page } = data
  return request({
    url: `/api/v1/customer/accounts?account=${account}&page_num=${page_num}&page=${page}`,
    method: 'get',
  })
}

export function customerUsers(data) {
  const { account, page_num, page } = data
  return request({
    url: `/api/v1/customer/users`,
    method: 'get',
    params: data
  })
}
export function customerSync(data) {
  // '{"from_account":"123", "to_accounts":["123"],"include_avatar":true, "include_name":true, "include_say_hello":true,"include_auto_reply":true,"include_quick_message":true }'
  return request({
    url: `/api/v1/customer/sync`,
    method: 'post',
    data
  })
}
