import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import usePostContentMutation from "~/queries/usePostContentMutation";
import uploadedContentsState from "~/state/uploadedContents";
import { RegistrationProps } from "./Registration.view";

const useRegistrationProps: () => RegistrationProps = () => {
  const uploadedContents = useRecoilValue(uploadedContentsState);

  const { mutateAsync, isLoading: isSubmitting } = usePostContentMutation();

  const onSubmit = useCallback(
    async (values: RegistrationFormValues) => {
      await mutateAsync(values);
      return true;
    },
    [mutateAsync],
  );

  return {
    onSubmit,
    uploadedContents,
    isSubmitting,
  };
};

export default useRegistrationProps;
