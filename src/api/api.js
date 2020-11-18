//引入封装头信息的axios
import http from './http';
//引入请求的url
import { nowplayingListUrl, comingsoonListUrl, moiveDetailUrl } from '../config/url'

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
