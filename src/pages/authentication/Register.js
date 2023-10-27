import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';


// ================================|| REGISTER ||================================ //

const Register = () => {
  const [isRegister, setIsRegister] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == '/register') {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, [location.pathname]);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">{isRegister ? '가입하기' : '프로필 수정'}</Typography>
            {/* <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Already have an account?
          </Typography> */}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthRegister isRegister={isRegister} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
export default Register;
