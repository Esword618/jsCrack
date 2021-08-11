# author:Ajian
# 公众号:spiders
# datetime:2020/12/8 17:02
# software:PyCharm

import requests
session = requests.session()
headers = {
    'Host': 'match.yuanrenxue.com',
    'Connection': 'keep-alive',
    'Content-Length': '0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.55',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Origin': 'http://match.yuanrenxue.com',
    'Referer': 'http://match.yuanrenxue.com/match/3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
session.headers = headers
list = []
for page in range(1,6):
    if page>=4:
        headers['User-Agent'] = 'yuanrenxue.project'
    else:
        pass
    url_logo = 'http://match.yuanrenxue.com/logo'
    res = session.post(url_logo)
    print(res)
    print(res.cookies)
    url_page = 'http://match.yuanrenxue.com/api/match/3?page={}'.format(page)
    response = session.get(url=url_page,headers=headers)
    data_list = response.json()['data']
    list1 = [float(i['value']) for i in data_list]
    list.extend(list1)
    print(list)
set = set(list)
dic={}
for i in set:
    dic[i] = list.count(i)
print(dic)
max = 0
result = 0
for key in dic.keys():
    if dic[key]>=max:
        max = dic[key]
        result = key
        print(result,max)