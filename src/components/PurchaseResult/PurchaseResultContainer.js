import React, { Component } from "react";
import Loading from "../global/Loading";
import PurchaseResult from "./PurchaseResult";
import API from "../global/api";
import NotFound from "../NotFound/NotFound";
import { REZULT_PAYMENT_PAGE } from "../global/ConstApi";

class PurchaseResultContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPayment: null,
      loading: true
    };

    this.handleRouter = this.handleRouter.bind(this);
  }

  componentDidMount() {
    this.handleRouter();
  }

  async handleRouter() {
    var result = await API.GetPromis(
      REZULT_PAYMENT_PAGE + this.props.match.params.invoice_id
    );
    if (result.status === 200) {
      console.log("result");
      console.log(result);
      this.setState({
        loading: false,
        dataPayment: result
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
    } else if (this.state.dataPayment != null) {
      return (
        <div>
          <PurchaseResult dataPayment={this.state.dataPayment} />
        </div>
      );
    } else {
      return <NotFound from={"PurchaseResult"} />;
    }
  }
}

export default PurchaseResultContainer;
