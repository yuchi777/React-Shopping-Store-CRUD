//使用jwt-decode
import jwt_decode from 'jwt-decode';

//存入jwToken使用localStorage.setItem(key,value)
const JWT = 'store_token_id';
const setToken = token => {
    localStorage.setItem(JWT, token)
}

//取出jwToken使用localStorage.getItem(key,value)
const getToken = token => {
    return localStorage.getItem(JWT)
}

//定義函數判斷登入
const isLogin = () =>{
    //是否token已經存入
    //判斷是否有jwToken
    const jwToken = getToken();

    //如果token有值和時間搓沒有過期
    return !!jwToken && !isTokenExpired(jwToken);
}

//token是否有效和時間搓超時
const isTokenExpired = token =>{
    try{
        const _info = jwt_decode(token);
        let exp = _info.exp;
        let dateTime = Date.now();
            console.log('_info.exp',exp);
            console.log('Date.now()',dateTime);

        if(_info.exp < (Date.now()/1000)){
            return true;
        }else{
            return false;
        }
    }catch(error){
        return false;
    }
};

//定義函數解碼token獲得訊息
const getUser = () =>{
    //取出jwToken
    const jwToken = getToken();

    //判斷是否登入
    if(isLogin()){
        //使用jwt-decode獲得user資料
        const user = jwt_decode(jwToken);
        return user;
    }else{
        return null;
    }
    

}

//export導出//使用全域global以便每次使用
global.auth = {
    setToken,
    getUser
}