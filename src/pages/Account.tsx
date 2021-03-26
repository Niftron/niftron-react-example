import { NIFTRON, NiftronAssetResponse } from "niftron-sdk";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
});

const Account = () => {
  const classes = useStyles();

  const [issuer, setIssuer] = useState<string>("");
  const [assetCode, setAssetCode] = useState<string>("");
  const [niftrons, setNiftrons] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const testSDK = async () => {
    try {
      const res: any = await NIFTRON.user.testTransfer();
      console.log(res);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getBalance = async () => {
    try {
      setLoading(true);
      const res: NiftronAssetResponse | null = await NIFTRON.user.getNiftronCreditBalance();
      if (res) {
        setIssuer(res.issuer);
        setAssetCode(res.assetCode);
        setNiftrons(res.balance);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("error", e);
    }
  };

  React.useEffect(() => {
    getBalance();
  }, []);
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Button disabled={loading} onClick={getBalance}>
          Update Credits
        </Button>

        {loading && (
          <Card className={classes.root} >
            <CardContent style={{filter: "blur(4px)"}}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Issuer: {issuer}
              </Typography>
              <Typography variant="h5" component="h2">
              {assetCode}: {niftrons}
              </Typography>
              {/* <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
            </CardContent>
            {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
          </Card>
        )}
        {!loading && assetCode && niftrons && (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Issuer: {issuer}
              </Typography>
              <Typography variant="h5" component="h2">
                {assetCode}: {niftrons}
              </Typography>
              {/* <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography> */}
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default Account;
