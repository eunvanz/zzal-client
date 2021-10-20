import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentItem from "./ContentItem.view";

export default {
  title: "Components/ContentItem",
  component: ContentItem,
  args: {
    content: mockContent.content,
  },
} as ComponentMeta<typeof ContentItem>;

const Template: ComponentStory<typeof ContentItem> = (args) => <ContentItem {...args} />;

export const Default = createStoryComponent(Template);
