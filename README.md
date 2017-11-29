# Restful API - 第三版

# 发表动态接口(mongodb)

### 创建动态
url: '/dynamic'   
method: 'POST'   
data: {  
    title: String, (非必填)  
    content: String, (必填)  
}  

### 根据时间获取动态
url: '/dynamic/getdata/sortbytime'   
method: 'GET'   
param: '?sequence=new' // old   

### 乱序获取动态 
url: '/dynamic/getdata/sortbyrandom'  
method: 'GET'   


### 删除动态
url: '/dynamic/delete'  
method: 'POST'    
data: {  
	id: '59d2e63af8ec5014ecfa4f1f'  
}  

### 编辑动态
url: '/dynamic/update'  
method: 'POST'   
data: {  
	id: '59d2e63af8ec5014ecfa4f1f', (必填)  
    title: String, (非必填)  
    content: String, (必填)  
}  

### 点赞加1
url: '/dynamic/update/upvote'   
method: 'POST'   
data: {   
	id: '59d2e63af8ec5014ecfa4f1f'  
}  

### 需记 -1/+1
url: '/dynamic/update/thoughtsCount'  
method: 'POST'  
data: {  
	id: '59d2e63af8ec5014ecfa4f1f'  
	isAdd: true (非必填)  
}  


# 轮播图接口(mongodb)

### 获取所有轮播图
url: '/slider'  
method: 'POST'  GET  

# 用户接口

### 用户登录
url: '/user/login'  
method: 'POST'  
data: {  
	account: 'account'  
	password: 'password'  
}  

### 检测cookie是否正确(过期)
url: '/user/checkLogin'    
method: 'GET'   
cookie: 'token'   

# 待办事项接口(mysql)

### 根据时间获取代办项
url: '/todo/getAllByTime'    
method: 'GET'   

### 创建代办项
url: '/todo/createItem'    
method: 'GET'   
data: {  
	description: '任务描述',  
	category: '任务分类 (非必填)',    
	priority: 0, (优先程度 非必填)   
}  


