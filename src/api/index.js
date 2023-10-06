import request from '@/utils/request'



export function getTotalUnread(data) {
  return request({
    url: `/api/v3/msg/unread`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 更新ip的备注
export function updateRemark(data) {
  return request({
    url: `/api/v3/ip/remark`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 用户地区分布
export function regionStatistics(data) {
  return request({
    url: `/api/v3/user/region/statistics`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// ip库查询
export function ipData(data) {
  return request({
    url: `/api/v3/ip/datas`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 在线时间比例
export function timeStatistics(data) {
  return request({
    url: `/api/v3/user/stay/time/statistics`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

export function getCode(data) {
  const { account } = data
  return request({
    url: `/api/v1/customer/service/code?account=${account}`,
    method: 'get',
  })
}
export function createCode(data) {
  return request({
    url: `/api/v1/customer/service/code`,
    method: 'post',
    data
  })
}
export function getList(data) {
  const { account, page_num, page } = data
  return request({
    url: `/api/v1/customer/statistics?account=${account}&page_num=${page_num}&page=${page}`,
    method: 'get',
  })
}



// export function login(username, password, code, uuid) {
//   return request({
//     url: 'auth/login',
//     method: 'post',
//     data: {
//       username,
//       password,
//       code,
//       uuid
//     }
//   })
// }

// export function getInfo() {
//   return request({
//     url: 'admin/auth/info',
//     method: 'get'
//   })
// }

// export function getCodeImg() {
//   return request({
//     url: 'auth/captcha',
//     method: 'get'
//   })
// }

// export function logout() {
//   return request({
//     url: 'admin/auth/logout',
//     method: 'delete'
//   })
// }
