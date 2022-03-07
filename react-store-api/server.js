const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')

//引用jsonwebtoken //驗證通過獲得使用
const jwt = require('jsonwebtoken');

//載入Node.js 檔案系統 fs module
const fs = require('fs');

//絕對路徑
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

//解析
server.use(jsonServer.bodyParser);

server.use(middlewares)

//獲取資料使用Node.js 檔案系統 fs module 
//非同步fs.readFile(fileName [,options], callback) 讀取現有文件
//同步fs.readFileSync(fileName [,options], callback) 讀取現有文件
//使用絕對路徑__dirname 總是回傳被執行 js 檔所在資料夾的絕對路徑
//使用JSON.parse()把一個JSON字串轉換成 JavaScript的資料型態(數值或物件)。
//getUsersDb()獲取JSON資料
const getUsersDb = () => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname,'users.json'), 'UTF-8')
        )
}

//驗證帳號密碼 //認證
const isAuthenticated = ({email, password}) => {
    return (  
        //解析 
        //獲取資料
        //findIndex()方法返回在通過測試（作為一個功能提供）數組的第一個元素的索引。
        //findIndex()返回數值, true的話返回 > 0 or 1, 不存在返回-1
        getUsersDb().users.findIndex( 
            (user) => { return (user.email === email && user.password === password) }
        )!== -1 
    )
    // return email === 'admin@123.com' && password === 'admin'
};

const SECRET = 'test123145353jkjkjl343323434';
const expiresIn = '1h';
//驗證通過獲得Token 
//使用jsonwebtoken套件 jwt.sign(payload, secretOrPrivateKey, [options, callback])
const createToken = (payload) =>{
    return(
        jwt.sign(payload, SECRET, {expiresIn})
    )
}


//自訂串接請求
server.post('/auth/login', (request,response) => {
    const {email, password} = request.body;

    if(isAuthenticated({email,password})){

        const user = getUsersDb().users.find(
            u => u.email === email && u.password === password
        );
        //解構附值 user => {nickname, type, email}
        const { nickname, type, email} = user;

        //JWT //驗證通過=>獲得JWT token
        // const jwtToken = 'dfafhdfhdifda.afasfafadfa.adf233r32fe';
        const jwtToken = createToken({nickname, type, email});
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


//測試請求//get
// server.get('/auth/login',(req, res)=>{
//     return res.status(200).json('Get request success!')
// })


server.use(router)
server.listen(3003, () => {
    console.log('JSON Server is running')
})


//安裝使用nodemon工具 npm i nodemon 