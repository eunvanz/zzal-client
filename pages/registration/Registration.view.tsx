import { useCallback, useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Example from "~/components/Example";
import { PreviewProps } from "~/components/Preview";
import RegistrationForm, { RegistrationFormValues } from "~/components/RegistrationForm";
import { Content } from "~/types";

export interface RegistrationProps {
  onSubmit: (values: RegistrationFormValues) => Promise<void>;
  uploadedContents: PreviewProps[];
  isSubmitting: boolean;
  content?: Content;
}

const Registration: React.FC<RegistrationProps> = ({
  onSubmit,
  uploadedContents,
  isSubmitting,
  content,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formValues, setFormValues] = useState<Partial<RegistrationFormValues>>({
    title: content?.title || "",
    path: content?.path || "",
    thumbnail: content?.images[0].url || "",
    description: content?.description || "",
    tags: content?.tags.map((tag) => tag.name).join(",") || "",
    file: null,
  });

  useEffect(() => {
    setTimeout(
      () => {
        setIsFormVisible(true);
      },
      content ? 0 : 2000,
    );
  }, [content]);

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
                  content={content}
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
