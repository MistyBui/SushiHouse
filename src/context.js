import React, { Component } from 'react';
import {sushiData, detailSushi} from './data';

const ProductContext = React.createContext();
//Provider
//consumer
class ProductProvider extends Component {
    state={
        products: [],
        detailSushi: detailSushi,
        cart: [],
        modelOpen: false,
        modelProduct: detailSushi,
        cartSubTotal: 0,
        cartTax: 0, 
        cartTotal: 0,
    }
     componentDidMount() {
         this.setProducts();
     }

    //copy data so we dont change the real data
    setProducts = () => {
        var tempProducts= [];
        sushiData.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem]; //go through products array and add singleItem
        })
        this.setState( ()=>{
            return {products:tempProducts}
        })
    };

    //find product with id
    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    //return information of clicked product to detail page
    handleDetail = id => {
        const product = this.getItem(id);
        this.setState( () => {
            return {detailSushi:product};
        });
    };

    addToCart = id => {
        var tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState (() => {
            return {products:tempProducts, cart:[...this.state.cart,product]};
        },
        () => {this.addTotal()}
        );
    };

    openModel = id => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {modelProduct: product, modelOpen: true}
        })
    };

    closeModel = () => {
        this.setState(() =>{
            return {modelOpen:false}
        })
    };

    increaseQuantity = id => {
        var tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {return {cart:[...tempCart]}}, ()=>{this.addTotal()})
    };

    decreaseQuantity = id => {
        var tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id)
        } else{
        product.total = product.count * product.price;
        this.setState(() => {return {cart:[...tempCart]}}, ()=>{this.addTotal()})
        }
    };

    //rm item when press icon
    removeItem = id => {
        var tempProducts = [...this.state.products];
        var tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        const removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState (() => {
            return {cart:[...tempCart], products:[...tempProducts]};
        },
        () => {this.addTotal()}
        );
    };

    clearCart = () => {
        this.setState(() =>{
            return { cart: []};
        },()=> {
            this.setProducts();
            this.addTotal();
        }); 
    };

    addTotal = () => {
        var subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const roundSubTotal = parseFloat(subTotal.toFixed(2));
        const  tempTax = subTotal*0.24;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = roundSubTotal + tax;
        const roundTotal = parseFloat(total.toFixed(2))
        this.setState(()=>{
            return {
                cartSubTotal: roundSubTotal,
                cartTax: tax,
                cartTotal: roundTotal,
            }
        })
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModel: this.openModel,
                closeModel: this.closeModel,
                increaseQuantity: this.increaseQuantity,
                decreaseQuantity: this.decreaseQuantity,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}; 