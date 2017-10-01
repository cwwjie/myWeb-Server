# 发表动态接口

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

# 轮播图接口
/slider
