import React, { useState } from "react";
import { CreateBadgeModel, NIFTRON, Token, TokenType } from "niftron-sdk";

import { Formik } from "formik";

import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import * as Yup from "yup";
import MediaControlCard from "../components/Token";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
}));
const MintSwags = () => {
  const classes = useStyles();

  const [name, setName] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [tokenType, setTokenType] = useState<TokenType>(TokenType.NFT);
  const [data, setData] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createBadge = async (values:any) => {
    try {
      setLoading(true);

      const createBadgeModel: CreateBadgeModel = {
        tokenName: values.name,
        tokenType: values.count > 1 ? TokenType.SFT : tokenType,
        tokenData: JSON.stringify(values.data),
        tokenCount: values.count,
        previewImageUrl: values.imageUrl,
      };
      const res = await NIFTRON.tokenBuilder.createBadge(createBadgeModel);
      console.log(res);
      await getTokens()
      setLoading(false);

    } catch (e) {
      setLoading(false);

      console.log(e);
    }
  };
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


  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Formik
          initialValues={{
            name: name,
            count: count,
            data: data,
            imageUrl: imageUrl,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("Token Name is required"),
            count: Yup.number().max(255).optional(),
            data: Yup.string().max(255).required("Data is required"),
            imageUrl: Yup.string().max(255).required("Image Url is required"),
          })}
          onSubmit={async (values) => {
            try {
              await createBadge(values);
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
              <Box mb={5}>
                <Typography color="textPrimary" variant="h3">
                  Mint Swag
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Add your swag meta data here.
                </Typography>
                <Divider />
              </Box>
              <Box mb={3}>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Token Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // type="text"
                  value={values.name}
                  variant="outlined"
                />
              </Box>
              <Box mb={3}>
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
              <Box mb={3}>
                <TextField
                  error={Boolean(touched.data && errors.data)}
                  fullWidth
                  helperText={touched.data && errors.data}
                  label="Token Data"
                  margin="normal"
                  name="data"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // type="text"
                  value={values.data}
                  variant="outlined"
                />
              </Box>
              <Box mb={3}>
                <TextField
                  error={Boolean(touched.imageUrl && errors.imageUrl)}
                  fullWidth
                  helperText={touched.imageUrl && errors.imageUrl}
                  label="Image URL"
                  margin="normal"
                  name="imageUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  // type="text"
                  value={values.imageUrl}
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
                    Mint
                  </Button>{" "}
                </Container>
              </Box>
            </form>
          )}
        </Formik>
        <Grid container className={classes.root} spacing={3}>
          {tokens.map((item: any, index: any) => (
            <Grid container item lg={3} md={6} sm={6} spacing={0} key={`token-${index}`}>
              <MediaControlCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MintSwags;
