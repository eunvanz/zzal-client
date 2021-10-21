import { useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import useContentByPathQuery from "~/queries/useContentByPathQuery";
import usePostContentMutation from "~/queries/usePostContentMutation";
import usePutContentMutation from "~/queries/usePutContentMutation";
import uploadedContentsState from "~/state/uploadedContents";
import { RegistrationProps } from "./Registration.view";
import { RegistrationPageProps } from "./index.page";

const useRegistrationProps: (props: RegistrationPageProps) => RegistrationProps = ({
  content: ssrContent,
}) => {
  const [uploadedContents, setUploadedContents] = useRecoilState(uploadedContentsState);

  const { data: content, isFetching } = useContentByPathQuery(ssrContent?.path, {
    initialData: ssrContent || undefined,
    enabled: false,
  });
  const { mutateAsync: postContent, isLoading: isPosting } = usePostContentMutation();
  const { mutateAsync: putContent, isLoading: isPutting } = usePutContentMutation(
    content?.id || undefined,
  );

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    async (values: RegistrationFormValues) => {
      if (content) {
        await putContent(values);
        enqueueSnackbar("짤이 수정되었습니다.");
      } else {
        await postContent(values);
        enqueueSnackbar("짤이 등록되었습니다.");
      }
    },
    [content, enqueueSnackbar, postContent, putContent],
  );

  useEffect(() => {
    return () => {
      setUploadedContents([]);
    };
  }, [setUploadedContents]);

  return {
    onSubmit,
    uploadedContents,
    isSubmitting: isPosting || isPutting || isFetching,
    content: content || undefined,
  };
};

export default useRegistrationProps;
