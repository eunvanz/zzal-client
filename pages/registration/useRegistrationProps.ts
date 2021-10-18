import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import usePostContentMutation from "~/queries/usePostContentMutation";
import usePutContentMutation from "~/queries/usePutContentMutation";
import uploadedContentsState from "~/state/uploadedContents";
import { RegistrationProps } from "./Registration.view";
import { RegistrationPageProps } from "./[path].page";

const useRegistrationProps: (props: RegistrationPageProps) => RegistrationProps = ({
  content,
}) => {
  const [uploadedContents] = useRecoilState(uploadedContentsState);

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

  return {
    onSubmit,
    uploadedContents,
    isSubmitting: isPosting || isPutting,
    content: content || undefined,
  };
};

export default useRegistrationProps;
