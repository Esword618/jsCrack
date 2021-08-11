import execjs
import requests


def get_cookie():
    path = '二.js'
    with open(path, 'r', encoding='utf8') as f:
        js = f.read()
    js = execjs.compile(js)
    params = js.call('get_cookie')
    cookie = 'm={}'.format(params)
    print(cookie)
    return cookie



def spider():
    list = []
    headers={
        'User-Agent':'yuanrenxue.project'
    }
    for page in range(1,6):
        url='http://match.yuanrenxue.com/api/match/2?page={}'.format(page)
        headers['cookie']=get_cookie()
        response = requests.get(url = url,headers=headers,timeout=5)
        data = response.json()["data"]
        print(data)
        data_list = [float(i["value"]) for i in data]
        list.extend(data_list)
    print(sum(list))

spider()