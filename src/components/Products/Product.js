import React, { Component } from "react";
import SpUtils from "../../tools/SpUtils";
import { Redirect } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const nornal = "form-control";
const danger = "form-control form-danger";
let request;

class Product extends Component {
  componentDidMount() {
    document.title = this.props.data.title;

    const fields = this.state.fields;

    //for get datat from local storage
    if (fields["nameAndLastname"] != null) {
      fields["nameAndLastname"] = localStorage.getItem("nameAndLastname");
    }

    if (fields["phoneNumber"] != null) {
      fields["phoneNumber"] = localStorage.getItem("phoneNumber");
    }

    if (fields["email"] != null) {
      fields["email"] = localStorage.getItem("email");
    }

    if (fields["address"] != null) {
      fields["address"] = localStorage.getItem("address");
    }

    this.setState({ fields });
  }
  constructor(preps) {
    super(preps);

    this.state = {
      ResultFeatures: [],
      tab: true,
      tabStyle: "nav-link active",
      tabStyle1: "nav-link",
      fields: {
        nameAndLastname: "",
        phoneNumber: "",
        email: "",
        address: "",
        comment: ""
      },

      error: {
        alertNameAndLastname: nornal,
        alertPhoneNumber: nornal,
        alertEmail: nornal,
        alertAddress: nornal,
        alert: ""
      }
    };

    this.onClickOnPardakht = this.onClickOnPardakht.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.comureFeature = this.comureFeature.bind(this);
  }

  comureFeature = () => {
    //define hlp varible for save data
    let finalstring = "";
    let index;
    for (index in this.state.ResultFeatures) {
      if (this.state.ResultFeatures[index] != null) {
        finalstring +=
          this.state.ResultFeatures[index].value +
          "=" +
          this.state.ResultFeatures[index].name +
          ",";
      }
    }

    //for delete last ,
    finalstring = finalstring.substring(0, finalstring.length - 1);
    return finalstring;
  };

  handleChange2 = (event, nameOfFeature, numberItem) => {
    //for get new data
    let keyOFfeature = event.target.value;

    // for delete last data in array
    this.setState({
      ResultFeatures: this.state.ResultFeatures.filter(function(
        ResultFeatures
      ) {
        return ResultFeatures.key !== numberItem;
      })
    });

    //for enter new data
    this.setState(prevState => ({
      ResultFeatures: [
        ...prevState.ResultFeatures,
        { key: numberItem, name: nameOfFeature, value: keyOFfeature }
      ]
    }));

    this.setState(prevState => ({
      ResultFeatures: [
        ...prevState.ResultFeatures.sort(
          (a, b) => parseFloat(a.key) - parseFloat(b.key)
        )
      ]
    }));
    // console.log('this.state.ResultFeatures')
    // console.log(this.state.ResultFeatures)
  };

  //handle mission all input
  handleChange(evt) {
    const fields = this.state.fields;
    const targetName = evt.target.name;
    const targetValue = evt.target.value;
    const targetValidity = evt.target.validity.valid;
    const phoneNumber = "phoneNumber";

    if (targetName === phoneNumber) {
      fields[targetName] = targetValidity ? targetValue : fields[targetName];
    } else {
      fields[targetName] = targetValue;
    }

    this.setState({
      fields
    });
  }

