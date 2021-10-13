import { useCallback } from "react";
import { useRecoilState } from "recoil";
import api from "~/api";
import Alert from "~/components/Alert";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import { convertURLtoFile } from "~/helpers/imageHelpers";
import uploadedContentsState from "~/state/uploadedContents";
import { RegistrationProps } from "./Registration.view";

const useRegistrationProps: () => RegistrationProps = () => {
  const [uploadedContents, setUploadedContents] = useRecoilState(uploadedContentsState);

  const onSubmit = useCallback(
    async (values: RegistrationFormValues) => {
      const { path } = values;
      const isExistingPath = await api.checkIsExistingPath(path);
      if (isExistingPath) {
        const isConfirmed = await Alert.confirm({
          content: "The path already exists. Do you want to overwrite?",
        });
        if (!isConfirmed) return false;
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
      return true;
    },
    [setUploadedContents, uploadedContents],
  );

  return {
    onSubmit,
    uploadedContents,
  };
};

export default useRegistrationProps;
