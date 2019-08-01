#coding:utf-8

import json

apiFile = open('api.json', 'r')

datas = apiFile.read()
apiJson = json.loads(datas)
apiList = apiJson['paths']
pathList = apiList.keys()

data = []

for rel in pathList:
    
    
    
