import React, { useState } from "react";
import {
  CreateBadgeModel,
  NIFTRON,
  NiftronKeypair,
  Token,
  TokenType,
} from "niftron-sdk";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import MediaControlCard from "../components/Token";
const useStyles = makeStyles((theme) => ({
  // root: {
  //   minWidth: 275,
  // },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  // gridList: {
  //   width: 500,
  //   height: 450,
  // },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  media: {
    height: 140,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
const MySawgs = () => {
  const classes = useStyles();

  const [tokens, setTokens] = useState<Token[]>([]);

  const getTokens = async () => {
    try {
      const res: Token[] | null = await NIFTRON.user.getTokensByPublicKey();
      if (res) {
        console.log(res);
        setTokens(res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getTokens();
  }, []);
 

  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Button onClick={getTokens}>Reload Swags</Button>
        <Grid container className={classes.root} spacing={2}>
          {tokens.map((item: any, index: any) => (
            <Grid
              container
              item
              lg={4}
              md={6}
              sm={6}
              spacing={0}
              key={`token-${index}`}
            >
              <MediaControlCard item={item} getTokens={getTokens}/>
            </Grid>
          ))}

          {/* <GridList cellHeight={300} className={classes.gridList}>
            {tokens.map((item: any, index: any) => (

              <GridListTile key={`token-${index}`}>
                <img src={item.previewUrl} alt={item.tokenName} />
                <GridListTileBar
                  title={item.tokenName + " (" + item.assetCode + ")"}
                  subtitle={
                    <span>
                      <Typography variant="body2" component="p">
                        Type: {item.tokenType}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Count: {item.assetCount}
                      </Typography>
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      aria-label={`info about ${item.tokenName}`}
                      className={classes.icon}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
                <Typography variant="body2" component="p">
                  {item.assetCount}
                </Typography>
              </GridListTile>
            ))}
          </GridList>{" "} */}
        </Grid>
      </Box>{" "}
    </Container>
  );
};

export default MySawgs;
