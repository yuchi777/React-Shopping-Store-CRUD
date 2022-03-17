# Commons
        axios 串接api  
        helpers 匯率符號換算  
        auth 處理jwToken
# Components
        Header 
        Panel 彈出控制面板裝載子組件  
        AddInventory 商品庫存增加(彈出控制面板子組件)  
        EditInventory 商品庫存修改(彈出控制面板子組件)  
        Product 產品子卡片  
        Products 產品  
        ToolBox 搜尋列  
        UserProfile 使用者資料(從Header打開UserProfile彈出視窗並帶入props的user資料)
        Cartitem 購物車商品列
# Pages
        App <Layout><Products /></Layout>
        Cart 購物車頁面
        Login 登入頁面
        Register 註冊頁面
        NotFound 無頁面

# Others
        index 在div#root放置<Router> 
        Router 路徑切換 /(App),/login,/register,/cart,/notfound 

        Layout 在div.main 放置<Header> & {props.children} 
        (父層為App.js, <Layout><Products /></Layout>, 
        <Products/>變動時{props.children}跟著改變)


# JSON SERVER
        API: 使用JSON SERVER模擬  
        安裝: npm i json-server  
        設定port: json-server --watch db.json --port 3003  
        "license": "MIT"  

# 串接API (fetch / axios)
### (一)fetch 方法------------------------------
        fetch('http://localhost:3003/products')
        .then( re => re.json())
        .then((data) =>{
            console.log(data);
            this.setState({
                products : data
            });
        }) 

 ### (二)axios方法-------------------------------
        axios.get('/products')
        .then((re)=>{
            console.log(re.data);
            this.setState({
                products: re.data,
                sourceProducts:re.data
            })
        })

# axios攔截器
        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
          
# 路由設定 react-router-dom@5.2.0
# UI套件 Bulma
>引入Bulma
@import '../../node_modules/bulma/bulma.sass';

# 通知套件 react-toastify
安裝: npm i react-toastify
>載入toastify套件
import {ToastContainer} from 'react-toastify';

>使用toast
>import {toast} from 'react-toastify';

>載入toastify css
import 'react-toastify/dist/ReactToastify.css';

# 使用React Transition Group (npm install), 提供Components使用(Transition, CssTransition, SwitchTransition, TransitionGroup)

# 其他


>import  Google Font
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');

>import fontawesome
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');


### app.scss / style.scss
>載入toastify套件
import {ToastContainer} from 'react-toastify';
>載入toastify css
import 'react-toastify/dist/ReactToastify.css';

import "./css/app.scss";  
import "./css/style.scss";  


# Node
# Node.js Web Server
        Server.js

        // 1 - 載入 Node.js 原生模組 http
        var http = require('http'); 
        // 2 - 建立server
        var server = http.createServer(function (req, res) {   
        // 在此處理 客戶端向 http server 發送過來的 req。
        });
        //3 - 進入此網站的監聽 port, 就是 localhost:xxxx 的 xxxx
        server.listen(5000); 
        console.log('Node.js web server at port 5000 is running..')

### 使用nodemon工具 npm i nodemon 
    nodemon server.js 
    
### Node.js - fs module

        Node.js 的 fs module ，是用來操作實體檔案，可以同步或非同步存取檔案系統操作。
        一般建議使用非同步存取檔案，性能高、速度快、無阻塞。
        
        非同步讀取檔案
        fs.readFile(fileName [,options], callback)
        fileName: 檔案的完整路徑及檔名，格式字串。
        options: options 可能是一個物件或字串，包含"編碼"及"flag"。這裡預設的編碼是 utf8 , flag是 “r"。
        call back: 是帶兩個參數的function，err及file data，當我們執行readFile完成時, 要做的事, 例如: 回傳file data。

        寫入
        fs.writeFile(filename, data[, options], callback)
        fileName: 檔案的完整路徑及檔名，格式字串。
        data: 要寫入的檔案內容。
        options: options 可能是一個物件或字串，包含"編碼"及"flag"。這裡預設的編碼是 utf8 , flag是 “w"。
        call back: 只帶一個錯誤參數err的function，當我們執行writeFile完成時, 要做的事。例如: 寫入成功的訊息顯示；失敗時，丟出err。
       
   

### 使用jsonwebtoken 創造Token
        install: npm install jsonwebtoken
        jwt.sign(payload, secretOrPrivateKey, [options, callback])

        const SECRET = 'test123145353jkjkjl343323434';
        const expiresIn = '1h'; 
        jwt.sign(payload, SECRET, {expiresIn});

        JWT放置HTTP HEAD訊息裡Authorization字段裡面
        request headers --> Authorization
        Authorization: Bearer <token>
### 使用jwt-decode 解碼
        npm i jwt-decode
### 使用React Hook Form 表單函式庫
        https://react-hook-form.com/
        npm install react-hook-form
        Hook => 使用function component, 不使用class component
        

### 使用serve - npm
        https://www.npmjs.com/package/serve
        https://github.com/vercel/serve#readme
        npm i serve

### 使用Vercel.com
        https://vercel.com/yuchi777/react-store/51C8GZg2nCnGRiQe7Boft31KsvzJ