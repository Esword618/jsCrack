import execjs
import requests
import base64
import time
from time import sleep
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import pad


def get_time():
    now_time = time.time()
    m = int(now_time * 1000)
    f = int(now_time) *1000
    print(m,f)
    return str(m),str(f)

def jiami():
    m, f_time = get_time()
    # 前面push 进数组的因为没有传递加密前值给服务器没法校验写死即可
    data = '5ebb09ca3d0199732a48ec64851405f9,5ebb09ca3d0199732a48ec64851405f9,5ebb09ca3d0199732a48ec64851405f9,5ebb09ca3d0199732a48ec64851405f9,'
    path = '五.js'
    with open(path, 'r', encoding='utf8') as f:
        js = f.read()
    js = execjs.compile(js)
    cm = js.call('get_my',m)
    data += cm
    key = base64.b64encode(m[:-1].encode())
    cryptor = AES.new(key=key, mode=AES.MODE_ECB)
    data = base64.b64encode(cryptor.encrypt(pad(data.encode(), AES.block_size))).decode()
    headers = {
        'cookie': 'm=' + cm + '; RM4hZBv0dDon443M=' + data,
        'user-agent': 'yuanrenxue.project'
    }
    return data,headers,m,f_time

def main():
    list = []
    for page in range(1, 6):
        print("正在抓取第{}页".format(page))
        data, headers, m, f_time = jiami()
        url = 'http://match.yuanrenxue.com/api/match/5?page=' + str(page) + '&m=' + m + '&f=' + f_time
        response = requests.get(url, headers=headers)
        data_list = response.json()['data']
        for i in data_list:
            list.append(float(i['value']))
        sleep(2)
        # print(list)
    list.sort(reverse=True)
    print(list)
    print("抓取完毕，结果如下:")
    print(sum(list[0:5]))

if __name__ == '__main__':
    main()