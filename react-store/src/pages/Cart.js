import React from 'react';
import CartItem from '../components/Cartitem';
import Layout from '../Layout';

const Cart = () => {
    return (

        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className="cart-total">
                    Total:
                    <span className="total-price">￥2450</span>
                </div>
            </div>
        </Layout>

    )
};

export default Cart;