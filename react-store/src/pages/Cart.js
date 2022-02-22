import React,{useState, useEffect} from 'react';
import CartItem from '../components/Cartitem';
import Layout from '../Layout';
import axios from '../commons/axios';
import { formatPrice } from '../commons/helpers';

//動態渲染畫面 : 獲取資料 => 放置內部狀態改變
//函數組件 : 沒有狀態的渲染,可使用props
//類別組件 : 可以定義內部狀態 
//生命週期函數(),第一次渲染之後時執行此函數
//因為componentDidMount 只存在class component => 使用 Hook => useEffect
//使用Hook: 是React v16.8 新增特性,可以在不編寫class情況下使用state以及其他React特性
//使用Hook => import {useState}


//class Component範例
// class Cart extends React.Component{

//     state = {
//         cart:[]
//     }

//     componentDidMount(){
//         axios.get('/carts').then(res => this.setState({
//             carts: res.data
//         }))
//     }

//     render(){

//     }
// }



const Cart = () => {

    //使用 Hook => useState(初始值) 
    const [carts, setCarts] = useState([]) // 返回[],使用解構? [carts, setCarts] = [ ]

    //使用Hook => useEffect
    //第一次渲染或每次更新時執行useEffect
    // useEffect(()=>{
    //     axios.get('/carts').then( (res)=>{
    //         return(this.setState({
    //             cart: res.data
    //         }))
    //     })
    // })
    useEffect(()=>{
        axios.get('/carts').then(res => setCarts(res.data) )
    })

    //總價格
    // reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。
    const totalPrice = () =>{
        const totalPrice = carts.map(cart => cart.mount * cart.price).reduce((a,value) => a + value,0);
        return formatPrice(totalPrice) ;
    }

    return (

        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    {
                        carts.map((cart)=>{
                            return <CartItem key={cart.id} cart={cart}/>
                        })
                    }
                </div>
                <div className="cart-total">
                    Total:
                    <span className="total-price">{totalPrice()}</span>
                </div>
            </div>
        </Layout>

    )
};

export default Cart;