import Loading from "../global/Loading";
import React, { Component } from "react";
import Home from "./Home";
import NotFound from "../NotFound/NotFound";
import API from "../global/api";
import { HOME_PAGE, PRODUCT_OF_STORE } from "../global/ConstApi";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStore: null,
      dataProduct: null,
      loading: true
    };
  }

  componentDidMount() {
    this.handleRouter = this.handleRouter.bind(this);
    this.handleRouterProductOfStore();
    this.handleRouter();
  }

  async handleRouter() {
    let result = await API.GetPromis(
      HOME_PAGE + this.props.match.params.idStore,
      ""
    );

    this.setState({
      dataStore: result.data,
      loading: false
    });
  }

  async handleRouterProductOfStore() {
    let result = await API.GetPromis(
      PRODUCT_OF_STORE + this.props.match.params.idStore,
      ""
    );

    this.setState({
      dataProduct: result.data
    });
  }

  render() {
    //if get data fram api show page elase show loading page

    if (this.state.loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else if (this.state.dataStore != null) {
      return (
        <div>
          <Home
            dataStore={this.state.dataStore}
            dataProduct={this.state.dataProduct}
          />
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

export default HomeContainer;
