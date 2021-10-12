import { useCallback } from "react";
import api from "~/api";
import { RegistrationFormValues } from "~/components/RegistrationForm";
import { RegistrationProps } from "./Registration.view";

const useRegistrationProps: () => RegistrationProps = () => {
  const onSubmit = useCallback(async (values: RegistrationFormValues) => {
    const { path } = values;
    const isExistingPath = await api.checkIsExistingPath(path);
    if (isExistingPath) {
    }
  }, []);

  return {
    onSubmit,
  };
};

export default useRegistrationProps;
