import request from '@/utils/request'



// 上传图片
export function upload(data) {
  return request({
    url: `/api/v3/image/upload`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}

// 上传视频
export function uploadFile(data) {
  return request({
    url: `/api/v3/file/upload`,
    method: 'post',
    data,
    // method: 'get',
    // params: data,
  })
}
