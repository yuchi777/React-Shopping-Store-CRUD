//使用 React Hook Form 函式庫***************************************************
import React from "react";
import { useForm } from "react-hook-form";

//使用axios
import axios from "../commons/axios";

//使用toast
import { toast } from 'react-toastify';

//function component
export default function Login(props) {

  //useFrom為函式返回需要用的值並解構附值
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  console.log(errors);
  // console.log(watch("email"));

  const onSubmit = async data => {

    // 2.獲取表單數據
    // const formData = {
    //   eamil: this.emailRef.current.value,
    //   password: this.passwordRef.current.value,
    // };
    
    console.log(data);

    // 3.處理註冊邏輯
    //axios串驗證
    try {
      //解構附值
      const { nickname, email, password } = data;
      //type: 1 =>admin; 0 => user
      //串API
      const response = await axios.post('/auth/register', { nickname, email, password, type: 0  });
      console.log('response:',response);

      const jwToken = response.data;
      console.log('jwToken',jwToken);

      //web storage 物件 
      //localStorage:可以跨瀏覽器分頁做使用、使用者關掉分頁或瀏覽器再打開資料仍不會消失，且資料無期效限制，資料將永久被保留。(5MB容量)
      //localStorage存入資料：setItem(key,value)//取出資料:getItem(key)//移除資料:removeItem(key)
      //sessionStorage：生命週期較短，當使用者關掉瀏覽器或分頁時，sessionStorage 中的資料將被清空。
      //localStorage.setItem('store_token_id',jwToken) =>global.suth.setToken(jwToken)
      global.auth.setToken(jwToken);

      toast.success('Register Success');

      // 4.跳轉到首頁
      props.history.push("/");
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data.message;
      toast.error(message);

    }

  }


  return (
    <div className="login-wrapper">

      {/* //******************************************************************************************** */}
      {/* 不同事件綁定方式 */}
      {/* <a href="/" onClick={this.handleClick.bind(this)}>Click</a> */}
      {/* <a href="/" onClick={(event)=>{this.handleClick(event)}}>Click</a> */}
      {/* <a href="/" className="button" onClick={(event)=>{this.handleClick('Clicked',event)}}>Click</a> */}
      {/* <a href="/" className="button" onClick={this.handleClick.bind(this,'Clicked')}>Click</a> */}
      {/* //******************************************************************************************** */}

      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">

            <input
              className={`input ${errors.nickname && 'is-danger'}`}
              type="text"
              placeholder="Nickname"
              name="nickname"
              {...register("nickname", { 
                required: 'nickname is required', 
              
              })}
            ></input>

            {errors.nickname && (
              <p className="helper has-text-danger">{errors.nickname.message}</p>)}
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">

            <input
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              placeholder="Email"
              name="email"
              {...register("email", { 
                required: 'email is required', 
                pattern: {
                value: /^[a-za-z0-9_-]+@[a-za-z0-9_-]+(\.[a-za-z0-9_-]+)+$/, //email驗證正則表達式
                message: 'invalid email' // JS only: <p>error message</p> TS only support string
              } })}
            ></input>

            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>)}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">

            <input
              className={`input ${errors.password && 'is-danger'}`}
              type="password"
              placeholder="Password"
              name="password"
              {...register("password", { 
                required: 'password is required', 
                minLength: { value: 6, message: "Min length is 6" } })}
            ></input>

            {errors.password && (
              <p className="helper has-text-danger">{errors.password.message}</p>)}
          </div>
          <br />
          <div className="control">
            <button className="button is-fullwidth is-primary">
              Submit
            </button>
          </div>
        </div>
      </form>

      {/* <div className="control">
            <button className="button is-fullwidth is-link" onClick={this.handleClick}>
              <span className="icon-text">
                <span className="icon">
                  <i class="far fa-thumbs-up"></i>
                </span>
                <span>{this.state.isLike ? 'NO':'YES'}</span>
              </span>
            </button>
          </div> */}


    </div>
  )
}
