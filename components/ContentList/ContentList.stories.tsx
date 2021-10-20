import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentList from "./ContentList.view";

export default {
  title: "Components/ContentList",
  component: ContentList,
  args: {
    contents: mockContent.contents,
  },
} as ComponentMeta<typeof ContentList>;

const Template: ComponentStory<typeof ContentList> = (args) => <ContentList {...args} />;

export const Default = createStoryComponent(Template);
