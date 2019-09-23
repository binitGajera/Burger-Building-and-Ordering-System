import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>It better be good for you!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCancel} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinue} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
