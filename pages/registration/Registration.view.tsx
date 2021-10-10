import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Example from "~/components/Example";
import RegistrationForm from "~/components/RegistrationForm/RegistrationForm.view";

export interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = ({}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFormVisible(true);
    }, 5000);
  }, []);

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
              p: 2,
              transition: "width 500ms",
              width: "100%",
            }}
          >
            <Example />
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
                  transition={{ delay: 1 }}
                >
                  <RegistrationForm />
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
