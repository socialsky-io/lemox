import * as Yup from 'yup';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { fData } from '../utils/formatNumber';
import { countries } from '../sections/@dashboard/user';
//

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });
  const user = JSON.parse(localStorage.getItem('profile'));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user.result.firstName || '',
      lastName: user.result.lastName || '',
      country: user.result.country || '',
      state: user.result.state || '',
      email: user.result.email,
      profilePic: user.result.profilePic,
      tel: user.result.tel,
      dateOfBirth: user.result.dateOfBirth || '',
    },

    validationSchema: UpdateUserSchema,
    onSubmit: (values, { setErrors, setSubmitting }) => {
      console.log(values);
    },
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              {/* <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              /> */}
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText>{' '}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="First name" {...getFieldProps('firstName')} />
                  <TextField fullWidth label="Last name" {...getFieldProps('lastName')} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Phone Number" {...getFieldProps('tel')} />
                  <TextField fullWidth label="Email Address" {...getFieldProps('email')} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.label} />
                    ))}
                  </TextField>
                  <TextField fullWidth label="State/Region" {...getFieldProps('state')} />
                </Stack>
                <TextField {...getFieldProps('dateOfBirth')} fullWidth label="Date of birth" />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
