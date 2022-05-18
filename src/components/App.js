import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeContainer from "./Home/HomeContainer";
import ProductContainer from "./Products/ProductContainer";
import NotFound from "./NotFound/NotFound";
import PurchaseResultContainer from "./PurchaseResult/PurchaseResultContainer";
import TrackOrderContainer from "./TrackOrder/TrackOrderContainer";
import TrackResultContainer from "./TrackResult/TrackResultContainer";
import PaymentContainer from "./PurchaseResult/ContainerForPayment";
// {/*define routes app*/}
const App = props => (
  <div>
    <Switch>
      <Route path="/result/payment/" component={PaymentContainer} />
      <Route path="/track/:idPursuit" component={TrackResultContainer} />
      <Route path="/track" component={TrackOrderContainer} />
      <Route path="/result/:invoice_id" component={PurchaseResultContainer} />
      <Route exact path="/:idStore" component={HomeContainer} />
      <Route path="/:idStore/:idProduct" component={ProductContainer} />

      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default App;
