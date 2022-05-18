import Loading from "../global/Loading";
import React, { Component } from "react";
import TrackOrder from "./TrackOrder";

class TrackOrderContainer extends Component {
  render() {
    if (true) {
      return <TrackOrder />;
    } else {
      return (
        <div>
          <Loading />
        </div>
      );
    }
  }
}

export default TrackOrderContainer;
