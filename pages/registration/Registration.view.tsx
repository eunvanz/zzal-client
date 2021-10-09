import { Container, CssBaseline, Box } from "@mui/material";

export interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = ({}) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ p: 2 }}></Box>
      </Container>
    </>
  );
};

export default Registration;
