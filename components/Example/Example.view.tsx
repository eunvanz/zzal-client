import { Box } from "@mui/material";
import Preview, { PreviewProps } from "../Preview";

export interface ExampleProps extends PreviewProps {
  path?: string;
}

const Example: React.FC<ExampleProps> = ({ path, ...previewProps }) => {
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
      <FriendChat name="Benjamin" text="Hey man" />
      <MyChat text="What up bro" />
      <FriendChat name="Benjamin" text="I'm so bored. Don't you have any fun memes?" />
      <MyChat text="Oh I just got one thing you'll love" />
      <MyChat text="Just wait for a second" />
      {path && (
        <>
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
        </>
      )}
    </Box>
  );
};

interface ChatProps {
  name?: string;
  text?: string;
  children?: React.ReactNode;
  isLink?: boolean;
}

const FriendChat: React.FC<ChatProps> = ({ text, name }) => {
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

const MyChat: React.FC<ChatProps> = ({ text, children, isLink }) => {
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

export default Example;
