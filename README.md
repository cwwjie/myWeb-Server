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

### 获取所有代办项类别
url: '/todo/getAllCategory'    
method: 'GET'   

### 创建代办项
url: '/todo/createItem'    
method: 'POST'   
data: {  
	description: '任务描述',  
	category: '任务分类 (非必填)',    
	priority: 0, (优先程度 非必填)   
}  

### 修改代办项
url: '/todo/editItem'    
method: 'POST'   
data: {  
	id: '(必填)',  
	isComplete: '0/1, (非必填)',  
	description: '任务描述 (非必填)',  
	category: '任务分类 (非必填)',    
	priority: 0 1 2 3 4, (优先程度 非必填)   
}  


