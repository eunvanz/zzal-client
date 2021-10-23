import { useEffect, useRef, useState } from "react";
import { SignalWifiStatusbarConnectedNoInternet4TwoTone } from "@mui/icons-material";
import { Modal, Box, Fade, Backdrop } from "@mui/material";
import { Content } from "~/types";
import ContentDetailCard from "../ContentDetailCard";

export interface ContentModalProps {
  content: Content;
  isOpen: boolean;
  onClose: VoidFunction;
}

const ContentModal: React.FC<ContentModalProps> = ({ content, isOpen, onClose }) => {
  const cardRef = useRef<HTMLDivElement>();

  const [boxStyle, setBoxStyle] = useState({
    top: "50%",
    transform: "translate(-50%, -50%)",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        let boxStyle = {
          top: "50%",
          transform: "translate(-50%, -50%)",
        };
        if ((cardRef.current?.clientHeight || 0) > window.innerHeight - 24) {
          boxStyle = {
            top: "0px",
            transform: "translate(-50%)",
          };
        }
        setBoxStyle(boxStyle);
      });
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      sx={{
        overflow: "auto",
      }}
    >
      <Fade in={isOpen}>
        <Box
          ref={cardRef}
          sx={{
            position: "absolute",
            left: "50%",
            p: 2,
            width: {
              xs: "100%",
              md: "auto",
            },
            "&:focus": {
              outline: "none",
            },
            ...boxStyle,
          }}
        >
          <ContentDetailCard content={content} onClose={onClose} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ContentModal;
