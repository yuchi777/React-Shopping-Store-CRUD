import React from 'react';
//使用Panel彈出層
import Panel from './Panel';
import {formatPrice} from '../commons/helpers'
import EditInventory from './EditInventory';

class Product extends React.Component{


    //設置打開Panel組件//使用open方法
    toEdit = () =>{
        Panel.open({
            // EditInventory => Product => Panel.open()
            //import EditInventory並傳遞子組件參數到open()
            component: EditInventory,
            props:{
                product: this.props.product,
                deleteProduct:this.props.delete
            },
            callback: data =>{
                console.log(data);
                //如果data不為空
                if(data){
                    this.props.update(data);
                }
            }
        })
    }

    formatPrice = cents =>{
        return (cents/100).toLocaleString('zh',{
            style:'currency',
            currency:'CNY',
        })
    }

    render(){
        // ES6
        //this.state.products.map((p)=>{ <Product product={p} /> } => this.props.product
        const { name, image, tags, price, status } = this.props.product;
        const _pClass = {
            available:'product',
            unavailable:'product out-stock'
        };


        return(
            // <div className="product out-stock">
            <div className={_pClass[status]}>
                <div className="p-content">
                    
                    <div className="p-head has-text-right" onClick={this.toEdit}>
                        <span className="icon edit-btn">
                            <i className="fas fa-sliders-h"></i>
                        </span>
                    </div>

                    <div className="img-wrapper">

                        <div className="out-stock-text">Out of Stock</div>
                        <figure className="image is-4by3">
                            {/* <img src="/images/2.jpg" alt="" /> */}
                            {/* <img src="http://fakeimg.pl/640x480/" alt="Nike Paul George PG 3" /> */}
                            <img src={image} alt={name} />
                        </figure>

                    </div>

                    <p className="p-tags">{tags}</p>
                    <p className="name">{name}</p>
                </div>
                
                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button className="add-cart" disabled={status === 'unavailable'}>
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Product;