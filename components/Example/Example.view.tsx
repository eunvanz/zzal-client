import { useMemo } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { Content } from "~/types";
import Preview, { PreviewProps } from "../Preview";

export interface PreviewItem extends PreviewProps {
  path?: Content["path"];
}

export interface ExampleProps {
  items?: PreviewItem[];
  completeCount?: number;
}

const Example: React.FC<ExampleProps> = ({ items, completeCount }) => {
  const theme = useTheme();

  const isItemExisting = useMemo(() => {
    return !!items?.[0].path;
  }, [items]);

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
        <FriendChat name="호랭이성님" text="어흥~~" isFirst />
      </Animate>
      <Animate delay={!isItemExisting ? 0.5 : 0}>
        <FriendChat name="호랭이성님" text="짤 하나 주면 안잡아먹지~~ 😼" />
      </Animate>
      <Animate delay={!isItemExisting ? 1 : 0}>
        <MyChat text="어익후" isFirst />
      </Animate>
      <Animate delay={!isItemExisting ? 1.5 : 0}>
        <MyChat text="짤 드릴테니 목숨만은 살려주십쇼 😖" />
      </Animate>
      <Animate delay={0} isVisible={!!(items?.[0] && items[0].path)}>
        <MyChat text={`zzal.me/${items![0].path}`} isLink />
        <MyChat>
          <Box
            sx={{
              width: "50%",
              maxWidth: 350,
              minWidth: 250,
            }}
          >
            <Preview
              thumbnail={items![0].thumbnail}
              title={items![0].title}
              description={items![0].description}
            />
          </Box>
        </MyChat>
      </Animate>
      {!!completeCount &&
        Array.from({ length: completeCount }).map((_, index) => (
          <ExtraChat item={items![index + 1]} key={index} seq={index} />
        ))}
    </Box>
  );
};

interface ExtraChatProps {
  item?: PreviewItem;
  seq: number;
}

const dialogData = [["ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ", "잼나는구먼 😹", "좀 더 없음?"]];

const ExtraChat: React.FC<ExtraChatProps> = ({ item }) => {
  return (
    <>
      {dialogData[0].map((data, index) => (
        <Animate delay={index + 1 - index * 0.5} key={index}>
          <FriendChat name="호랭이성님" text={data} isFirst={index === 0} />
        </Animate>
      ))}
      {item && item.path && (
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
          maxWidth: "80%",
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
        justifyContent: "flex-end",
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
            maxWidth: "80%",
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
  isVisible?: boolean;
}

const Animate: React.FC<AnimateProps> = ({ delay, children, isVisible = true }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "inherit",
          }}
          exit={{
            opacity: 0,
            height: 0,
          }}
          transition={{ delay }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Example;
