import request from '@/utils/request'



// 上传图片
export function upload(data) {
  return request({
    url: `/api/v3/image/upload`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  })
}

// 上传视频
export function uploadFile(data) {
  return request({
    url: `/api/v3/file/upload`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 上传txt电话
export function phoneUpload(data) {
  return request({
    url: `/api/v3/phone/upload`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function phoneUploadDel(data) {
  return request({
    url: `/api/v3/phone/upload/history/del`,
    method: 'post',
    data,
  })
}
