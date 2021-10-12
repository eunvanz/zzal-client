import { Button } from "@mui/material";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Alert from "./Alert.view";

export default {
  title: "Components/Alert",
  component: Alert,
  args: {
    isOpen: true,
    children: "Test message",
    title: "Title",
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Confirm = createStoryComponent(Template);

export const Untitled = createStoryComponent(Template, {
  title: undefined,
});

export const NoCancel = createStoryComponent(Template, {
  // @ts-expect-error
  onCancel: null,
});

export const Promise = () => (
  <>
    <Button
      onClick={() => {
        Alert.show({ content: "Message" });
      }}
    >
      Alert
    </Button>
    <Button
      className="ml-2"
      onClick={() => {
        Alert.confirm({ content: "Message" });
      }}
    >
      Confirm
    </Button>
  </>
);
