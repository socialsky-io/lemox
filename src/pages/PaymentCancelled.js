import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Stack,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Link,
} from '@mui/material';
import Iconify from '../components/Iconify';
import { getProperty } from '../redux/actions/data';
import { fPercent, fCurrency, fNumber } from '../utils/formatNumber';

export default function PaymentCancelled() {
  const dispatch = useDispatch();
  const [chargeData, setChargeData] = React.useState([]);

  const { id, charge } = useParams();
  React.useEffect(() => {
    dispatch(getProperty(id));
  }, [dispatch]);
  React.useEffect(() => {
    const fetchCharge = async (currentCharge) => {
      axios
        .get(`https://api.commerce.coinbase.com/charges/${currentCharge}`)
        .then((res) => {
          const { data } = res;
          setChargeData(data.data);
        })
        .catch((error) => console.log(error));
    };
    fetchCharge(charge);
  }, [charge]);
  const { property } = useSelector((state) => state.data);
  return (
    <Container className="py-10">
      <Grid container>
        <Grid item sm={12} md={6} justifyContent="center" alignItems="baseline">
          <Stack spacing={1} mb={5}>
            <Iconify icon="iconoir:cancel" sx={{ fontSize: 50, color: 'error.main' }} />
            <Typography variant="h3">Failure</Typography>
            <Typography variant="body1">
              Your investment for <strong>{property?.title}</strong> is Unsuccessful
            </Typography>
          </Stack>
          <Link component={RouterLink} to={`/marketplace/${id}`}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Iconify icon="ep:back" />
              <Typography variant="body1">Go back</Typography>
            </Stack>
          </Link>
        </Grid>
        <Grid item sm={12} md={6}>
          <Card sx={{ backgroundColor: 'grey.300' }}>
            <CardContent>
              <Typography variant="body1">Transaction summary</Typography>
              <Typography variant="body2">{chargeData?.id}</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Payment type</TableCell>
                      <TableCell>PAYMENT GATEWAY</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Transaction status</TableCell>
                      <TableCell>Cancelled</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>
                        {chargeData?.pricing?.local?.amount && fCurrency(chargeData?.pricing?.local?.amount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Property ID</TableCell>
                      <TableCell>{property?._id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="caption" color="error.main">
                          *Transaction cancelled
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
