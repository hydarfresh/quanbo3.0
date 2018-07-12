import request from '@/utils/request'

export function getBannerList(page) {
  return request({
    url: 'apis/bannerinfo/getBannerList',
    method: 'post',
    data: {
      page
    }
  })
}
export function delBanner(id) {
  return request({
    url: 'apis/bannerinfo/delBanner',
    method: 'post',
    data: {
      id
    }
  })
}

export function addBanner(id, /*  adsurl, */ comments) {
  return request({
    url: 'apis/bannerinfo/insertBanner',
    method: 'post',
    data: {
      /* adsurl, */
      comments,
      id
    }
  })
}
export function editBanners(comments, id) {
  return request({
    url: 'apis/bannerinfo/editBanner',
    method: 'post',
    data: {
      comments,
      id
    }
  })
}

/** 查询接口 */
export function doSerach(key) {
  return request({
    url: 'apis/bannerinfo/serach',
    method: 'post',
    data: {
      key
    }
  })
}

// export function insertBanner (params){
//   return new Promise((resolve,reject)=>{
//     request.post('/apis/bannerinfo/insertBanner',params).then(res=>{
//       console.log('res',res)
//       resolve(res)
//     }).catch(err=>{
//       console.log('error-info')
//       reject(err)
//     })
//   })
// }
