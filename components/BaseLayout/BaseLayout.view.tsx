import { Container } from "@mui/material";
import Header from "../Header";

export interface BaseLayoutProps {}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        sx={{
          mt: 10,
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
