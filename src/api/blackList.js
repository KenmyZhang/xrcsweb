import request from '@/utils/request'


// 添加到黑名单
export function add(data) {
  return request({
    url: `/api/v3/blacklist`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 查看黑名单
export function get(data) {
  return request({
    url: `/api/v3/blacklist`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 移出黑名单
export function remove(data) {
  return request({
    url: `/api/v3/blacklist/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 添加到黑名单
export function iPBlackAdd(data) {
  return request({
    url: `/api/v3/ip/blacklist`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 查看黑名单
export function iPBlackGet(data) {
  return request({
    url: `/api/v3/ip/blacklist`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 移出黑名单
export function iPBlackRemove(data) {
  return request({
    url: `/api/v3/ip/blacklist/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}


// 添加到黑名单
export function osBlackAdd(data) {
  return request({
    url: `/api/v3/os/blacklist`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 查看黑名单
export function osBlackGet(data) {
  return request({
    url: `/api/v3/os/blacklist`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 移出黑名单
export function osBlackRemove(data) {
  return request({
    url: `/api/v3/os/blacklist/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
