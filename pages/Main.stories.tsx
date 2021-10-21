import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Main from "./Main.view";

export default {
  title: "Pages/Main",
  component: Main,
  argTypes: {
    onFetchNextPage: {
      action: "onFetchNext",
    },
  },
  args: {
    contents: mockContent.contents,
    hasNextPage: true,
  },
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />;

export const Default = createStoryComponent(Template);
