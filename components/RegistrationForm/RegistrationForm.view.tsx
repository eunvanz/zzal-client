import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import FileDrop from "../FileDrop";

export interface RegistrationFormProps {}

const RegistrationForm: React.FC<RegistrationFormProps> = ({}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        pr: 2,
      }}
    >
      <Typography variant="h6">Which meme do you like to show?</Typography>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="path">Path</InputLabel>
        <Input
          id="path"
          startAdornment={<InputAdornment position="start">zzal.me/</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <FileDrop onChangeFiles={() => {}} />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input id="title" />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input id="description" />
      </FormControl>
    </Box>
  );
};

export default RegistrationForm;
