import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Preview, { PreviewProps } from "../Preview";

export interface ExampleProps extends PreviewProps {
  path?: string;
}

const Example: React.FC<ExampleProps> = ({ path, ...previewProps }) => {
  const [step, setStep] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const totalSteps = 5;
    let currentStep = 0;
    timerRef.current = window.setInterval(() => {
      setStep(() => ++currentStep);
      if (currentStep === totalSteps) {
        timerRef.current && clearInterval(timerRef.current);
      }
    }, 1000);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (path) {
      timerRef.current && clearInterval(timerRef.current);
      setStep(6);
    }
  }, [path]);

  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2,
        backgroundColor: "#333652",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Animate currentStep={step} triggerStep={1}>
        <FriendChat name="Benjamin" text="Hey man" isFirst />
      </Animate>
      <Animate currentStep={step} triggerStep={2}>
        <MyChat text="What up bro" isFirst />
      </Animate>
      <Animate currentStep={step} triggerStep={3}>
        <FriendChat
          name="Benjamin"
          text="I'm so bored. Don't you have any fun memes?"
          isFirst
        />
      </Animate>
      <Animate currentStep={step} triggerStep={4}>
        <MyChat text="Oh I just got one thing you'll love" isFirst />
      </Animate>
      <Animate currentStep={step} triggerStep={5}>
        <MyChat text="Just wait for a second" />
      </Animate>
      {path && (
        <Animate currentStep={step} triggerStep={6}>
          <MyChat text={`zzal.me/${path}`} isLink />
          <MyChat>
            <Box
              sx={{
                width: "50%",
                maxWidth: 350,
                minWidth: 250,
              }}
            >
              <Preview {...previewProps} />
            </Box>
          </MyChat>
        </Animate>
      )}
    </Box>
  );
};

interface ChatProps {
  name?: string;
  text?: string;
  children?: React.ReactNode;
  isLink?: boolean;
  isFirst?: boolean;
}

const FriendChat: React.FC<ChatProps> = ({ text, name, isFirst }) => {
  return (
    <Box
      sx={{
        display: "flex",
        my: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          backgroundColor: "#90ADC6",
          backgroundImage:
            "url(https://avatars.githubusercontent.com/u/17351661?s=40&v=4)",
          backgroundSize: "cover",
          flexShrink: 1,
          width: 32,
          height: 32,
          mr: 1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            color: "white",
            mb: 0.5,
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            borderRadius: 3,
            borderTopLeftRadius: isFirst ? 4 : 12,
            backgroundColor: "#E9EAEC",
            p: 1.5,
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  );
};

const MyChat: React.FC<ChatProps> = ({ text, children, isLink, isFirst }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        my: 1,
      }}
    >
      {children || (
        <Box
          sx={{
            borderRadius: 3,
            borderTopRightRadius: isFirst ? 4 : 12,
            backgroundColor: "#FAD02C",
            p: 1.5,
            color: isLink ? "#2E8BC0" : undefined,
          }}
        >
          {text}
        </Box>
      )}
    </Box>
  );
};

interface AnimateProps {
  currentStep: number;
  triggerStep: number;
}

const Animate: React.FC<AnimateProps> = ({ currentStep, triggerStep, children }) => {
  return (
    <AnimatePresence>
      {currentStep >= triggerStep && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "inherit",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Example;
