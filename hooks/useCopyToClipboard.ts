import { useCallback } from "react";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";

const useCopyToClipboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = useCallback(
    (url) => {
      copy(url);
      enqueueSnackbar("링크가 복사되었습니다.");
    },
    [enqueueSnackbar],
  );

  return {
    copyToClipboard,
  };
};

export default useCopyToClipboard;
