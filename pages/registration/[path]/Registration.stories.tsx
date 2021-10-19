import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Registration from "./Registration.view";

export default {
  title: "Pages/Registration",
  component: Registration,
  argTypes: {
    onSubmit: {
      action: "onSubmit",
    },
  },
  args: {
    uploadedContents: [],
  },
} as ComponentMeta<typeof Registration>;

const Template: ComponentStory<typeof Registration> = (args) => (
  <Registration {...args} />
);

export const Default = createStoryComponent(Template);

export const HasDefaultValue = createStoryComponent(Template, {
  content: mockContent.content,
});
