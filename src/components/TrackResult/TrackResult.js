import React, { Component } from "react";
import SpUtils from "../../tools/SpUtils";
import moment from "moment-jalaali";
import { Link } from "react-router-dom";

class TrackResult extends Component {
  componentDidMount() {
    document.title = "گزارش سفارش";
  }

  constructor(preps) {
    super(preps);

    this.onClickk = this.onClickk.bind(this);
    this.state = {
      visibilyBuyButten: false
    };
  }

  render() {
    let TimeNow = moment
      .unix(this.props.dataPursuit.record_date_unix_time)
      .format("jYYYY/jM/jD");

    return (
      <div className="sp-container">
        <div className="sp-main">
          <div id="wrapper">
            <div className="MasterLogin1" id="resevation_histories">
              <div className="Reportservice0">
                <div className="Reportservice1">
                  <div className="Reportservice2">
                    <span className="Reportservice3 ">پیگیری خرید</span>
                  </div>
                  <div className="Reportservice5">
                    <table
                      className="table table-condensed table-hover"
                      dir="rtl"
                    >
                      <tbody>
                        <tr>
                          <td className="td-field">تاریخ خرید</td>
                          <td className="rh_bs_title">
                            {SpUtils.ConvertNumberToPersian(TimeNow)}
                          </td>
                        </tr>
                        <tr>
                          <td>وضعیت خرید</td>
                          <td className="rh_bs_subtitle">
                            {this.props.dataPursuit.status_desc}
                          </td>
                        </tr>
                        <tr>
                          <td>نام فروشگاه</td>
                          <td className="Reportservice22 ">
                            <span className="rh_currency">
                              {SpUtils.ConvertNumberToPersian(
                                this.props.dataPursuit.store_title
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>مبلغ پرداخت شده توسط شما</td>
                          <td className="Reportservice22">
                            <span className="rh_paid_price">
                              {SpUtils.ConvertNumberToPersian(
                                this.props.dataPursuit.price
                              )}{" "}
                              تومان{" "}
                            </span>
                          </td>
                        </tr>
                        <tr className="td-style">
                          {/*<Link to={"/track/"} className="td-style">*/}
                          {/*<button*/}
                          {/*type="button"*/}
                          {/*className="btn btn-success sp-btn td-style"*/}
                          {/*>*/}
                          {/*بازگشت به صفحه پیگیری*/}
                          {/*</button>*/}
                          {/*</Link>*/}
                        </tr>
                      </tbody>
                    </table>

                    <div className="ReserveAgain" />
                  </div>

                  <div className="Reportservice12 rh_reserve_id" id="">
                    <div className="Reportservice15 col-xs-12 resevation_service_items" />
                  </div>
                </div>
                <Link to={"/track/"}>
                  <button type="button" className="btn sp-btn-Product">
                    بازگشت به صفحه پیگیری
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClickk = () => {
    this.setState(prevState => ({
      visibilyBuyButten: !prevState.visibilyBuyButten
    }));
  };
}

export default TrackResult;
