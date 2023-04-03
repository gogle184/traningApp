import React , { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import {Typography}  from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { AuthContext } from "../../App";
import AlertMessage from "../utils/AlertMessage"
import { signIn } from "../../lib/api/auth";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  box: {
    paddingTop: "2rem",
  },
  link: {
    textDecoration: "none",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  
  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = generateParams();
      const res = await signIn(params);
      console.log(res);

      if (res.status ===200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/")

        console.log("サインインに成功したよ");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  }

  return (
    <>
      <form noValidate autoComplete = "off">
        <Card className={classes.card}>
          <CardHeader className={classes.header}  title="サインイン"/>
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              placeholder="６文字以上"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Box className={classes.submitBtn} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!email || !password ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
            </Box>
            <Box
              textAlign="center"
              className={classes.box}>
                <Typography variant="body2">
                  まだアカウントをお持ちでない方は
                  <Link to="/signup" className={classes.link}>
                    こちら
                  </Link>
                  から作成してください
                </Typography>
              </Box>
          </CardContent>
        </Card>
      </form>
      < AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールかアドレスが違うよ"
      />
    </>
  )
}

export default SignIn;
