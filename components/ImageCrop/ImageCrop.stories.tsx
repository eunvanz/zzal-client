import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ImageCrop from "./ImageCrop.view";

export default {
  title: "Components/ImageCrop",
  component: ImageCrop,
  argTypes: {
    onChangeCrop: {
      action: "onChangeCrop",
    },
  },
  args: {
    image:
      "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
    aspect: 4 / 3,
  },
} as ComponentMeta<typeof ImageCrop>;

const Template: ComponentStory<typeof ImageCrop> = (args) => <ImageCrop {...args} />;

export const Default = createStoryComponent(Template);
