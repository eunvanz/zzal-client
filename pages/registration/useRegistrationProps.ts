import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import api from "~/api";
import Alert from "~/components/Alert";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import { convertURLtoFile } from "~/helpers/imageHelpers";
import uploadedContentsState from "~/state/uploadedContents";
import { RegistrationProps } from "./Registration.view";

const useRegistrationProps: () => RegistrationProps = () => {
  const [uploadedContents, setUploadedContents] = useRecoilState(uploadedContentsState);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    async (values: RegistrationFormValues) => {
      setIsSubmitting(true);
      const image = await convertURLtoFile(values.thumbnail);
      const newContent = {
        path: values.path,
        images: [image],
        description: values.description,
        title: values.title,
      };
      await api.postContent(newContent);
      setUploadedContents([
        ...uploadedContents,
        { ...newContent, thumbnail: values.thumbnail },
      ]);
      setIsSubmitting(false);
      return true;
    },
    [setUploadedContents, uploadedContents],
  );

  return {
    onSubmit,
    uploadedContents,
    isSubmitting,
  };
};

export default useRegistrationProps;
