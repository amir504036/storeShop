import React, { Component } from "react";
import Product from "./Product";
import Loading from "../global/Loading";
import API from "../global/api";
import NotFound from "../NotFound/NotFound";
import { PRODUCT_PAGE } from "../global/ConstApi";

class ProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProduct: null,
      loading: true
    };
    this.callBackServies = this.callBackServies.bind(this);
  }

  componentDidMount() {
    API.Get(
      PRODUCT_PAGE + this.props.location.pathname,
      "",
      this.callBackServies
    );
  }

  callBackServies(result) {
    if (result.status === 200) {
      this.setState({
        dataProduct: result.data,
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else if (this.state.dataProduct != null) {
      return (
        <div>
          <Product
            data={this.state.dataProduct}
            page={this.props.location.pathname}
          />
        </div>
      );
    } else {
      return <NotFound from={"store"} page={this.props.match.url} />;
    }
  }
}

export default ProductContainer;
