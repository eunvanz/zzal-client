import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useWindowSize } from "react-use";
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
  keyword: string;
  totalItems?: number;
}

const Main: React.FC<MainProps> = ({
  contents,
  onFetchNextPage,
  hasNextPage,
  onChangeOrder,
  order,
  onSearch,
  isSearching,
  keyword,
  totalItems,
}) => {
  const { width } = useWindowSize();

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
        {totalItems !== undefined && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              {keyword && (
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                    component="b"
                  >
                    {keyword}
                  </Typography>{" "}
                  키워드로{" "}
                </>
              )}
              {totalItems > 0 ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                    component="b"
                  >
                    {totalItems.toLocaleString()}
                  </Typography>
                  건의 짤을 찾았습니다.
                </>
              ) : (
                <>검색된 짤이 없습니다.</>
              )}
            </Typography>
          </Box>
        )}
        {contents && (
          <ContentList
            width={Math.min(width - (width >= 820 ? 48 : 32) + 4, 1152)}
            contents={contents}
          />
        )}
        {hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
      </Container>
    </BaseLayout>
  );
};

export default Main;
