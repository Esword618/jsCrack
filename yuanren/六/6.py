# import requests
# import execjs
# import time
#
#
# def get_params(timestamp):
#     path = '6.js'
#     with open(path, 'r', encoding='utf-8') as f:
#         js = f.read()
#     js = execjs.compile(js)
#     params = js.call('params', (timestamp,3))
#     print(params)
#     return params
# #
#
# def get_timestamp():
#     timestamp = time.time()
#     timestamp = str(int(timestamp))+'000|'
#     print(timestamp)
#     return timestamp
#
#
# def main():
#     timestamp = get_timestamp()
#     get_params(timestamp)
#
#
# main()

import time
import execjs
import requests


def get_cipher(timestamp, page):
    # 导入JS,读取需要的js文件
    with open(r'js6.js', encoding='utf-8', mode='r') as f:
        JsData = f.read()
    # 加载js文件,使用call()函数执行,传入需要执行函数即可获取返回值
    [cipher, limit] = execjs.compile(JsData).call('get_cipher', timestamp, page)
    limit = f'{page}-' + str(timestamp) + '|'

    return cipher, limit


def get_data(page):
    cipher, limit = get_cipher(int(time.time()) * 1000, page)
    url = 'http://match.yuanrenxue.com/api/match/6'
    params = {
        'page': page,
        'm': cipher,
        'q': limit
    }
    headers = {
        'Host': 'match.yuanrenxue.com',
        'Referer': 'http://match.yuanrenxue.com/match/6',
        'User-Agent': 'yuanrenxue.project',
    }
    response = requests.get(url=url, headers=headers, params=params)
    answer = [i['value'] for i in response.json()['data']]
    print(f'第{page}页的三等奖:{answer}')

    return answer

if __name__ == '__main__':
    total = []
    for i in range(1,6):
        total += get_data(i)
    total = sum(total)*24
    print(f'五页中奖的总金额:{total}元')