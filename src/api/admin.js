import request from '@/utils/request'

export function getAdminList(page) {
  return request({
    url: 'apis/admin/getAdminList',
    method: 'post',
    data: {
      page
    }
  })
}
export function delAdmin(id) {
  return request({
    url: 'apis/admin/deluser',
    method: 'post',
    data: {
      id
    }
  })
}

export function addAdmin(username, password, nickname) {
  return request({
    url: 'apis/admin/adduser',
    method: 'post',
    data: {
      username,
      password,
      nickname
    }
  })
}

export function oppenAdmin(type, id) {
  return request({
    url: 'apis/admin/forbiddenuser',
    method: 'post',
    data: {
      type,
      id
    }
  })
}
export function updatePwd(id, password) {
  return request({
    url: 'apis/admin/updatepassword',
    method: 'post',
    data: {
      id,
      password
    }
  })
}

/** 查询接口 */
export function doSerach(key) {
  return request({
    url: 'apis/admin/serach',
    method: 'post',
    data: {
      key
    }
  })
}
// export function updatePwd(key) {
//   return request({
//     url: 'apis/admin/updatepassword',
//     method: 'post',
//     data: {
//       key
//     }
//   })
// }
