import execjs
import requests
from time import sleep
from random import randint

def m():
    path = '一.js'
    with open(path,'r',encoding='utf-8') as f:
        js=f.read()
    js = execjs.compile(js)
    m=js.call('m')
    print(m)
    return m

def spiders():
    sum_list=[]
    headers={
        'Accept': 'application/json, text/javascript, */*; q = 0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN, zh;q=0.9',
        'Connection': 'keep-alive',
        'Cookie': 'qpfccr=true; no-alert=true',
        'Host': 'match.yuanrenxue.com',
        'Referer': 'http://match.yuanrenxue.com/match/1',
        'Pragma': 'no-cache',
        'User-Agent': 'yuanrenxue.project',
        'X-Requested-With': 'XMLHttpRequest',
    }

    for page in range(1,6):
        params={'m':m().replace('|','%E4%B8%A8')}
        print(params)
        print('正在爬取第{}页'.format(page))
        url = 'http://match.yuanrenxue.com/api/match/1?page={}'.format(page)
        response=requests.get(url=url,headers=headers,params=params)
        list=response.json()["data"]
        list=[float(i['value']) for i in list]
        sum_list.extend(list)
        print(sum_list)
        sleep(randint(2,4))
    n=sum(sum_list)/len(sum_list)
    print(n)

spiders()

