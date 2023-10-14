import request from '@/utils/request'

// 上传电话记录
export function phoneUploadhistory(data) {
  return request({
    url: `/api/v3/phone/upload/history`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 创建发送任务的文件列表
export function phoneTaskFiles(data) {
  return request({
    url: `/api/v3/phone/task/files`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 上传电话记录
export function phoneList(data) {
  return request({
    url: `/api/v3/phone/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 新建任务
export function phoneTask(data) {
  return request({
    url: `/api/v3/phone/task`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

export function delPhoneTask(data) {
  return request({
    url: `/api/v3/phone/task/del`,
    method: 'post',
    data,
  })
}



// 任务列表
export function phoneTaskList(data) {
  return request({
    url: `/api/v3/phone/task/list`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

// 开启任务
export function phoneTaskStart(data) {
  return request({
    url: `/api/v3/phone/task/start`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
// 筛选任务
export function filterTasks(data) {
  return request({
    url: `/api/v3/filter/tasks`,
    // method: 'post',
    // data,
    method: 'get',
    params: data,
  })
}

export function delFilterTask(data) {
  return request({
    url: `/api/v3/filter/task/del`,
    // method: 'post',
    // data,
    method: 'post',
    data,
  })
}

export function stopFilterTask(data) {
  return request({
    url: `/api/v3/filter/task/stop`,
    // method: 'post',
    // data,
    method: 'post',
    data,
  })
}

// 新建筛选任务
export function addFilterTasks(data) {
  return request({
    url: `/api/v3/filter/task`,
    method: 'post',
    data,
  })
}
// 发送消息
// receiver： 接收人
// content ： 发送内容
export function sendMsg(data) {
  return request({
    url: `/api/v3/phone/msg`,
    method: 'post',
    data,
  })
}
// 历史聊天消息
// phone 电话号码
// page 第几页
// page_num 每页返回消息数
export function msgList(data) {
  return request({
    url: `/api/v3/phone/msg/list`,
    method: 'get',
    params: data,
  })
}



// 分钟统计
export function minuteList(data) {
  return request({
    url: `/api/v3/minute/statistic`,
    method: 'get',
    params: data,
  })
}

// 小时统计
export function hourList(data) {
  return request({
    url: `/api/v3/hour/statistic`,
    method: 'get',
    params: data,
  })
}

// 日统计
export function dayList(data) {
  return request({
    url: `/api/v3/yearday/statistic`,
    method: 'get',
    params: data,
  })
}
// 设备账号
export function deviceAccounts(data) {
  return request({
    url: `/api/v3/device/accounts`,
    method: 'get',
    params: data,
  })
}
// 使用设备账号
export function useDeviceAccount(data) {
  return request({
    url: `/api/v3/device/account/status`,
    method: 'post',
    data,
  })
}

// 新建设备账号
export function addDeviceAccount(data) {
  return request({
    url: `/api/v3/device/account`,
    method: 'post',
    data,
  })
}

export const GetMemberList = params => request({ url: '/api/v3/filter/task/members', params })
export const GetHi = params => request({ url: '/api/v3/phone/task/reply', params })

// 获取电话号码
// http://43.139.163.35:6688/api/v3/phone/list?filename=phone.txt&page=1&page_num=10
export function getphones(data) {
  return request({
    url: `/api/v3/phone/list`,
    method: 'get',
    params: data,
  })
}

// 任务成员
export function taskmember(data) {
  return request({
    url: `/api/v3/task/member`,
    method: 'get',
    params: data,
  })
}
// 任务中的电话
export function taskphoneslist(data) {
  return request({
    url: `/api/v3/task/phones/list`,
    method: 'get',
    params: data,
  })
}
