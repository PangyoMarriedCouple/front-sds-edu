import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import verLogo from '../assets/verLogo.png';

// const navigate = useNavigate();

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [nicknameError, setNicknameError] = React.useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [serverError, setServerError] = React.useState("");//안되면 밖으로 빼보기
 const navigate = useNavigate();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nicknameError || passwordError) {
     // event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    const loginData = {
      name: data.get("nickname"),
      passWord: data.get("password") ?? "",
    };
    // console.log({
    //   nickname: data.get("nickname"),
    //   password: data.get("password"),
    // });
   // navigate('/flipcardpage');
   try {
    const response = await axios.post("http://localhost:8080/users/login", loginData);
    console.log("로그인 성공:", response.data);

    // 유저 정보를 로컬스토리지에 전역적으로 저장!
    localStorage.setItem("userId", response.data.id );
    localStorage.setItem("userName", response.data.name );

    navigate("/gamestart");
  } catch (error) {
    if(error.response){
      console.error("로그인 실패: ", error.response.data);
      setServerError(error.response.data);
    }else{
      console.error("로그인 실패: ", error.message);
      setServerError("서버 연결에 실패했습니다.");
    }
   // console.error("로그인 실패:", error.response ? error.response.data : error.message);
  }
  };

  const validateInputs = () => {
    const nickname = document.getElementById('nickname') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!nickname.value) {
      setNicknameError(true);
      setNicknameErrorMessage('Please enter a valid Nickname.');
      isValid = false;
    } else {
      setNicknameError(false);
      setNicknameErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>

      {/* 🔹 백엔드에서 받은 오류 메시지를 화면에 표시 */}
      {serverError && (
        <Typography color="error" sx={{ textAlign: "center", marginBottom: "10px" }}>
          {serverError}
        </Typography>
      )}
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="nickname">Nickname</FormLabel>
          <TextField
            error={nicknameError}
            helperText={nicknameErrorMessage}
            id="nickname"
            type="nickname"
            name="nickname"
            placeholder="Nickname"
            autoComplete="nickname"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={nicknameError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            {/* <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link> */}
            <Link
              onClick={() => navigate('/signup')}
              variant="body2"
              sx={{ alignSelf: 'center', cursor: 'pointer' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      <Box>
        <div style={{textAlign:'center'}}>
          <img src={verLogo} alt="vertical logo" style={{ width: '280px', height: '150px', objectFit: 'contain' }}/>
        </div>
      </Box>
      {/* <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Facebook')}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box> */}
    </Card>
  );
}
