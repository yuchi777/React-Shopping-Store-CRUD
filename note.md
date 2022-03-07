# Commons
axios 串接api  
helpers 匯率符號換算  

# Components
Header  
Panel 彈出控制面板裝載子組件  
AddInventory 商品庫存增加(彈出控制面板子組件)  
EditInventory 商品庫存修改(彈出控制面板子組件)  
Product 產品卡片  
Products 產品主頁面  
ToolBox 搜尋列  
Router 路徑切換  


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

### index.html
        <div id="root"></div>

### index.js
### app.scss / style.scss
>載入toastify套件
import {ToastContainer} from 'react-toastify';
>載入toastify css
import 'react-toastify/dist/ReactToastify.css';

import "./css/app.scss";  
import "./css/style.scss";  

        ReactDOM.render(
            <div>
                <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                <Router/>
            </div>,
        document.getElementById('root'))

### App.js
        import React from 'react';
        import Header from '../components/Header';
        import Products from '../components/Products';

        class App extends React.Component{
          render(){
            return(
              <div className="main">
                  <Header nickname="Admin" age={28} marry={true}/>
                  <Products/>
              </div>
            );
          }
        }

        export default App;

### Router.js
# <App/> <Login/> <NotFound/>
        import React from 'react';
        import { BrowserRouter, Switch, Route } from 'react-router-dom';
        import App from './pages/App';
        import Login from './pages/Login';
        import NotFound from './pages/NotFound'


        const Router = () =>{
            return(
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                        <App/>
                        </Route>
                        <Route path="/login" component={Login}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            );
        }

        export default Router;

# Node
# Node.js Web Server
### 使用nodemon工具 npm i nodemon 


        const jsonServer = require('json-server')
        const server = jsonServer.create()
        // const router = jsonServer.router('db.json')
        
        //絕對路徑
        const path = require('path')
        const router = jsonServer.router(path.join(__dirname, 'db.json'))
        const middlewares = jsonServer.defaults()
        
        //解析
        server.use(jsonServer.bodyParser);
        
        server.use(middlewares)
        
        //驗證帳號密碼
        const isAuthenticated = ({email, password}) =>{
            return email === 'admin@123.com' && password === 'admin'
        };

        //自訂串接請求
        server.post('/auth/login', (request,response) => {
            const {email, password} = request.body;
        
            if(isAuthenticated({email,password})){
                //JWT
                //驗證通過獲得JWT token
                const jwtToken = 'dfafhdfhdifda.afasfafadfa.adf233r32fe';
                return response.status(200).json(jwtToken);
            }else{
                //驗證不通過返回訊息
                //401 沒有權限,帳號密碼不正確
                const status = 401 ;
                const message = "Incorrect email or password";
                return response.status(status).json({status,message})
            }
        
            // console.log('Login Success test');
            // return res.status(200).json('Login Success');
        });
        
        
        server.use(router)
        server.listen(3003, () => {
            console.log('JSON Server is running')
        })

### Node.js - fs module

        Node.js 的 fs module ，是用來操作實體檔案，可以同步或非同步存取檔案系統操作。
        一般建議使用　非同步存取　檔案，性能高、速度快、無阻塞。
        
        非同步讀取檔案
        我們用
        fs.readFile(fileName [,options], callback)
        可以讀取檔案。
        
        參數：
        
        fileName: 檔案的完整路徑及檔名，格式字串。
        options: options 可能是一個物件或字串，包含"編碼"及"flag"。這裡預設的編碼是 utf8 ,      flag是 “r"。
        call back: 是帶兩個參數的function，err及file data，當我們執行readFile完成時, 要做的     事, 例如: 回傳file data。