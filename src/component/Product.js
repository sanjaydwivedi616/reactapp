import React, { Component } from "react";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      size: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async featchProductDataList() {
    const dataResponce = await axios.get("http://localhost:3333/product");
    this.setState({
      product: dataResponce.data
    })
  }
  componentDidMount() {
    this.featchProductDataList();
  }
  handleChange(event) {
    this.setState({
      size: event.target.value
    });
  }
  AddProductToCurt = (id) => {
    this.state.product.filter(data => {
      if (data.productId == id) {
        alert(data.productId)
      }

    })
  }

  render() {
    const { product } = this.state
    console.log(product);
    return (
      <div className="container-fluid">
        <div className="row">
          {product.map(product => {
            return (
              <div key={product.productId} className='col-sm-6 card-product'>
                <h5 className='card-title'>{product.productName}</h5>
                <hr />
                <div>
                  <span className='card-text-left'><b>Product ID : </b>{product.productId}</span>
                  <span className='card-text-right'><b>Coverage : </b>{product.productCoverage}</span>
                </div>
                <div>
                  <span className='card-text-left'><b>Price</b> <span className="card-price">&#x20b9;{product.productPrice}</span></span>
                  <div className='card-text-right'>
                    <label>
                      <input type="radio" name="slectedYear" value="1year" />1 Year
                    </label>
                    <label>
                      <input type="radio" name="slectedYear" value="3year" />3 Year
                    </label>
                    <label>
                      <input type="radio" name="slectedYear" value="5year" />5 Year
                    </label>
                  </div>
                </div>
                <button className="card-text-right" type="button" onClick={() => this.AddProductToCurt(product.productId)}>ADD TO CART</button>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default Product;
