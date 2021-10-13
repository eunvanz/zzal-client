import { useCallback, useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import Example from "~/components/Example";
import RegistrationForm, { RegistrationFormValues } from "~/components/RegistrationForm";
import { convertContentToPreview } from "~/helpers/projectHelpers";
import uploadedContentsState from "~/state/uploadedContents";

export interface RegistrationProps {
  onSubmit: (values: RegistrationFormValues) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onSubmit }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formValues, setFormValues] = useState<Partial<RegistrationFormValues>>({});

  const [uploadedContents, setUploadedContents] = useRecoilState(uploadedContentsState);

  useEffect(() => {
    setTimeout(() => {
      setIsFormVisible(true);
    }, 2000);
  }, []);

  const handleOnChangeForm = useCallback((values: RegistrationFormValues) => {
    setFormValues(values);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            transition: "width 500ms",
            width: "100%",
            pt: 2,
          }}
        >
          <Example
            items={[
              ...uploadedContents.map((content) => convertContentToPreview(content)),
              formValues,
            ]}
            completeCount={uploadedContents.length}
          />
        </Box>
        <Box
          sx={{
            height: "100%",
            transition: "width 500ms",
            width: "100%",
          }}
        >
          <AnimatePresence>
            {isFormVisible && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <RegistrationForm onChangeForm={handleOnChangeForm} onSubmit={onSubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
