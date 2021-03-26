import React from "react";
import { Box, TextField, Button, Container, Divider } from "@material-ui/core";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  CreateBadgeModel,
  NIFTRON,
  NiftronKeypair,
  Token,
  TokenType,
} from "niftron-sdk";
import { PlayArrowSharp } from "@material-ui/icons";
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       // width: 300,
//       // display: "flex",
//     },
//     details: {
//       // display: "flex",
//       flexDirection: "column",
//     },
//     content: {
//       flex: "1 0 auto",
//     },
//     cover: {
//       width: 500,
//     },
//   })
// );

const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 300,
  },
});

export default function MediaControlCard(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  const transferBadge = async (values: any) => {
    try {
      const devSecret: any = process.env.REACT_APP_DEV_SECRET_KEY;
      const keypair: NiftronKeypair = NiftronKeypair.fromSecret(devSecret);
      const res = await NIFTRON.tokenBuilder.transferToken(
        values.receiver, // receiverPk
        props.item.assetCode,
        props.item.assetIssuer,
        values.count, // amount
        keypair.publicKey(), // senderPk
        undefined // SenderKeypair
      );
      console.log(res);
      props.getTokens();
    } catch (e) {
      console.log(e);
    }
  };
  const patternPK = /^[G,g][a-zA-Z0-9]{55}$/;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.item.previewUrl}
          title={props.item.tokenName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item.tokenName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.item.assetCode}{" "}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Count: {props.item.assetCount}
          </Typography>{" "}
          <Typography variant="subtitle1" color="textSecondary">
            Type: {props.item.tokenType}
          </Typography>{" "}
          <Typography variant="subtitle1" color="textSecondary">
            Category: {props.item.category}
          </Typography>{" "}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Formik
          initialValues={{
            receiver: "",
            count: 1,
          }}
          validationSchema={Yup.object().shape({
            receiver: Yup.string()
              .matches(patternPK)
              .required("Receiver PublicKey is required"),
            count: Yup.number()
              .max(props.item.assetCount)
              .min(1)
              .required("Count is required"),
          })}
          onSubmit={async (values) => {
            try {
              await transferBadge(values);
            } catch (e) {
              console.log(e.message);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={1}>
                <TextField
                  error={Boolean(touched.receiver && errors.receiver)}
                  fullWidth
                  helperText={touched.receiver && errors.receiver}
                  label="Receiver PK"
                  margin="normal"
                  name="receiver"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // type="text"
                  value={values.receiver}
                  variant="outlined"
                />
              </Box>
              <Box mb={1}>
                <TextField
                  error={Boolean(touched.count && errors.count)}
                  fullWidth
                  helperText={touched.count && errors.count}
                  label="Token Count"
                  margin="normal"
                  name="count"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // type="text"
                  value={values.count}
                  variant="outlined"
                />
              </Box>
              <Box my={2}>
                <Container maxWidth="sm">
                  {" "}
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Transfer
                  </Button>{" "}
                </Container>
              </Box>
            </form>
          )}
        </Formik>
      </CardActions>
    </Card>
    // <Card className={classes.root}>
    //   <div className={classes.details}>
    //     <CardContent className={classes.content}>

    //       <img src={props.item.previewUrl} height="50" style={{overflow:""}}/>
    //       <Typography component="h5" variant="h5">
    //         {props.item.tokenName}{" "}
    //       </Typography>
    //       <Typography variant="subtitle1" color="textSecondary">
    //         {props.item.assetCode}{" "}
    //       </Typography>
    //       <Typography variant="subtitle1" color="textSecondary">
    //         Count: {props.item.assetCount}
    //       </Typography>{" "}
    //       <Typography variant="subtitle1" color="textSecondary">
    //         Type: {props.item.tokenType}
    //       </Typography>{" "}
    //       <Typography variant="subtitle1" color="textSecondary">
    //         Category: {props.item.category}
    //       </Typography>{" "}
    //     </CardContent>
    //     <Formik
    //       initialValues={{
    //         receiver: "",
    //         count: 1,
    //       }}
    //       validationSchema={Yup.object().shape({
    //         receiver: Yup.string().matches(patternPK)
    //           .required("Receiver PublicKey is required"),
    //         count: Yup.number()
    //           .max(props.item.assetCount)
    //           .min(1)
    //           .required("Count is required"),
    //       })}
    //       onSubmit={async (values) => {
    //         try {
    //           await transferBadge(values);
    //         } catch (e) {
    //           console.log(e.message);
    //         }
    //       }}
    //     >
    //       {({
    //         errors,
    //         handleBlur,
    //         handleChange,
    //         handleSubmit,
    //         setFieldValue,
    //         isSubmitting,
    //         touched,
    //         values,
    //       }) => (
    //         <form onSubmit={handleSubmit}>
    //           <Box mb={1}>
    //             <TextField
    //               error={Boolean(touched.receiver && errors.receiver)}
    //               fullWidth
    //               helperText={touched.receiver && errors.receiver}
    //               label="Receiver PK"
    //               margin="normal"
    //               name="receiver"
    //               onBlur={handleBlur}
    //               onChange={handleChange}
    //               // type="text"
    //               value={values.receiver}
    //               variant="outlined"
    //             />
    //           </Box>
    //           <Box mb={1}>
    //             <TextField
    //               error={Boolean(touched.count && errors.count)}
    //               fullWidth
    //               helperText={touched.count && errors.count}
    //               label="Token Count"
    //               margin="normal"
    //               name="count"
    //               onBlur={handleBlur}
    //               onChange={handleChange}
    //               // type="text"
    //               value={values.count}
    //               variant="outlined"
    //             />
    //           </Box>
    //           <Box my={2}>
    //             <Container maxWidth="sm">
    //               {" "}
    //               <Button
    //                 color="primary"
    //                 disabled={isSubmitting}
    //                 fullWidth
    //                 size="large"
    //                 type="submit"
    //                 variant="contained"
    //               >
    //                 Transfer
    //               </Button>{" "}
    //             </Container>
    //           </Box>
    //         </form>
    //       )}
    //     </Formik>
    //   </div>
    //   <CardMedia
    //     className={classes.cover}
    //     image={props.item.previewUrl}
    //     title={props.item.tokenName}
    //   />
    // </Card>
  );
}
