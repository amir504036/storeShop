import React, { Component } from "react";
import "../../assets/style/style404.css";
import SpUtils from "../../tools/SpUtils";
import { Link } from "react-router-dom";

//defibe page 404
let link = "";
class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleButten: false,
      titleButten: "",
      titlePage: ""
    };
  }

  componentDidMount() {
    document.title = "404";

    switch (this.props.from) {
      case undefined:
        this.setState({
          visibleButten: false,
          titleButten: "",
          titlePage: ".فروشگاه مورد نظر شما پیدا نشد"
        });
        break;

      case "PurchaseResult":
        this.setState({
          visibleButten: false,
          titleButten: "",
          titlePage: "در حال حاضر فروشگاه مورد نظر در دسترس نمی باشد."
        });
        break;

      case "store":
        this.setState({
          visibleButten: true,
          titleButten: "بازگشت به صفحه اصلی",
          titlePage: ".محصول مورد نظر شما پیدا نشد"
        });
        link = this.props.page;
        break;

      case "Product":
        this.setState({
          visibleButten: true,
          titleButten: "بازگشت به صفحه محصول",
          titlePage: ".صفحه مورد نظر شما پیدا نشد"
        });
        link = this.props.page;
        break;

      case "pursuit":
        this.setState({
          visibleButten: true,
          titleButten: "بازگشت به صفحه پیگیری محصول",
          titlePage: ".محصول مورد نظر شما پیدا نشد"
        });
        link = "/track/";
        break;
      default:
        this.setState({
          titlePage: ".صفحه مورد نظر شما پیدا نشد"
        });
        break;
    }
  }
  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>{SpUtils.ConvertNumberToPersian(404)}</h1>
          </div>
          <h2 className="sp-btn404">{this.state.titlePage}</h2>

          {this.state.visibleButten && (
            <Link to={link}>
              <button className="btn btn-lg btn-success sp-btn" type="submit">
                {this.state.titleButten}
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default NotFound;
