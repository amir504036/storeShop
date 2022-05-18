import React, { Component } from "react";
import SpUtils from "../../tools/SpUtils";
import API from "../global/api";
import { Redirect } from "react-router";
import logo from "../../assets/image/picPoshtibany.png";
import ReactNotification from "react-notifications-component";
import { TRACT_ORDER } from "../global/ConstApi";

class TrackOrder extends Component {
  componentDidMount() {
    document.title = "پیگیری سفارشات";
  }

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      RoutProduct: false
    };

    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRefOrder = React.createRef();
    this.handleRouter = this.handleRouter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addNotification() {
    this.notificationDOMRefOrder.current.addNotification({
      title: " ",
      message: "محصول مورد نظر شما یافت نشد.",
      type: "warning",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    if (this.state.RoutProduct) {
      return (
        <Redirect
          push
          to={{
            pathname:
              "/track/" + SpUtils.convertNumberToEnglishNoZero(this.state.value)
          }}
        />
      );
    }
    try {
      return (
        <div className="sp-container">
          <div className="sp-main">
            <div className="limiter">
              <div className="container-login1000">
                <div className="wrap-login100">
                  <div id="LoginForm">
                    <div className="container">
                      <div className="login-form">
                        <form className="login100-form ">
                          <img
                            className="btn btn-lg sp-logo"
                            src={logo}
                            alt=""
                            width="180"
                            height="130"
                          />

                          <div className="panel">
                            <p> لطفا کد محصول را وارد کنید</p>
                          </div>

                          <div className="app-content">
                            <ReactNotification
                              ref={this.notificationDOMRefOrder}
                            />
                          </div>

                          <div className="form-group float-label-control ">
                            <input
                              type="text"
                              id="inputEmail"
                              className="form-control input-field"
                              placeholder="کد محصول"
                              required=""
                              autoFocus=""
                              value={SpUtils.ConvertNumberToPersianNoZero(
                                this.state.value
                              )}
                              onChange={this.handleChange}
                            />
                          </div>

                          <div>
                            <div>
                              <button
                                className="btn btn-lg  sp-btn-defu"
                                type="submit"
                                onClick={event => {
                                  event.preventDefault();
                                  this.handleRouter();
                                }}
                              >
                                پیگیری خرید
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      return <div className="content" />;
    }
  }

  // handleRouter = () => {
  //   this.setState({
  //     RoutProduct: true
  //   });
  //   console.log("sssssssssssssssssssdasda");
  //   API.Get(
  //     `AdminChannel/purchase/track_order/` +
  //       SpUtils.convertNumberToEnglishNoZero(this.state.value),
  //     "",
  //     this.callBackServies
  //   );
  // };
  // callBackServies(result) {
  //   if (result.status === 200) {
  //     console.log("gogogogogogogogogogogo");
  //   } else {
  //     console.log("dont go");
  //   }
  // }

  async handleRouter() {
    var result = await API.GetPromis(
      TRACT_ORDER + SpUtils.convertNumberToEnglishNoZero(this.state.value),
      "",
      ""
    );
    if (result.status === 200) {
      this.setState({
        RoutProduct: true
      });
    } else {
      this.addNotification();
    }
  }
}

export default TrackOrder;
