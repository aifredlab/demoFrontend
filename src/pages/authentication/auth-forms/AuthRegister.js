import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = (param) => {
  const [level, setLevel] = useState(); //암호레벨
  const [showPassword, setShowPassword] = useState(false); //암호보여주기여부
  const auth = useSelector((state) => state.auth);

  /**
   * 암호보여주기 클릭이벤트 핸들러
   */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //마우스 //TODO: 용도를 모르겠따.
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  /**
   *  암호 변경시 암호 level 설정
   * @param {*} value
   */
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };


  //초기화
  useEffect(() => {
    changePassword('');
    console.log('isRegister=' + param.isRegister);
    console.log(JSON.stringify(auth));
  }, [auth, param.isRegister]);

  return (
    <>
      <Formik
        initialValues={
          {
            name: '',
            email: '',
            company: '',
            password: '',
            submit: null
          }
        }
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('이름이 입력되지 않았습니다.'),
          email: Yup.string().email('올바른 이메일 형식이 아닙니다.').max(255).required('이메일 주소가 입력되지 않았습니다.'),
          password: Yup.string().max(255).required('암호가 입력되지 않았습니다.')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          axios
            .post('/api/member/register', { ...values })
            .then((response) => {
              setStatus({ success: false });
              setSubmitting(false);
              alert('성공');
            })
            .catch((error) => {
              console.error(error);
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">이름*</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={param.isRegister ? values.name : auth.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="이름 입력"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">회사명</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={param.isRegister ? values.company : auth.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="회사명 입력"
                    inputProps={{}}
                  />
                  {touched.company && errors.company && (
                    <FormHelperText error id="helper-text-company-signup">
                      {errors.company}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">이메일*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={param.isRegister ? values.email : auth.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="이메일 입력"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">암호*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid> */}
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {param.registerYn ? '가입' : '수정'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
