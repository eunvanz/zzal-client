import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentModal from "./ContentModal.view";

export default {
  title: "Components/ContentModal",
  component: ContentModal,
  args: {
    isOpen: true,
    content: mockContent.content,
  },
} as ComponentMeta<typeof ContentModal>;

const Template: ComponentStory<typeof ContentModal> = (args) => (
  <ContentModal {...args} />
);

export const Default = createStoryComponent(Template);
