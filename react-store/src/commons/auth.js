//存儲jwToken使用localStorage.setItem(key,value)
const JWT = 'store_token_id';

const setToken = token => {
    localStorage.setItem(JWT, token)
}

//export導出//使用全域global以便每次使用
global.auth = {
    setToken
}