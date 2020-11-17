//引入封装头信息的axios
import http from './http';
//引入请求的url
import { nowplayingListUrl, comingsoonListUrl } from '../config/url'

export const nowplayingListData = (page = 1) => {
    return http.get(nowplayingListUrl + page)
}
