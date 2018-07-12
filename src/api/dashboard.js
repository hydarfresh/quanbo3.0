import request from '@/utils/request'

export function getDashboardList(page) {
  return request({
    url: 'apis/datacollection/getCountList',
    method: 'post',
    data: {
      page
    }
  })
}
export function doSerach(starttime, overtime) {
  return request({
    url: 'apis/datacollection/serach',
    method: 'post',
    data: {
      starttime,
      overtime
    }
  })
}
