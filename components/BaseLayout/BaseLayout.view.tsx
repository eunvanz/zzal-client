import { Box } from "@mui/material";
import Header from "../Header";

export interface BaseLayoutProps {}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          mt: {
            xs: 7,
            sm: 8,
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default BaseLayout;
