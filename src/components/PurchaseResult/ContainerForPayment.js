import Loading from "../global/Loading";
import React, { Component } from "react";
import API from "../global/api";
import NotFound from "../NotFound/NotFound";
import { PAYMENT_PAGE } from "../global/ConstApi";
class ContainerForPayment extends Component {
  constructor(preps) {
    super(preps);
    this.state = {
      loading: true
    };
    this.payment = this.payment.bind(this);
    this.callBackServies = this.callBackServies.bind(this);
  }
  componentDidMount() {
    document.title = "در حال بارگزاری صفحه پرداخت";
    this.payment();
  }

  payment = () => {
    // this.setState({ permisionPayment: true });
    API.Post(PAYMENT_PAGE, this.props.location.data, this.callBackServies);
  };

  callBackServies(result) {
    // console.log("this.props.location.data");
    // console.log(this.props.location.data);
    // console.log("resultresult");
    // console.log(result);
    // console.log("result");
    // console.log(result);
    if (result.status === 200) {
      if (result.data != null) {
        window.location.assign(result.data.gateway_url);
      }
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
    } else {
      return <NotFound from={"PurchaseResult"} />;
    }
  }
}

export default ContainerForPayment;
