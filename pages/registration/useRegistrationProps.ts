import { useCallback } from "react";
import api from "~/api";
import Alert from "~/components/Alert";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import { convertURLtoFile } from "~/helpers/imageHelpers";
import { RegistrationProps } from "./Registration.view";

const useRegistrationProps: () => RegistrationProps = () => {
  const onSubmit = useCallback(async (values: RegistrationFormValues) => {
    const { path } = values;
    const isExistingPath = await api.checkIsExistingPath(path);
    if (isExistingPath) {
      const isConfirmed = await Alert.confirm({
        content: "The path already exists. Do you want to overwrite?",
      });
      if (!isConfirmed) return;
    }
    const image = await convertURLtoFile(values.thumbnail);
    await api.postContent({
      path: values.path,
      images: [image],
      description: values.description,
      title: values.title,
    });
  }, []);

  return {
    onSubmit,
  };
};

export default useRegistrationProps;
