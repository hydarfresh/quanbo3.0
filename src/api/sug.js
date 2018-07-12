import request from '@/utils/request'

export function getSugList(page) {
  return request({
    url: 'apis/suggestion/getSuggestionList',
    method: 'post',
    data: {
      page
    }
  })
}
export function delSug(id) {
  return request({
    url: 'apis/suggestion/delsuggestion',
    method: 'post',
    data: {
      id
    }
  })
}
/** 搜索接口 */
export function doSerach(key) {
  return request({
    url: 'apis/suggestion/serach',
    method: 'post',
    data: {
      key
    }
  })
}
