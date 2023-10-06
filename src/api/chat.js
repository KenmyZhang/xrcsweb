import request from '@/utils/request'


// 群机器人发送消息
export function robotSendMessage(data) {
  return request({
    url: `/api/v3/visitor/group/robot/message`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 会话列表
export function sessions(data) {
  return request({
    url: `/api/v3/sessions`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 入群申请列表
export function getApplyList(data) {
  return request({
    url: `/api/v3/join/group/request/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 入群审核
export function applyResolve(data) {
  return request({
    url: `/api/v3/join/group/review`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 标记会话已读
export function sessionView(data) {
  return request({
    url: `/api/v3/session/view`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 在线列表查询
export function getOnlineList(data) {
  return request({
    url: `/api/v3/customer/online/visitors`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}