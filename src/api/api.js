//引入封装头信息的axios
import http from './http';
//引入请求的url
import { nowplayingListUrl, comingsoonListUrl, moiveDetailUrl, cityListUrl, cinemaListUrl } from '../config/url'

export const nowplayingListData = (page = 1) => {
    http.defaults.headers.info = '';
    return http.get(nowplayingListUrl + page)
}
export const comingsoonListData = (page = 1) => {
    http.defaults.headers.info = '';
    return http.get(comingsoonListUrl + page)
}

export const filmDetail = (filmId) => {
    http.defaults.headers.info = 'info';
    return http.get(moiveDetailUrl + filmId)
}

export const cityListData = (filmId) => {
    http.defaults.headers.info = 'city';
    return http.get(cityListUrl)
}
export const cinemaListData = (cityId) => {
    http.defaults.headers.info = 'cinema';
    return http.get('gateway?cityId=' + cityId + '&k=8975302')
}

