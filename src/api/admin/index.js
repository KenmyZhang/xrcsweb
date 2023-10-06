import request from '@/utils/request'



// export function homeGetTableData(data) {
//   const { id, token } = data
//   return request({
//     url: `/v1/group/share?id=${id}&token=${token}`,
//     method: 'get',
//   })
// }

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
