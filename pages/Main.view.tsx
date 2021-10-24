import { Container, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BaseLayout from "~/components/BaseLayout";
import ContentList from "~/components/ContentList";
import Intersection from "~/components/Intersection";
import SearchInput from "~/components/SearchInput";
import { Content, CONTENT_ORDER } from "~/types";

export interface MainProps {
  contents?: Content[];
  onFetchNextPage: VoidFunction;
  hasNextPage?: boolean;
  onChangeOrder: (order: CONTENT_ORDER) => void;
  order: CONTENT_ORDER;
  onSearch: (keyword: string) => void;
  isSearching: boolean;
}

const Main: React.FC<MainProps> = ({
  contents,
  onFetchNextPage,
  hasNextPage,
  onChangeOrder,
  order,
  onSearch,
  isSearching,
}) => {
  return (
    <BaseLayout>
      <Container sx={{ py: 2 }}>
        <Box sx={{ mb: 2, width: "100%", display: "flex" }}>
          <FormControl variant="standard" sx={{ mr: 1 }}>
            <Select
              value={order}
              onChange={(e) => onChangeOrder(e.target.value as CONTENT_ORDER)}
              label
            >
              <MenuItem value={CONTENT_ORDER.POPULARITY}>인기순</MenuItem>
              <MenuItem value={CONTENT_ORDER.LATEST}>최신순</MenuItem>
            </Select>
          </FormControl>
          <SearchInput onSubmit={onSearch} isSearching={isSearching} />
        </Box>
        {contents && <ContentList contents={contents} />}
        {hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
      </Container>
    </BaseLayout>
  );
};

export default Main;
