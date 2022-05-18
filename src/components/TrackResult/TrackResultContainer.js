import React, { Component } from "react";
import Loading from "../global/Loading";
import TrackResult from "./TrackResult";
import API from "../global/api";
import NotFound from "../NotFound/NotFound";
import { TRACT_ORDER } from "../global/ConstApi";

class TrackResultContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPursuit: null,
      loading: true
    };
    this.callBackServies = this.callBackServies.bind(this);
  }

  componentDidMount() {
    API.Get(
      TRACT_ORDER + this.props.match.params.idPursuit,
      "",
      this.callBackServies
    );
  }

  callBackServies(result) {
    if (result.status === 200) {
      this.setState({
        dataPursuit: result.data,
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
    } else if (this.state.dataPursuit != null) {
      return (
        <div>
          <TrackResult dataPursuit={this.state.dataPursuit} />
        </div>
      );
    } else {
      return <NotFound from={"pursuit"} />;
    }
  }
}

export default TrackResultContainer;
