import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ImageCrop from "./ImageCrop.view";

export default {
  title: "Components/ImageCrop",
  component: ImageCrop,
  argTypes: {
    onChange: {
      action: "onChange",
    },
  },
  args: {
    image:
      "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
    aspect: 2 / 1,
  },
} as ComponentMeta<typeof ImageCrop>;

const Template: ComponentStory<typeof ImageCrop> = (args) => <ImageCrop {...args} />;

export const Default = createStoryComponent(Template);

export const FixedRatio = createStoryComponent(Template, { fixedRatio: 1 / 2 });
