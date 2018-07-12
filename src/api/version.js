import request from '@/utils/request'

export function getVersionList(page) {
  return request({
    url: 'apis/appversion/getAppversionList',
    method: 'post',
    data: {
      page
    }
  })
}
export function delVersionList(aid) {
  return request({
    url: 'apis/appversion/delApp',
    method: 'post',
    data: {
      aid
    }
  })
}

export function addVersion(file, updatelog, appversion) {
  return request({
    url: 'apis/appversion/addnewapp',
    method: 'post',
    data: {
      file,
      updatelog,
      appversion
    }
  })
}

export function editVersion(updatelog, appversion, aid) {
  return request({
    url: 'apis/appversion/editAppversion',
    method: 'post',
    data: {

      aid,
      updatelog,
      appversion
    }
  })
}

export function doSerach(key) {
  return request({
    url: 'apis/appversion/serach',
    method: 'post',
    data: {
      key
    }
  })
}

export function isnews(aid) {
  return request({
    url: 'apis/appversion/isnew',
    method: 'post',
    data: {
      aid
    }
  })
}

export function isupdates(aid) {
  return request({
    url: 'apis/appversion/issuperupdate',
    method: 'post',
    data: {
      aid
    }
  })
}
