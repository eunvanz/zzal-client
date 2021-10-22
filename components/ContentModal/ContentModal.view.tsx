import { Modal, Box, Fade, Backdrop } from "@mui/material";
import { Content } from "~/types";
import ContentDetailCard from "../ContentDetailCard";

export interface ContentModalProps {
  content: Content;
  isOpen: boolean;
  onClose: VoidFunction;
}

const ContentModal: React.FC<ContentModalProps> = ({ content, isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 2,
            maxWidth: "100%",
          }}
        >
          <ContentDetailCard content={content} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ContentModal;
