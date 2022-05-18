import React from "react";
import { css } from "@emotion/core";
import { PulseLoader } from "react-spinners";
import "../../assets/style/style404.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

//loadin beetwin page
document.title = "در حال بارگزاری";
const Loading = () => (
  /*eslint null:0*/
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <PulseLoader
          css={override}
          sizeUnit={"px"}
          size={21}
          color={"#123abc"}
        />
        <h2>در حال بارگزاری</h2>
      </div>
    </div>
  </div>
);

export default Loading;
