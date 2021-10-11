import { useCallback, useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Example from "~/components/Example";
import RegistrationForm, { RegistrationFormValues } from "~/components/RegistrationForm";

export interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = ({}) => {
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

  const handleOnSubmit = useCallback(() => {}, []);

  return (
    <>
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
            <Example {...formValues} />
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
                    onSubmit={handleOnSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
