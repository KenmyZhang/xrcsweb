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
