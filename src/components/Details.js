import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link } from 'react-router-dom';
import {ButtonContainer} from './Button';
import Title from './Title';


export default class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                { value => {
                    const {id,img,price,title,description,inCart} = value.detailSushi;
                    return (
                        <div className='container py-5'>
                            {/*title*/}
                            <div className='row'>
                                <div className='col-10 mx-auto text-center text-slanted text-orange my-5 text-capitalize'>
                                <Title name='our' title='nigiri' />
                                </div>
                            </div>
                            {/*end title*/}
                           {/*product info*/}
                           <div className='row'>
                               <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                                   <img src={img} className='img-fluid' alt='sushi'/>
                               </div>
                        {/*product text*/}
                               <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                                    <h2>{title}</h2>
                                    <h4 className='text-orange'>
                                        <strong>price: <span>€</span>{price}</strong>
                                    </h4>
                                    <p className='text-capitalize font-weight-bold mt-3 mb-0'> Ingredients:</p>
                                    <p className='text-muted lead'>{description}</p> {/*faded text and make p stands out*/}
                         {/*button*/}
                               </div>
                               <Link to ='/'>
                                    <ButtonContainer>Back to menu</ButtonContainer>
                               </Link>
                               <ButtonContainer
                                    cart 
                                    disabled={inCart?true:false} 
                                    onClick={()=>{value.addToCart(id); value.openModel(id);}}
                                    >
                                {inCart?'inCart':'Add To Cart'}
                                </ButtonContainer>
                           </div>
                         </div>
                    )
                }}
            </ProductConsumer>
        )
    }
}
