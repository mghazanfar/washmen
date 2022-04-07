import {
  Box,
  CircularProgress,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  withMobileDialog,
} from "@material-ui/core";
interface Partner {
  id: number;
  urlName: string;
  organization: string;
  customerLocations: string;
  willWorkRemotely: true;
  website: string;
  services: string;
  offices: [
    {
      _id: string;
      location: string;
      address: string;
      coordinates: string;
    }
  ];
}

interface PartnersListProps {
  rows: Partner[];
  loading: boolean;
  width?: string;
}

const MobilePartnerListItem = ({
  id,
  organization,
  customerLocations,
  offices,
  website,
  services,
}: Partner) => {
  return (
    <Box mb={3}>
      <Paper key={id} elevation={11}>
        <Box p={3}>
          <Typography>
            <b>
              {id} -{` ${organization}`}
            </b>
          </Typography>
          <Box py={1}>
            <Typography>
              <b>Location: </b>
              <br />
              {customerLocations}
            </Typography>
          </Box>
          <Divider />
          <Box py={1}>
          <Typography>
            <b>Offices: </b>
            <br />
            {offices.map((office, index) => (
              <>
                <Link
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${office.coordinates.replace(
                    ",",
                    "%2C"
                  )}`}
                >
                  {index + 1} - {office.address}
                </Link>
                <br />
              </>
            ))}
          </Typography>
          </Box>
          <Divider />
          <Box py={1}>
          <Typography>
            <b>Online entity:</b>
            <br />
            <Link href={website} target="_blank">
              {website}
            </Link>
          </Typography>
          </Box>
          <Divider />
          <Box py={1}>
          <Typography>
            <b>Services:</b>
            <br />
              <Typography>
                {services}
              </Typography>
          </Typography>
          </Box>
          <Divider />
        </Box>
      </Paper>
    </Box>
  );
};

const PartnersListWrapped = ({ rows, loading, width }: PartnersListProps) => {
  let isMobile = width === "xs" || width === "sm";
  return loading ? (
    <CircularProgress />
  ) : rows.length === 0 ? (
    <>No data found!</>
  ) : isMobile ? (
    <Box>
      {rows.map((item) => (
        <MobilePartnerListItem {...item} />
      ))}
    </Box>
  ) : (
    <TableContainer component={Paper} style={{ maxHeight: 600 }}>
      <Table size="small" aria-label="a dense table" stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Partner Organization</TableCell>
            <TableCell align="left">Locations</TableCell>
            <TableCell align="left">Offices</TableCell>
            <TableCell align="left">Online entity</TableCell>
            <TableCell align="left">Services</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.organization}
              </TableCell>
              <TableCell align="left">{row.customerLocations}</TableCell>
              <TableCell align="left">
                {row.offices.map((office, index) => (
                  <>
                    <Link
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${office.coordinates.replace(
                        ",",
                        "%2C"
                      )}`}
                    >
                      {index + 1} - {office.address}
                    </Link>
                    {index === row.offices.length - 1 ? "" : ","}
                    {index === row.offices.length - 1 ? (
                      ""
                    ) : (
                      <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                    )}
                  </>
                ))}
              </TableCell>
              <TableCell align="left">
                <Link href={row.website} target="_blank">
                  {row.website}
                </Link>
              </TableCell>
              <TableCell align="left">
                <Tooltip title={row.services}>
                  <Typography noWrap style={{ maxWidth: 150 }}>
                    {row.services}
                  </Typography>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const PartnersList = withMobileDialog()(PartnersListWrapped);
