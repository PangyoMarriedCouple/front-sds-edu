import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [nicknameError, setNicknameError] = React.useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
  const [sexError, setSexError] = React.useState(false);
  const [SexErrorMessage, setSexErrorMessage] = React.useState('');
  const [serverError, setServerError] = React.useState("");
  const navigate = useNavigate();


  const validateInputs = () => {
    const nickname = document.getElementById('nickname') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;
    const sex = document.getElementById('sex') as HTMLInputElement;
    

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!phoneNumber.value || phoneNumber.value.length != 11) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage('Phone number must be 11 digits.');
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage('');
    }

    if (!nickname.value || nickname.value.length < 1) {
      setNicknameError(true);
      setNicknameErrorMessage('Nickname is required.');
      isValid = false;
    } else {
      setNicknameError(false);
      setNicknameErrorMessage('');
    }

    // if (!sex.value) {
    //   setSexError(true);
    //   setSexErrorMessage('Check your sex');
    //   isValid = false;
    // } else {
    //   setSexError(false);
    //   setSexErrorMessage('');
    // }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // if (nicknameError || passwordError || phoneNumberError || sexError) {
    event.preventDefault();
    if (!validateInputs()) {
      //event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      nickname: data.get('nickname'),
      password: data.get('password'),
      phoneNumber: data.get('phoneNumber'),
      sex: data.get('sex'),
    });
    //FormData -> DTO에 맞게 변환
    const userData = {
      name: data.get('nickname'),         // nickname -> name
      phoneNum: data.get('phoneNumber'),  // phoneNumber -> phoneNum
      sex: data.get('sex'),
      passWord: data.get('password'),     // password -> passWord
    };

    //회원가입 수행

    try {
      const response = await axios.post('http://localhost:8080/users', userData, {
        headers: {
          'Content-Type': 'application/json', // JSON 형식으로 보낸다고 명시
        },
      });
      
      // 요청 성공 시
      console.log(response.data);  // 서버에서 보낸 응답 확인
      alert('회원가입에 성공하였습니다. 로그인을 진행해주세요.');
      navigate('/');
    } catch (error) {
      // 요청 실패 시
      if(error.response){
        console.error('Sign Up failed:', error.response.data);
        setServerError(error.response.data);
        alert('이미 존재하는 아이디입니다. 다시 시도해주세요.');
      }else{
        console.error("회원가입 실패: ", error.message);
        setServerError("서버 연결에 실패했습니다.");
      }
      
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="nickname">Nickname</FormLabel>
              <TextField
                autoComplete="nickname"
                name="nickname"
                required
                fullWidth
                id="nickname"
                placeholder="nickname"
                error={nicknameError}
                helperText={nicknameErrorMessage}
                color={nicknameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <TextField
                autoComplete="phoneNumber"
                name="phoneNumber"
                required
                fullWidth
                id="phoneNumber"
                placeholder="01012345678"
                error={phoneNumberError}
                helperText={phoneNumberErrorMessage}
                color={phoneNumberError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="sex">Sex</FormLabel>
              <RadioGroup
                id = "sex"
                aria-labelledby="sex"
                defaultValue="male"
                name="sex"
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>
            
            {/* <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          {/* <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider> */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button> */}
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
