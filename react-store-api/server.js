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


//使用nodemon工具 npm i nodemon 