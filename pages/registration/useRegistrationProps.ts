import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import usePostContentMutation from "~/queries/usePostContentMutation";
import uploadedContentsState from "~/state/uploadedContents";
import { RegistrationProps } from "./Registration.view";

const useRegistrationProps: () => RegistrationProps = () => {
  const uploadedContents = useRecoilValue(uploadedContentsState);

  const { mutateAsync, isLoading: isSubmitting } = usePostContentMutation();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(
    async (values: RegistrationFormValues) => {
      await mutateAsync(values);
      enqueueSnackbar("짤이 등록되었습니다.");
    },
    [enqueueSnackbar, mutateAsync],
  );

  return {
    onSubmit,
    uploadedContents,
    isSubmitting,
  };
};

export default useRegistrationProps;
