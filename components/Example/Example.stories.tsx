import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Example from "./Example.view";

export default {
  title: "Components/Example",
  component: Example,
  args: {
    path: "test",
    thumbnail:
      "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
    title: "Title",
    description: "Description",
  },
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => <Example {...args} />;

export const Default = createStoryComponent(Template);

export const Empty = createStoryComponent(Template, {
  path: undefined,
});
