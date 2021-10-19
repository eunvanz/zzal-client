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
    onCropImage: {
      action: "onCropImage",
    },
  },
  args: {},
} as ComponentMeta<typeof SelectAndCrop>;

const Template: ComponentStory<typeof SelectAndCrop> = (args) => (
  <SelectAndCrop {...args} />
);

export const Default = createStoryComponent(Template);

export const HasDefaultValue = createStoryComponent(Template, {
  defaultValue:
    "https://s3.ap-northeast-2.amazonaws.com/files.zzal.me/images/%ED%84%B0%EC%A0%B8%EB%B3%BC%EB%9E%98_1634384919326.Z",
  isCropOnly: true,
});

export const CropOnly = createStoryComponent(Template, {
  isCropOnly: true,
});
