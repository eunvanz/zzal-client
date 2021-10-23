import { Container } from "@mui/material";
import BaseLayout from "~/components/BaseLayout";
import ContentList from "~/components/ContentList";
import Intersection from "~/components/Intersection";
import { Content } from "~/types";

export interface MainProps {
  contents?: Content[];
  onFetchNextPage: VoidFunction;
  hasNextPage?: boolean;
}

const Main: React.FC<MainProps> = ({ contents, onFetchNextPage, hasNextPage }) => {
  return (
    <BaseLayout>
      <Container sx={{ py: 2 }}>
        {contents && <ContentList contents={contents} />}
        {hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
      </Container>
    </BaseLayout>
  );
};

export default Main;
