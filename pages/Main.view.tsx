import { Container } from "@mui/material";
import BaseLayout from "~/components/BaseLayout";
import ContentList from "~/components/ContentList";
import { Content } from "~/types";

export interface MainProps {
  contents: Content[];
}

const Main: React.FC<MainProps> = ({ contents }) => {
  return (
    <BaseLayout>
      <Container sx={{ py: 1 }}>
        <ContentList contents={contents} />
      </Container>
    </BaseLayout>
  );
};

export default Main;
