# -*- encoding: utf-8 -*-
"""
@File    :   求求了做个人吧.py    
@Contact :   jyj345559953@qq.com
@Author  :   Esword
"""
import base64
import json
import sys
import time
import warnings
import cv2
import requests
warnings.simplefilter('ignore', DeprecationWarning)


class SlideCrack(object):
    def __init__(self, gap, bg, out):
        """
        init code
        :param gap: 缺口图片
        :param bg: 背景图片
        :param out: 输出图片
        """
        self.gap = gap
        self.bg = bg
        self.out = out

    @staticmethod
    def clear_white(img):
        # 清除图片的空白区域，这里主要清除滑块的空白
        img = cv2.imread(img)
        rows, cols, channel = img.shape
        min_x = 255
        min_y = 255
        max_x = 0
        max_y = 0
        for x in range(1, rows):
            for y in range(1, cols):
                t = set(img[x, y])
                if len(t) >= 2:
                    if x <= min_x:
                        min_x = x
                    elif x >= max_x:
                        max_x = x

                    if y <= min_y:
                        min_y = y
                    elif y >= max_y:
                        max_y = y
        img1 = img[min_x:max_x, min_y: max_y]
        return img1

    def template_match(self, tpl, target):
        th, tw = tpl.shape[:2]
        result = cv2.matchTemplate(target, tpl, cv2.TM_CCOEFF_NORMED)
        # 寻找矩阵(一维数组当作向量,用Mat定义) 中最小值和最大值的位置
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        tl = max_loc
        br = (tl[0] + tw, tl[1] + th)
        # 绘制矩形边框，将匹配区域标注出来
        # target：目标图像
        # tl：矩形定点
        # br：矩形的宽高
        # (0,0,255)：矩形边框颜色
        # 1：矩形边框大小
        cv2.rectangle(target, tl, br, (0, 0, 255), 2)
        cv2.imwrite(self.out, target)
        return tl[0]

    @staticmethod
    def image_edge_detection(img):
        edges = cv2.Canny(img, 100, 200)
        return edges

    def discern(self):
        img1 = self.clear_white(self.gap)
        img1 = cv2.cvtColor(img1, cv2.COLOR_RGB2GRAY)
        slide = self.image_edge_detection(img1)

        back = cv2.imread(self.bg, 0)
        back = self.image_edge_detection(back)

        slide_pic = cv2.cvtColor(slide, cv2.COLOR_GRAY2RGB)
        back_pic = cv2.cvtColor(back, cv2.COLOR_GRAY2RGB)
        x = self.template_match(slide_pic, back_pic)
        # 输出横坐标, 即 滑块在图片上的位置
        return x


