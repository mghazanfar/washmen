import { Box, MenuItem, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getPartners, getPartnersByDistance } from "../../server";
import { distances } from "./data";
import { PartnersList } from "./partners-list.component";

export const PartnersListContainer = () => {
  const [distance, setDistance] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataByDistance = (distance:string) => {
    setLoading(true);
    getPartnersByDistance(distance)
    .then(({ data }) => {
      setData(data);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    setDistance(value);
    getDataByDistance(value);
  };

  useEffect(() => {
    setLoading(true);
    getPartners()
      .then(({ data }) => {
        setData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box  p={5} display="flex" justifyContent={"center"} flexDirection="column" alignItems={'center'}>
      <h4>Partners list</h4>
      <h6>
        Select distance to filter the list below based on partner's location
      </h6>
      <TextField
        id="standard-select-distance"
        select
        label="Distance"
        value={distance}
        onChange={handleChange}
        variant="outlined"
        style={{minWidth:150}}
      >
        {distances.map((option,index) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Box>
        <Box mt={5} maxWidth={1200}>
          <PartnersList rows={data} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
};
