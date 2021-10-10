import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Preview from "./Preview.view";

export default {
  title: "Components/Preview",
  component: Preview,
  args: {
    thumbnail:
      "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
    title: "Title",
    description: "Description",
  },
} as ComponentMeta<typeof Preview>;

const Template: ComponentStory<typeof Preview> = (args) => <Preview {...args} />;

export const Default = createStoryComponent(Template);

export const Empty = createStoryComponent(Template, {
  thumbnail: undefined,
  title: undefined,
  description: undefined,
});
