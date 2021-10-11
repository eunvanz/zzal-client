import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentDetail from "./ContentDetail.view";

export default {
  title: "Pages/ContentDetail",
  component: ContentDetail,
  args: {
    content: mockContent.content,
  },
} as ComponentMeta<typeof ContentDetail>;

const Template: ComponentStory<typeof ContentDetail> = (args) => (
  <ContentDetail {...args} />
);

export const Default = createStoryComponent(Template);