class wallpaper():

    def __init__(self):
        self.dict = {}
        self.headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'origin': 'https://bz.zzzmh.cn',
            'referer': 'https://bz.zzzmh.cn/'
        }

    def ts(self):
        return int(time.time() * 1000)

    def save_img(self, bs64,path):
        with open(path, 'wb') as f:
            f.write(base64.b64decode(bs64))

    def left(self):
        try:
            sc = SlideCrack("s.png", "o.png", "handle.png")
            left = sc.discern()
            return left
        except:
            return 145.543

    def decode(self, str):
        params_url = "http://localhost:3000"
        payload = {
            "data": f"decode{(str,)}",
        }
        response = requests.post(params_url, data=payload,headers=self.headers)
        print(response.text)
        return json.loads(response.text)

    def pointJson(self,secretKey,moveBlockLeft):
        params_url = "http://localhost:3000"
        payload = {
            "data": f"pointJson{(moveBlockLeft,secretKey)}",
        }
        response = requests.post(params_url, data=payload)
        return response.text

    def captcha(self,secretKey,moveBlockLeft,token):
        params_url = "http://localhost:3000"
        payload = {
            "data": f"captcha{(moveBlockLeft,token,secretKey)}",
        }
        response = requests.post(params_url, data=payload)
        return response.text

    def get(self):
        payload = {
            'captchaType': "blockPuzzle",
            'clientUid': "slider-24032725-d450-4deb-84d2-d53f709d4aab",
            'ts': self.ts(),
        }
        url = "https://api.zzzmh.cn/captcha/get"
        res = requests.post(url=url, json=payload, headers=self.headers)
        repData = res.json()["repData"]
        # print(repData)
        originalImageBase64 = repData["originalImageBase64"]
        self.save_img(originalImageBase64,"o.png")
        jigsawImageBase64 = repData["jigsawImageBase64"]
        self.save_img(jigsawImageBase64,"s.png")

        secretKey = repData["secretKey"]
        token = repData["token"]
        return token,secretKey

    def check(self, pointJson,token):
        payload = {
            'captchaType': "blockPuzzle",
            'pointJson': pointJson,
            'token': token
        }
        url = "https://api.zzzmh.cn/captcha/check"
        res = requests.post(url=url, json=payload, headers=self.headers)
        print(res.text)
        return res.json()

    def slider(self):
        while True:
            token,secretKey = self.get()
            print("-" * 100)
            moveBlockLeft= self.left()
            pointJson = self.pointJson(secretKey,moveBlockLeft)
            check_json = self.check(pointJson,token)
            if check_json["success"] == True:
                print("滑块验证码已经成功")
                return check_json,secretKey,moveBlockLeft,token
            if check_json["repCode"] == "6020":
                print("接口验证失败数过多，请稍后再试\n"
                      "程序自动结束！")
                sys.exit()
            print("滑块失败！")
            print('=' * 100)
            time.sleep(2)

    # def extract(self):
    def download(self):
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
        for key,value in self.dict.items():
            params_url = "http://localhost:3000"
            payload = {
                "data": f"url{(value,self.ts())}",
            }
            response = requests.post(params_url, data=payload)
            url = response.text.replace("\n","").replace(" ","")
            print(url)
            content = requests.get(url=url,headers=headers).content
            with open(f"img/{key}.png","wb") as f:
                f.write(content)
            time.sleep(0.5)

    def first_page(self):
        payload = {
            'size': 23,
            'current': 0,
            'sort': 0,
            'category': 0,
            'resolution': 0,
            'color': 0,
            'categoryId': 0
        }
        url = "https://api.zzzmh.cn/bz/v3/getData"
        res = requests.post(url=url, json=payload, headers=self.headers)
        list = self.decode(res.json()["result"])["list"]
        for i in list:
            md = i["i"]
            self.dict[md] = f"https://doge.zzzmh.cn/wallpaper/origin/{md}.jpg/fhd"
        print(self.dict)


    def other_page(self):
        start_num = int(input("请输入开始页数"))
        end_num = int(input("请输入开始页数"))

        check_json, secretKey, moveBlockLeft, token = self.slider()
        self.token = check_json["repData"]["token"]
        payload = {
            'size': 23,
            'current': start_num,
            'sort': 0,
            'category': 0,
            'resolution': 0,
            'color': 0,
            'categoryId': 0
        }
        url = "https://api.zzzmh.cn/bz/v3/getData"
        headers = self.headers
        captcha = self.captcha(secretKey, moveBlockLeft, token)
        headers.update({'captcha': captcha})
        res = requests.post(url=url, json=payload, headers=self.headers)
        print(res.text)
        list = self.decode(res.json()["result"])["list"]
        for i in list:
            md = i["i"]
            self.dict[md] = f"https://doge.zzzmh.cn/wallpaper/origin/{md}.jpg/fhd"
        chuck = res.json()["chuck"]

        num = start_num
        while True:
            num += 1
            payload = {
                'size': 23,
                'current': num,
                'sort': 0,
                'category': 0,
                'resolution': 0,
                'color': 0,
                'categoryId': 0
            }
            url = "https://api.zzzmh.cn/bz/v3/getData"
            headers = self.headers
            headers.update({'chuck':chuck})
            res = requests.post(url=url, json=payload, headers=headers)
            data = res.json()
            if data["msg"] == "success":
                result = data["result"]
                list = self.decode(result)["list"]
                for i in list:
                    md = i["i"]
                    self.dict[md] = f"https://doge.zzzmh.cn/wallpaper/origin/{md}.jpg/fhd"
                print(self.dict)
            else:
                check_json, secretKey, moveBlockLeft, token = self.slider()
                self.token = check_json["repData"]["token"]
                payload = {
                    'size': 23,
                    'current': start_num,
                    'sort': 0,
                    'category': 0,
                    'resolution': 0,
                    'color': 0,
                    'categoryId': 0
                }
                url = "https://api.zzzmh.cn/bz/v3/getData"
                headers = self.headers
                captcha = self.captcha(secretKey, moveBlockLeft, token)
                headers.update({'captcha': captcha})
                res = requests.post(url=url, json=payload, headers=self.headers)
                list = self.decode(res.json()["result"])["list"]
                for i in list:
                    md = i["i"]
                    self.dict[md] = f"https://doge.zzzmh.cn/wallpaper/origin/{md}.jpg/fhd"
                chuck = res.json()["chuck"]

            if num >= end_num:
                break
            time.sleep(5)

    def main(self):
        self.first_page()
        self.download()
        self.other_page()
        self.download()


d = wallpaper()
d.main()


# https://bz.zzzmh.cn/index