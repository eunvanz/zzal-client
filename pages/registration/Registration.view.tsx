import { useCallback, useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import Example from "~/components/Example";
import { PreviewProps } from "~/components/Preview";
import RegistrationForm, { RegistrationFormValues } from "~/components/RegistrationForm";

export interface RegistrationProps {
  onSubmit: (values: RegistrationFormValues) => Promise<void>;
  uploadedContents: PreviewProps[];
  isSubmitting: boolean;
}

const Registration: React.FC<RegistrationProps> = ({
  onSubmit,
  uploadedContents,
  isSubmitting,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formValues, setFormValues] = useState<Partial<RegistrationFormValues>>({});

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
            items={[...uploadedContents, formValues]}
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
                <RegistrationForm
                  onChangeForm={handleOnChangeForm}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
