//安裝使用nodemon工具 npm i nodemon 

const jsonServer = require('json-server')
const server = jsonServer.create()
// const router = jsonServer.router('db.json')

//引用jsonwebtoken //驗證通過獲得使用
const jwt = require('jsonwebtoken');

//使用Node.js 檔案系統 fs module
const fs = require('fs');

//絕對路徑
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

//解析
server.use(jsonServer.bodyParser);

server.use(middlewares)

//獲取users.json資料使用Node.js 檔案系統 fs module 
//非同步fs.readFile(fileName [,options], callback) 讀取現有文件
//同步fs.readFileSync(fileName [,options], callback) 讀取現有文件
//使用絕對路徑__dirname 總是回傳被執行 js 檔所在資料夾的絕對路徑
//使用JSON.parse()把一個JSON字串轉換成 JavaScript的資料型態(數值或物件)。
//getUsersDb()獲取JSON資料
const getUsersDb = () => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8')
    )
}

//驗證帳號密碼 //認證
const isAuthenticated = ({ email, password }) => {
    return (
        //解析 
        //獲取資料
        //findIndex()方法返回在通過測試（作為一個功能提供）數組的第一個元素的索引。
        //findIndex()返回數值, true的話返回 > 0 or 1, 不存在返回-1
        getUsersDb().users.findIndex(user => user.email === email && user.password === password
        ) !== -1
    );
    // return email === 'admin@123.com' && password === 'admin'
};

const isExist = ( email ) => {
    return (
        //解析 
        //獲取資料
        //findIndex()方法返回在通過測試（作為一個功能提供）數組的第一個元素的索引。
        //findIndex()返回數值, true的話返回 > 0 or 1, 不存在返回-1
        getUsersDb().users.findIndex(user => user.email === email) !== -1
    );
    // return email === 'admin@123.com' && password === 'admin'
};

const SECRET = 'test123145353jkjkjl343323434';
const expiresIn = '1h';
//驗證通過獲得Token 
//使用jsonwebtoken套件 jwt.sign(payload, secretOrPrivateKey, [options, callback])
const createToken = payload => {
    return jwt.sign(payload, SECRET, { expiresIn });
}


//自定義串接請求 //login
server.post('/auth/login', (request, response) => {
    const { email, password } = request.body;

    if (isAuthenticated({ email, password })) {

        //array.find() 只會回傳第一個符合條件的值
        const user = getUsersDb().users.find(
            u => u.email === email && u.password === password
        );
        //解構附值 user => {nickname, type}
        const { nickname, type } = user;

        //JWT //驗證通過=>獲得JWT token
        //const jwtToken = 'dfafhdfhdifda.afasfafadfa.adf233r32fe';
        const jwtToken = createToken({ nickname, type, email });
        return response.status(200).json(jwtToken);
    } else {
        //驗證不通過返回訊息
        //401 沒有權限,帳號密碼不正確
        const status = 401;
        const message = "Incorrect email or password";
        return response.status(status).json({ status, message })
    }

    // console.log('Login Success test');
    // return res.status(200).json('Login Success');
});



//自定義串接請求 //Register New User
server.post('/auth/register', (req, res) => {

    //用戶資訊
    const { email, password, nickname, type } = req.body;

    // -----step1 驗證
    if (isExist( email )) {
        const status = 401;
        const message = 'Email already exist';
        return res.status(status).json({ status, message });
    }

    // -----step2 撈取users.json資料
    //讀取
    //fs.readFile(fileName [,options], callback)
    //fileName: 檔案的完整路徑及檔名，格式字串。
    //options: options 可能是一個物件或字串，包含"編碼"及"flag"。這裡預設的編碼是 utf8 , flag是 “r"。
    //call back: 是帶兩個參數的function，err及file data，當我們執行readFile完成時, 要做的事, 例如: 回傳file data。
    fs.readFile(path.join(__dirname, 'users.json'), (err, _data) => {

        if (err) {
            const status = 401;
            const message = err;
            return res.status(status).json({ status, message });
        }

        //Get current users data
        //object.toString() 方法返回字串。我們可以獲取所需的數字物件並將其與此函式一起使用以將其轉換為字串。
        const data = JSON.parse(_data.toString());
        console.log('usersData:', data);
        //Get the id of last user
        const last_item_id = data.users[data.users.length - 1].id;
        console.log('last_item_id:', last_item_id);
        //Add new user
        data.users.push({ id: last_item_id + 1, email, password, nickname, type });//add some data

        //寫入
        //fs.writeFile(filename, data[, options], callback)
        //fileName: 檔案的完整路徑及檔名，格式字串。
        //data: 要寫入的檔案內容。
        //options: options 可能是一個物件或字串，包含"編碼"及"flag"。這裡預設的編碼是 utf8 , flag是 “w"。
        //call back: 只帶一個錯誤參數err的function，當我們執行writeFile完成時, 要做的事。例如: 寫入成功的訊息顯示；失敗時，丟出err。
        fs.writeFile(
            path.join(__dirname, 'users.json'),
            JSON.stringify(data),
            (err, result) => {
                //Write
                if (err) {
                    const status = 401;
                    const message = err;
                    return res.status(status).json({ status, message });

                }
            });

    });


    //Create token for new user
    const jwToken = createToken({ nickname, type, email });
    res.status(200).json(jwToken);

});



//測試請求//get
// server.get('/auth/login',(req, res)=>{
//     return res.status(200).json('Get request success!')
// })

//購物車判斷
server.use('/carts', (req, res, next) => {
    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        const status = 401;
        const message = 'Error	in	authorization	format';
        res.status(status).json({ status, message });
        return;
    }
    try {
        
        const verifyTokenResult = verifyToken(
            req.headers.authorization.split(' ')[1]
        );

         //instanceof判斷A是否為B的實例
        //object instanceof constructor
        //object: The object to test // constructor: Function to test against
        if (verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Access	token	not	provided';
            res.status(status).json({ status, message });

            return;
        }

        //中介軟體函數是一些有權存取要求物件 (req)、回應物件 (res) 和應用程式要求/回應循環中之下一個中介軟體函數的函數。下一個中介軟體函數通常以名為 next 的變數表示。
        //next()繼續處理carts請求返回資料
        next();
    } catch (err) {
        const status = 401;
        const message = 'Error	token	is	revoked';
        res.status(status).json({ status, message });
    }
});

//Verify	the	token
//驗證token
//verify the token
//jwt.verify方法
//透過模組上的verify()方法可以完成 Base64 解碼與 Token 的驗證，並回傳解碼後的 Payload — 驗證時需要帶入欲驗證的token與自訂的密鑰
//自訂密鑰（SECRET）
const verifyToken = token => {
    return jwt.verify(token, SECRET, (err, decode) =>
        decode !== undefined ? decode : err
    );
};




server.use(router);
server.listen(3003, () => {
    console.log('JSON Server is running')
})


