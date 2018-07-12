import request from '@/utils/request'

export function getUser(page) {
  return request({
    url: 'apis/user/getuserlist',
    method: 'post',
    data: {
      page
    }
  })
}
export function delUser(uid) {
  return request({
    url: 'apis/user/deluser',
    method: 'post',
    data: {
      uid
    }
  })
}
/** 搜索接口 */
export function doSerach(key) {
  return request({
    url: 'apis/user/serach',
    method: 'post',
    data: {
      key
    }
  })
}
