import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import Preview, { PreviewProps } from "../Preview";

export interface PreviewItem extends PreviewProps {
  path: string;
}

export interface ExampleProps {
  items?: PreviewItem[];
  completeCount?: number;
}

const Example: React.FC<ExampleProps> = ({ items, completeCount }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2,
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Animate delay={0}>
        <FriendChat name="Benjamin" text="Hey man" isFirst />
      </Animate>
      <Animate delay={!items ? 0.5 : 0}>
        <FriendChat name="Benjamin" text="I'm so bored. Don't you have any fun memes?" />
      </Animate>
      <Animate delay={!items ? 1 : 0}>
        <MyChat text="Oh, I just got one thing you'll love" isFirst />
      </Animate>
      <Animate delay={!items ? 1.5 : 0}>
        <MyChat text="Wait for a second" />
      </Animate>
      {items?.[0] && (
        <Animate delay={0}>
          <MyChat text={`zzal.me/${items[0].path}`} isLink />
          <MyChat>
            <Box
              sx={{
                width: "50%",
                maxWidth: 350,
                minWidth: 250,
              }}
            >
              <Preview
                thumbnail={items[0].thumbnail}
                title={items[0].title}
                description={items[0].description}
              />
            </Box>
          </MyChat>
        </Animate>
      )}
      {completeCount &&
        Array.from({ length: completeCount }).map((_, index) => (
          <ExtraChat item={items![index + 1]} key={index} />
        ))}
    </Box>
  );
};

interface ExtraChatProps {
  item?: PreviewItem;
}

const ExtraChat: React.FC<ExtraChatProps> = ({ item }) => {
  return (
    <>
      <Animate delay={1}>
        <FriendChat name="Benjamin" text="loooooooool" isFirst />
      </Animate>
      <Animate delay={1.5}>
        <FriendChat name="Benjamin" text="That's really fun!" />
      </Animate>
      <Animate delay={2}>
        <FriendChat name="Benjamin" text="Don't you have more?" />
      </Animate>
      {item && (
        <Animate delay={0}>
          <MyChat text={`zzal.me/${item.path}`} isLink />
          <MyChat>
            <Box
              sx={{
                width: "50%",
                maxWidth: 350,
                minWidth: 250,
              }}
            >
              <Preview
                thumbnail={item.thumbnail}
                title={item.title}
                description={item.description}
              />
            </Box>
          </MyChat>
        </Animate>
      )}
    </>
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
        sx={
          isFirst
            ? {
                borderRadius: "50%",
                backgroundColor: "#90ADC6",
                backgroundImage:
                  "url(https://avatars.githubusercontent.com/u/17351661?s=40&v=4)",
                backgroundSize: "cover",
                flexShrink: 1,
                width: 32,
                height: 32,
                mr: 1,
              }
            : {
                flexShrink: 1,
                width: 32,
                height: 32,
                mr: 1,
              }
        }
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isFirst && (
          <Box
            sx={{
              color: "white",
              mb: 0.5,
            }}
          >
            {name}
          </Box>
        )}
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
  const theme = useTheme();

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
            backgroundColor: theme.palette.secondary.light,
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
  delay: number;
}

const Animate: React.FC<AnimateProps> = ({ delay, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
        }}
        animate={{
          opacity: 1,
          height: "inherit",
        }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Example;
