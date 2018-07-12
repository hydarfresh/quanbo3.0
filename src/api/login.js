import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'apis/admin/userlogin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: 'apis/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'apis/admin/logout',
    method: 'post'
  })
}
