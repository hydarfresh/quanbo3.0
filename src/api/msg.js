import request from '@/utils/request'

export function getMsgList(page) {
  return request({
    url: 'apis/msginfo/getMsgList',
    method: 'post',
    data: {
      page
    }
  })
}
export function addMsg(title, content) {
  return request({
    url: 'apis/msginfo/addmsginfo',
    method: 'post',
    data: {
      title,
      content
    }
  })
}
export function delMsg(id) {
  return request({
    url: 'apis/msginfo/delmsginfo',
    method: 'post',
    data: {
      id
    }
  })
}
export function editMsg(title, content, id) {
  return request({
    url: 'apis/msginfo/editMsgInfo',
    method: 'post',
    data: {
      title,
      content,
      id
    }
  })
}

/** 搜索接口 */

export function doSerach(key) {
  return request({
    url: 'apis/msginfo/serach',
    method: 'post',
    data: {
      key
    }
  })
}
