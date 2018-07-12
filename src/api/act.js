import request from '@/utils/request'

export function getActList(page) {
  return request({
    url: 'apis/activitiesinfo/getactivitieslist',
    method: 'post',
    data: {
      page
    }
  })
}
export function addAct(id, title, adsurl, content, over_time) {
  return request({
    url: 'apis/Activitiesinfo/addActivities',
    method: 'post',
    data: {
      id,
      title,
      adsurl,
      content,
      over_time
    }
  })
}
export function editAct(title, adsurl, content, over_time, aid) {
  return request({
    url: 'apis/Activitiesinfo/editActivities',
    method: 'post',
    data: {
      title,
      adsurl,
      content,
      over_time,
      aid
    }
  })
}
export function delAct(aid) {
  return request({
    url: 'apis/Activitiesinfo/delActivities',
    method: 'post',
    data: {
      aid
    }
  })
}

export function doSerach(key) {
  return request({
    url: 'apis/Activitiesinfo/serach',
    method: 'post',
    data: {
      key
    }
  })
}
