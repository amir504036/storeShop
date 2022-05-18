import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpUtils from "../../tools/SpUtils";
import moment from "moment-jalaali";

class PurchaseResult extends Component {
  componentDidMount() {
    document.title = "نتیجه خرید";
  }

  constructor(preps) {
    super(preps);

    this.onClickk = this.onClickk.bind(this);
    this.state = {
      visibilyBuyButten: false
    };
  }

  render() {
    // use moment for conver unix time
    let TimeNow = moment
      .unix(this.props.dataPayment.data.create_date_unix_time)
      .format("jYYYY/jM/jD");
    return (
      <div className="sp-container">
        <div className="sp-main">
          <div id="wrapper">
            <div className="MasterLogin1" id="resevation_histories">
              <div className="Reportservice0">
                <div className="Reportservice1">
                  <div className="Reportservice2">
                    <span className="Reportservice3">پیگیری خرید</span>
                    <span className="Reportservice4 rh_invoice_id" />
                  </div>
                  <div className="Reportservice5">
                    <table
                      className="table table-condensed table-hover"
                      dir="rtl"
                    >
                      <tbody>
                        <tr>
                          <td>شماره پیگیری</td>
                          <td className="rh_bs_title">
                            {SpUtils.ConvertNumberToPersian(
                              this.props.dataPayment.data.order_tracking_code
                            )}
                          </td>
                        </tr>
                        {this.props.dataPayment.data.done ? (
                          <tr>
                            <td>وضعیت خرید</td>
                            <td className="rh_bs_subtitle">موفقیت آمیز</td>
                          </tr>
                        ) : (
                          <tr>
                            <td>وضعیت خرید</td>
                            <td className="rh_bs_subtitle">ناموفق</td>
                          </tr>
                        )}

                        <tr>
                          <td>شماره تراکنش</td>
                          <td>
                            <span className="rh_date">
                              {SpUtils.ConvertNumberToPersian(
                                this.props.dataPayment.data.invoice_id
                              )}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>تاریخ تراکنش</td>
                          <td className="Reportservice22 ">
                            <span className="rh_primary_price">
                              {SpUtils.ConvertNumberToPersian(TimeNow)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>مبلغ خرید</td>
                          <td className="Reportservice22">
                            <span className="rh_currency">
                              {SpUtils.ConvertNumberToPersian(
                                this.props.dataPayment.data.amount
                              )}
                            </span>
                            {this.props.dataPayment.data && null}
                            <span className="rh_currency"> ریال</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="ReserveAgain" />
                  </div>

                  <div className="Reportservice24 sp-btn1 row">
                    <div className="sp-half">
                      <Link to={"/track/"}>
                        <button type="button" className="btn  sp-btn ">
                          پیگیری خرید
                        </button>
                      </Link>
                    </div>

                    <div className="sp-half">
                      <Link to={"/" + this.props.dataPayment.data.store_code}>
                        <button type="button" className="btn  sp-btn-defu ">
                          فروشگاه
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="Reportservice12 rh_reserve_id" id="">
                    <div className="Reportservice15 col-xs-12 resevation_service_items" />
                  </div>
                </div>
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

export default PurchaseResult;
