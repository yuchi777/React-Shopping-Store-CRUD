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