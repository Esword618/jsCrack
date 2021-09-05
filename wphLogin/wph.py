# -*- encoding: utf-8 -*-
# @Time    : 2021-08-30 9:01
# @Author  : Esword
# @Email   : jyj349559953@qq.com
# @File    : wph.py
# @Software: PyCharm
# @公众号   :  spider

import os
import json
import time
import hashlib
import base64
import execjs
import requests
from loguru import logger
from requests.utils import dict_from_cookiejar, cookiejar_from_dict


requests.packages.urllib3.disable_warnings()


with open("encrypt.js", "r", encoding="utf-8") as f:
    jsfile = f.read()
ctx = execjs.compile(jsfile)

session = requests.session()
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}
session.headers = headers


def MD5(data):
    msg = hashlib.md5(data.encode(encoding='UTF-8')).hexdigest()
    logger.info(f'加密后密码:{msg}')
    return msg


def strCookie():
    cookiejar = session.cookies
    cookiedic = dict_from_cookiejar(cookiejar)
    cookie = ""
    for key, value in cookiedic.items():
        # 这里;后面空格一点要交，不加会出错
        cookie += f"{key}={value}; "
    cookie = cookie[:-2]
    return cookie


def mars_cid():
    mars_cid = ctx.call("mars_cid")
    logger.info(f"mars_cid:{mars_cid}")
    return mars_cid


def encrypt(data, cookie):
    data = ctx.call("postLogin", data, cookie)
    logger.info(f"postLogin参数加密:{data}")
    return data


def mars_sid():
    mars_sid = ctx.call('rand')
    return mars_sid


def visit_id():
    visit_id = ctx.call('guid')
    return visit_id


def newCookie():
    cookieDic = dict_from_cookiejar(session.cookies)
    mars_ciD = mars_cid()
    cookieDic['mars_cid'] = mars_ciD
    cookieDic["mars_pid"] = "0"
    cookieDic['mars_sid'] = mars_sid()
    cookieDic['visit_id'] = visit_id()
    session.cookies = cookiejar_from_dict(cookieDic)


def Timestamp():
    return int(time.time() * 1000)


def get_mars_cid():
    cookiedic = dict_from_cookiejar(session.cookies)
    return cookiedic['mars_cid']


def yzm(info, imageId):
    # 这里用的是这个打码平台 网址http://www.kuaishibie.cn/?spm=null
    url = f"https://captcha.vip.com/getImage?v=1&captchaType=7&imageId={imageId}"
    response = session.get(url=url, headers=headers)
    with open("yzm.png", 'wb') as f:
        f.write(response.content)
    with open("yzm.png", 'rb') as f:
        b64 = base64.b64encode(f.read()).decode()
    data = {
        "username": '自己账号',
        "password": '自己密码',
        "typeid": 21,
        "image": b64,
        "remark": f"{info}"
    }
    result = json.loads(session.post("http://api.ttshitu.com/predict", json=data).text)
    if result['success']:
        lis = []
        result = result["data"]["result"]
        result = result.split('|')
        for i in result:
            k = i.split(',')
            for j in k:
                lis.append(j)
        return lis
    else:
        return result["message"]


def imgInfo(imageId):
    url = f"https://captcha.vip.com/getImage?v=1&captchaType=7&imageId={imageId}"
    response = requests.get(url=url, headers=headers)
    with open("info.png", 'wb') as f:
        f.write(response.content)
    # 这里是对点选图片(info)验证码信息识别，自己找ocr办法
    logger.info(info)
    return info


def getURL(captchaFlowData):
    templateId = captchaFlowData['templateId']
    captchaId = captchaFlowData['captchaId']
    mars_cid = get_mars_cid()
    data = {
        'v': '1',
        'source': '0',
        'captchaId': captchaId,
        'captchaType': '7',
        'data': {
            "type": ["browser", "screen", "mars", "bootstrap"],
            "browser": {
                "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            },
            "screen": {
                "width": 1280,
                "height": 720
            },
            "mars": {
                "cid": mars_cid
            },
            "bootstrap": {
                "version": "vsc-58dcbcc1.js"
            }
        },
        'templateId': f'{templateId}?v={Timestamp()}'
    }
    url = 'https://captcha.vip.com/getURL'
    response = session.post(url=url, headers=headers, data=data, verify=False)
    getURLdata = response.json()['data']
    return getURLdata, data


def check(data, points):
    data['data']['points'] = points
    data['data']['antiCacheTime'] = Timestamp()
    data['data'] = json.dumps(data['data'])
    url = "https://captcha.vip.com/check"
    response = session.post(url=url, data=data)
    if 'ticket' in response.text:
        logger.info("验证码成功")
        return response.json()['data']['ticket']
    else:
        logger.info("验证码失败")
        return False


def postLogin(data, end=False):
    cookie = strCookie()
    data = encrypt(data, cookie)
    headers = {
        'authorization': data['authorization'],
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    }
    data = {
        'api_key': '70f71280d5d547b2a7bb370a529aeea1',
        'pc_eversion': '1',
        'skey': '3c5ad16dbc06cd16ae1fd3344d87f16b',
        'pc_edata': data['pc_edata']
    }
    url = 'https://passport.vip.com/login/postLogin'
    response = session.post(url=url, headers=headers, data=data, verify=False)
    if end == False:
        captchaFlowData = response.json()['data']['captchaFlowData']
        return captchaFlowData
    else:
        errorCode = response.json()['errorCode']
        if errorCode == 0:
            logger.info('登录成功')
            print(json.dumps(response.json(),indent=4))
        elif errorCode == 1603:
            logger.info('要手机验证码验证登录')
            print(json.dumps(response.json(), indent=4))
        else:
            logger.info('登录失败')
            print(json.dumps(response.json(),indent=4))


def main():
    newCookie()
    session.get('https://www.vip.com/', headers=headers)
    session.get('https://passport.vip.com/login')
    loginName = "自己的账号"
    password = "自己的密码"
    password = MD5(password)
    data = {
        "loginName": loginName,
        "password": password,
        "remUser": 0,
        "whereFrom": "",
        "captchaId": "",
        "captchaTicket": "",
        "_t": Timestamp(),
        "api_key": "70f71280d5d547b2a7bb370a529aeea1"
    }
    captchaFlowData = postLogin(data, end=False)
    getURLdata, data = getURL(captchaFlowData)
    info = imgInfo(getURLdata['qp'])
    points = yzm(info, getURLdata['ap'])
    captchaTicket = check(data, points)
    if captchaTicket != False:
        data = {
            "loginName": loginName,
            "password": password,
            "remUser": 0,
            "whereFrom": "",
            "captchaId": captchaFlowData['captchaId'],
            "captchaTicket": captchaTicket,
            "_t": Timestamp(),
            "api_key": "70f71280d5d547b2a7bb370a529aeea1"
        }
        postLogin(data, end=True)


if __name__ == '__main__':
    main()
