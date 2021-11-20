# -*- coding:utf-8 -*-
import json

import execjs

with open("wyy.js","r",encoding="utf-8") as f:
    JsStr = f.read()
JS = execjs.compile(JsStr)

data = {
    "hlpretag": "<span class=\"s-fc7\">",
    "hlposttag": "</span>",
    "s": "东西",
    "type": "1006",
    "offset": "0",
    "total": "true",
    "limit": "30",
    "csrf_token": ""
}
data = {"id":"1321385420","lv":-1,"tv":-1,"csrf_token":""}
data = json.dumps(data)
data = JS.call("encrypt",data)
# print(encryptParams)

import requests


headers = {
    "authority": "music.163.com",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.53",
    "sec-ch-ua-platform": "\"Windows\"",
    "content-type": "application/x-www-form-urlencoded",
    "accept": "*/*",
    "origin": "https://music.163.com",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    "referer": "https://music.163.com/search/",
    "accept-language": "zh-CN,zh;q=0.9"
}

url = "https://music.163.com/weapi/cloudsearch/get/web"
url = "https://music.163.com/weapi/song/lyric"
params = {
    "csrf_token": ""
}
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)


# 歌词
# https://music.163.com/weapi/song/lyric?csrf_token=
# {"id":"1321385420","lv":-1,"tv":-1,"csrf_token":""}

# 歌曲
# https://music.163.com/weapi/cloudsearch/get/web
# {
#     "hlpretag": "<span class=\"s-fc7\">",
#     "hlposttag": "</span>",
#     "s": "东西",
#     "type": "1",
#     "offset": "0",
#     "total": "true",
#     "limit": "30",
#     "csrf_token": ""
# }

