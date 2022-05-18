import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/style/theme.css";
import "../../assets/style/main.css";
import "../../assets/style/util.css";
import "../../assets/style/pageMain.css";
import "../../assets/style/sp-style.css";
import SpUtils from "../../tools/SpUtils";
import API from "../global/api";
import { Redirect } from "react-router";
import ReactNotification from "react-notifications-component";
import { PRODUCT_PAGE } from "../global/ConstApi";
import Slider from "react-slick";

class Home extends Component {
  componentDidMount() {
    document.title = this.props.dataStore.title;
  }
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      RoutProduct: false
    };

    this.handleRouter = this.handleRouter.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
  /// peygham notifikishen nabood mahsool
  addNotification() {
    this.notificationDOMRef.current.addNotification({
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

  async handleRouterr() {
    console.log("Ddddd");
    var result = await API.GetPromis(
      PRODUCT_PAGE +
        this.props.dataStore.code +
        "/" +
        SpUtils.convertNumberToEnglishNoZero(this.state.value),
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
  render() {
    if (this.state.RoutProduct) {
      return (
        <Redirect
          push
          to={{
            pathname:
              "/" +
              this.props.dataStore.code +
              "/" +
              SpUtils.convertNumberToEnglishNoZero(this.state.value)
          }}
        />
      );
    }
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    // list item of Slider

    let ListItemSlider = props => {
      const value = props.value;

      return (
        <div key={value.toString()}>
          <button
            className="sp-main-page-home sp-list-item"
            type="submit"
            onClick={event => {
              event.preventDefault();
              this.setState({
                RoutProduct: true,
                value: value.code
              });
            }}
          >
            <div>
              <img
                className="sp-product-slider-image"
                src={value.images_url}
                alt={"slider"}
              />
              <div className="sp-title">
                <span>{value.title}</span>
              </div>

              <div className="sp-half sp-float-right sp-pr-de">
                <div>
                  <span>{value.price}</span>
                  تومان
                </div>
              </div>
              <div className="sp-half sp-float-left sp-pr-de">
                <div>
                  کد محصول :
                  <span>{value.code}</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      );
    };

    //SliderList of Slider
    function SliderList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map(number => (
        <ListItemSlider value={number} key={number.toString()} />
      ));
      return (
        <Slider className="sp-product-slider" {...settings}>
          {listItems}
        </Slider>
      );
    }

    // console.log('this.props.dataProduct')
    // console.log(this.props.dataProduct.Products[0])
    try {
      return (
        <div className="sp-container">
          <div className="navWrapper">
            <nav className="navbar navbar-dark sp-navbar">
              <a className="navbar-brand ">
                <div className="sp-shop-name">
                  {SpUtils.ConvertNumberToPersianNoZero(
                    this.props.dataStore.title
                  )}
                </div>

                <img src={this.props.dataStore.logo_file_url} alt={"logo"} />
              </a>

              <div className="collapse navbar-collapse" id="toogle-navbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link">Item 1</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Item 1</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Item 1</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Item 1</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="sp-main">
            <div className="sp-main-page-home">
              <div className="login-form">
                <div className="app-content">
                  <ReactNotification ref={this.notificationDOMRef} />
                </div>

                <div className="form-group float-label-control ">
                  <input
                    type="text"
                    id="inputEmail"
                    className="form-control input-field"
                    placeholder="کد محصول را وارد کنید"
                    required=""
                    autoFocus=""
                    value={SpUtils.ConvertNumberToPersianNoZero(
                      this.state.value
                    )}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="Reportservice24 sp-btn1 row">
                  <div className="sp-half">
                    <Link to={"/"}>
                      <button
                        type="button"
                        className="btn  sp-btn-defu "
                        onClick={event => {
                          event.preventDefault();
                          this.handleRouter();
                        }}
                      >
                        مشاهده محصول
                      </button>
                    </Link>
                  </div>
                </div>

                <Link to={"/track/"}>پیگیری محصول</Link>
              </div>
            </div>

            <div className="container">
              <div className="login-form">
                <div className="sp-product-slider">
                  <SliderList numbers={this.props.dataProduct.Products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      return (
        //if page show error
        <div className="content" />
      );
    }
  }

  async handleRouter() {
    var result = await API.GetPromis(
      PRODUCT_PAGE +
        this.props.dataStore.code +
        "/" +
        SpUtils.convertNumberToEnglishNoZero(this.state.value),
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

// callBackServies(result) {
//   if (result.status === 200) {
//     this.setState({
//       RoutProduct: true
//     });
//   } else {
//     console.log("dont go");
//   }
// }
//
// handleRouter() {
//   API.Get(`/AdminChannel/product/`+ this.props.idstore + '/' + SpUtils.convertNumberToEnglishNoZero(this.state.value), "",this.callBackServies);
// }

export default Home;
