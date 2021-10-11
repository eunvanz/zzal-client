import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import FileDrop from "./FileDrop.view";

export default {
  title: "Components/FileDrop",
  component: FileDrop,
  argTypes: {
    onChangeFiles: {
      action: "onChangeFiles",
    },
  },
  args: {},
} as ComponentMeta<typeof FileDrop>;

const Template: ComponentStory<typeof FileDrop> = (args) => <FileDrop {...args} />;

export const Default = createStoryComponent(Template);

export const SingleFile = createStoryComponent(Template, {
  maxFiles: 1,
});

export const HasError = createStoryComponent(Template, {
  errorMessage: "Error message",
});
