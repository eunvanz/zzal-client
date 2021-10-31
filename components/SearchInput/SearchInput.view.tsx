import { useCallback, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Input, InputAdornment } from "@mui/material";

export interface SearchInputProps {
  onSubmit: (value: string) => void;
  isSearching: boolean;
  defaultValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSubmit,
  isSearching,
  defaultValue,
}) => {
  const [keyword, setKeyword] = useState(defaultValue || "");

  const handleOnSubmit = useCallback(() => {
    onSubmit(keyword);
  }, [keyword, onSubmit]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <Input
        placeholder="검색어를 입력해주세요"
        onChange={(e) => setKeyword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleOnSubmit} type="submit" disabled={isSearching}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </form>
  );
};

export default SearchInput;
