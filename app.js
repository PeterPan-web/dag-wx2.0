//导入服务器
const express =require('express')
const path=require('path')
+//创建web服务器
const app =express()
//托管静态资源
app.use(express.static(path.join(__dirname,'dist')))
app.listen(8080 () =>{
  console.log('app listening on port 8080')
})