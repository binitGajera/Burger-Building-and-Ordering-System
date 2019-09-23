import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggle = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render = () => {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggle}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          closed={this.sideDrawerClosed}
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuth}
        />
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  };
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
