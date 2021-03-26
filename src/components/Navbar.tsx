import React from "react";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

function Navbar(props: any) {
  return (
      <AppBar>
        <Toolbar>
          <MenuItem
            onClick={() => {
              props.history.push("/Account");
            }}
          >
            Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.history.push("/mintSwags");
            }}
          >
            Mint
          </MenuItem>
          <MenuItem
            onClick={() => {
              props.history.push("/mySwags");
            }}
          >
            My Swags
          </MenuItem>
        </Toolbar>
      </AppBar>
  );
}

export default withRouter(Navbar);
