import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import SelectAndCrop from "./SelectAndCrop.view";

export default {
  title: "Components/SelectAndCrop",
  component: SelectAndCrop,
  argTypes: {
    onSettleImage: {
      action: "onSettleImage",
    },
  },
  args: {},
} as ComponentMeta<typeof SelectAndCrop>;

const Template: ComponentStory<typeof SelectAndCrop> = (args) => (
  <SelectAndCrop {...args} />
);

export const Default = createStoryComponent(Template);
