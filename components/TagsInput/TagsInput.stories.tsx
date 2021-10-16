import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import TagsInput from "./TagsInput.view";

export default {
  title: "Components/TagsInput",
  component: TagsInput,
  argTypes: {
    onChange: {
      action: "onChange",
    },
  },
  args: {
    max: 5,
    value: "",
  },
} as ComponentMeta<typeof TagsInput>;

const Template: ComponentStory<typeof TagsInput> = (args) => <TagsInput {...args} />;

export const Default = createStoryComponent(Template);
