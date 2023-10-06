import request from '@/utils/request'



// 增加
export function addGroup(data) {
  return request({
    url: `/api/v3/group`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 查询
export function getGroup(data) {
  return request({
    url: `/api/v3/group`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 查询列表
export function getGroups(data) {
  return request({
    url: `/api/v3/groups`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 更新
export function updateGroup(data) {
  return request({
    url: `/api/v3/group/update`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 删除
export function delGroup(data) {
  return request({
    url: `/api/v3/group/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}



// 增加
export function add(data) {
  return request({
    url: `/api/v3/group/members/add`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 查询
export function getUserRmembers(data) {
  return request({
    url: `/api/v3/group/members`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 查询
export function getRobotRmembers(data) {
  return request({
    url: `/api/v3/group/robot/members`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 更新
// export function update(data) {
//   return request({
//     url: `/api/v3/autoreply/setting/update`,
//     method: 'post',
//     data,
//     // method: 'get',
//     // params: data,
//   })
// }
// 删除
export function del(data) {
  return request({
    url: `/api/v3/group/members/del`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}


// 查询好友列表
export function getFriends(data) {
  return request({
    url: `/api/v3/customer/visitors`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 查询单个好友详情
export function getFriendDetail(data) {
  return request({
    url: `/api/v3/customer/visitor/info`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 修改用户备忘录
export function updateMemo(data) {
  return request({
    url: `api/v3/customer/visitor/memo`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}


// 修改用户备注
export function updateRemark(data) {
  return request({
    url: `/api/v3/customer/visitor/remark`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 单聊发送消息
export function sendMsg(data) {
  return request({
    url: `/api/v3/customer/message`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 群聊发送消息
export function sendMsgGroup(data) {
  return request({
    url: `/api/v3/customer/group/message`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 清空聊天记录
export function clearAllMsg(data) {
  return request({
    url: `/api/v3/customer/message/clear`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 获取历史聊天记录（单聊）
export function getHistoryMsg(data) {
  return request({
    url: `/api/v3/customer/messages`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}
// 聊天记录查询(群聊)
export function getHistoryGroupMsg(data) {
  return request({
    url: `/api/v3/customer/group/messages`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}