  render() {
    //setting for slidre
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    // go to result of payment
    if (this.state.permisionPayment) {
      return (
        <Redirect
          push
          to={{
            pathname: "/result/payment/",
            data: request
          }}
        />
      );
    }

    let ListItemfeature = props => {
      let valueAsli = props.value;

      return (
        <label className="customradio">
          <span className="radiotextsty">{valueAsli}</span>
          <input
            type="radio"
            value={valueAsli}
            checked={
              this.state.ResultFeatures[props.numberAsli] != null &&
              this.state.ResultFeatures[props.numberAsli].value === valueAsli
            }
            onChange={event =>
              this.handleChange2(event, props.namelist, props.numberAsli)
            }
          />
          <span className="checkmark" />
        </label>
      );
    };

    //NumberList of moshakhasat
    let Featurelist = props => {
      const numbers = props.numbers;

      const listItems = numbers.map((number, index) => (
        <ListItemfeature
          key={index.toString()}
          namelist={props.namelist}
          value={number}
          numberAsli={props.numberAsli}
        />
      ));
      return <div className="row">{listItems}</div>;
    };

    // list item of moshakhasat
    let ListItem = props => {
      const value = props.value;

      return (
        <div key={value.toString()}>
          <div className="col-md-12 col-sm-12 col-xs-12 form-group">
            <label className="labeltext">{value.name} :</label>
            <br />
            <div className="form-check-inline">
              <Featurelist
                key={value.toString()}
                namelist={value.name}
                numberAsli={value.key}
                numbers={value.desc.split(",")}
              />
            </div>
          </div>
        </div>
      );
    };

    //NumberList of moshakhasat
    function NumberList(props) {
      const numbers = props.numbers;

      numbers.forEach(function(file, index) {
        file.key = index;
      });
      const listItems = numbers.map((number, index) => (
        <ListItem value={number} key={index} keyitem={index} />
      ));
      return <div className="">{listItems}</div>;
    }

    // list item of Slider
    function ListItemSlider(props) {
      const value = props.value;
      return (
        <div className="sp-product-slider" key={value.toString()}>
          <img className="sp-product-slider-image" src={value} alt={"slider"} />
        </div>
      );
    }

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

    return (
      <div className="sp-container">
        <div className="navWrapper">
          <nav className="navbar navbar-dark sp-navbar">
            <a className="navbar-brand ">
              <div className="sp-shop-name">
                {SpUtils.ConvertNumberToPersianNoZero(
                  this.props.data.store.title
                )}
              </div>

              <img src={this.props.data.store.logo_file_url} alt={"logo"} />
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
          <div className="price " onClick={this.onClickOnPardakht}>
            <div>
              {this.props.data.price !== this.props.data.primary_price && (
                <span className="sp-cross">
                  {SpUtils.ConvertNumberToPersian(
                    this.props.data.primary_price
                  )}
                </span>
              )}
              <span>
                {" "}
                {SpUtils.ConvertNumberToPersian(this.props.data.price)}
              </span>{" "}
              تومان
            </div>
            <div className="sp-scroll-to-pay">پرداخت</div>
          </div>
          <div className="sp-card">
            <div className="title sp-title">
              <h3>
                {" "}
                {SpUtils.ConvertNumberToPersianNoZero(
                  this.props.data.title
                )}{" "}
              </h3>
            </div>

            <div className="sp-product-slider">
              <SliderList numbers={this.props.data.images_url} />
            </div>
          </div>

          {this.props.data.features !== 0 && (
            <div className="sp-card">
              <div className="title sp-title">
                <h3>مشخصات</h3>
              </div>
              {/*<ul className="sp-list">*/}
              {/*<form>*/}
              {/*<ul className="sp-listfeatiors">*/}

              {/*</ul>*/}
              {/*</form>*/}
              {/*</ul>*/}

              <NumberList numbers={this.props.data.features} />
              {/*<div className="row">*/}
              {/*<div className="col-md-4 col-sm-4 col-xs-12 form-group">*/}
              {/*<label className="labeltext">رنگ :</label><br />*/}
              {/*<div className="form-check-inline">*/}

              {/*<label className="customradio"><span className="radiotextsty">قرمز</span>*/}
              {/*<input type="radio" name="rang" />*/}
              {/*<span className="checkmark"></span>*/}
              {/*</label>*/}
              {/*<label className="customradio"><span className="radiotextsty">سبز</span>*/}
              {/*<input type="radio" name="rang" />*/}
              {/*<span className="checkmark"></span>*/}
              {/*</label>*/}

              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}
            </div>
          )}

          <div className="sp-ta-par">
            {/*<ul className="nav nav-tabs" id="myTab" role="tablist">*/}
            {/*<li className="nav-item">*/}
            {/*<a*/}
            {/*className={this.state.tabStyle}*/}
            {/*id="home-tab"*/}
            {/*data-toggle="tab"*/}
            {/*href="#home"*/}
            {/*role="tab"*/}
            {/*onClick={event => {*/}
            {/*event.preventDefault();*/}
            {/*this.setState({*/}
            {/*tab: true,*/}
            {/*tabStyle: "nav-link active",*/}
            {/*tabStyle1: "nav-link"*/}
            {/*});*/}
            {/*}}*/}
            {/*aria-controls="home"*/}
            {/*aria-selected="true"*/}
            {/*>*/}
            {/*<i className="material-icons">description</i>*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*<a*/}
            {/*className={this.state.tabStyle1}*/}
            {/*id="profile-tab"*/}
            {/*data-toggle="tab"*/}
            {/*href="#profile"*/}
            {/*role="tab"*/}
            {/*aria-controls="profile"*/}
            {/*aria-selected="false"*/}
            {/*onClick={event => {*/}
            {/*event.preventDefault();*/}
            {/*this.setState({*/}
            {/*tab: false,*/}
            {/*tabStyle: "nav-link ",*/}
            {/*tabStyle1: "nav-link active"*/}
            {/*});*/}
            {/*}}*/}
            {/*>*/}
            {/*<i className="material-icons">chat_bubble_outline</i>*/}
            {/*</a>*/}
            {/*</li>*/}
            {/*</ul>*/}

            <div className="tab-content" id="myTabContent">
              {this.state.tab ? (
                <div id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="sp-form">
                    <div className="form-group float-label-control ">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        {/*{SpUtils.ConvertNumberToPersianNoZero(*/}
                        {/*this.props.data.desc*/}
                        {/*)}*/}

                        <div
                          dangerouslySetInnerHTML={{
                            __html: SpUtils.ConvertNumberToPersianNoZero(
                              this.props.data.desc
                            )
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="col-lg-12">
                    <form className="sp-form">
                      <div className="form-group float-label-control ">
                        <textarea
                          name="comment"
                          onChange={this.handleChange}
                          value={SpUtils.ConvertNumberToPersianNoZero(
                            this.state.fields["comment"]
                          )}
                          type="text"
                          className="form-control "
                          placeholder="نظر خود را ارسال کنید "
                        />
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-success sp-btn"
                      onClick={this.onClickSendComment}
                    >
                      ارسال نظر
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sp-card">
            <div className="title sp-title">
              <h3>اطلاعات فردی </h3>
            </div>

            <form className="sp-form">
              <div className="form-group float-label-control ">
                <input
                  name="nameAndLastname"
                  type="email"
                  className={this.state.error["alertNameAndLastname"]}
                  placeholder="نام و نام خانوادگی"
                  value={SpUtils.ConvertNumberToPersianNoZero(
                    this.state.fields["nameAndLastname"]
                  )}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group float-label-control  ">
                <input
                  type="tel"
                  pattern="[0-9,۱,۲,۳,۴,۵,۶,۷,۸,۹,۰]*"
                  name="phoneNumber"
                  maxLength={11}
                  className={this.state.error["alertPhoneNumber"]}
                  placeholder="شماره همراه"
                  value={SpUtils.ConvertNumberToPersianNoZero(
                    this.state.fields["phoneNumber"]
                  )}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group float-label-control ">
                <input
                  name="email"
                  type="email"
                  className="form-control ltrEmail"
                  placeholder={"(".concat("ایمیل (اختیاری")}
                  value={SpUtils.ConvertNumberToPersianNoZero(
                    this.state.fields["email"]
                  )}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group float-label-control ">
                <textarea
                  name="address"
                  type="email"
                  className={this.state.error["alertAddress"]}
                  placeholder="آدرس"
                  value={SpUtils.ConvertNumberToPersianNoZero(
                    this.state.fields["address"]
                  )}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error["alert"] !== "" && (
                <span className="sp-form-alert">
                  {this.state.error["alert"]}
                </span>
              )}
            </form>

            <button
              type="button"
              className="btn sp-btn"
              onClick={this.handleOnPaynent}
            >
              انتقال به درگاه پرداخت
            </button>

            <div>
              <div className="MessageContainer">
                <div
                  style={{ float: "left", clear: "both" }}
                  ref={el => {
                    this.messagesEnd = el;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleOnPaynent = () => {
    if (
      this.state.fields["nameAndLastname"] == null ||
      this.state.fields["nameAndLastname"].length < 1
    ) {
      let error = this.state.error;
      error["alertNameAndLastname"] = danger;
      error["alertPhoneNumber"] = nornal;
      error["alertEmail"] = nornal;
      error["alertAddress"] = nornal;
      error["alert"] = " لطفا نام و نام خانوادگی خود را وارد کنید.";
      this.setState({ error });

      return null;
    }

    if (
      this.state.fields["phoneNumber"] == null ||
      this.state.fields["phoneNumber"].length < 11 ||
      !this.state.fields["phoneNumber"].startsWith("۰۹")
    ) {
      let error = this.state.error;
      error["alertNameAndLastname"] = nornal;
      error["alertPhoneNumber"] = danger;
      error["alertEmail"] = nornal;
      error["alertAddress"] = nornal;
      error["alert"] = " لطفا شماره تلفن همراه خود را وارد کنید.";
      this.setState({ error });

      return null;
    }

    if (this.validateEmail(this.state.fields["email"])) {
      let error = this.state.error;
      error["alertNameAndLastname"] = nornal;
      error["alertPhoneNumber"] = nornal;
      error["alertEmail"] = danger;
      error["alertAddress"] = nornal;
      error["alert"] = " لطفا ایمیل خود را صحیح وارد کنید";
      this.setState({ error });

      return null;
    }

    if (
      this.state.fields["address"] == null ||
      this.state.fields["address"].length < 1
    ) {
      let error = this.state.error;
      error["alertNameAndLastname"] = nornal;
      error["alertPhoneNumber"] = nornal;
      error["alertEmail"] = nornal;
      error["alertAddress"] = danger;
      error["alert"] = " لطفا آدرس خود را وارد کنید.";
      this.setState({ error });
      return null;
    }

    const fields = this.state.fields;

    if (fields["nameAndLastname"] != null) {
      localStorage.setItem("nameAndLastname", fields["nameAndLastname"]);
    }

    if (fields["phoneNumber"] != null) {
      localStorage.setItem("phoneNumber", fields["phoneNumber"]);
    }

    if (fields["email"] != null) {
      localStorage.setItem("email", fields["email"]);
    }

    if (fields["address"] != null) {
      localStorage.setItem("address", fields["address"]);
    }

    request = {
      product_id: this.props.data.id,
      full_name: this.state.fields["nameAndLastname"],
      mobile: this.state.fields["phoneNumber"],
      email: this.state.fields["email"],
      description: "توضیحات تستی",
      address: this.state.fields["address"],
      product_specs: this.comureFeature()
    };
    // console.log("request");
    // console.log(request);
    this.setState({ permisionPayment: true });
  };

  //
  // payment = () => {
  //   let request = {
  //     product_id: this.props.data.id,
  //     full_name: this.state.fields["nameAndLastname"],
  //     mobile: this.state.fields["phoneNumber"],
  //     email: this.state.fields["email"],
  //     description: "توضیحات تستی",
  //     address: this.state.fields["address"]
  //   };
  //   this.setState({ permisionPayment: true });
  //   // API.Post(
  //   //   `AdminChannel/purchase/buy_product`,
  //   //   request,
  //   //   this.callBackServies
  //   // );
  // };
  //
  // callBackServies(result) {
  //   if (result.status === 200) {
  //     this.setState({ permisionPayment: true });
  //   } else {
  //   }
  // }
  validateEmail = email => {
    // console.log("this.state.fields")
    // console.log(this.state.fields["email"])
    if (
      this.state.fields["email"] !== "" &&
      this.state.fields["email"] != null
    ) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(String(email).toLowerCase());
    } else {
      return false;
    }
  };
  // for scroll to butten in page
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // for scroll to butten in page
  onClickOnPardakht = () => {
    this.scrollToBottom();
  };

  // for sent comment
  onClickSendComment = () => {
    console.log("sent comment");
  };
}

export default Product;
