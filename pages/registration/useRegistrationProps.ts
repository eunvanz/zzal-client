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
      const { path } = values;
      const isExistingPath = await api.checkIsExistingPath(path);
      if (isExistingPath) {
        const isConfirmed = await Alert.confirm({
          content: "경로에 짤이 이미 존재합니다. 이 짤로 교체할까요?",
        });
        if (!isConfirmed) {
          setIsSubmitting(false);
          return false;
        }
      }
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
