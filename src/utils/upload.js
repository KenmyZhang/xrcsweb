import axios from 'axios'
import { getToken } from '@/utils/auth'

export function upload(api, file) {
  var data = new FormData()
  data.append('file', file)
  const config = {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  }
  return axios.post(api, data, config)
}
