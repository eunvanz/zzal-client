import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentDetailCard from "./ContentDetailCard.view";

export default {
  title: "Components/ContentDetailCard",
  component: ContentDetailCard,
  args: {
    content: mockContent.content,
  },
} as ComponentMeta<typeof ContentDetailCard>;

const Template: ComponentStory<typeof ContentDetailCard> = (args) => (
  <ContentDetailCard {...args} />
);

export const Default = createStoryComponent(Template);
