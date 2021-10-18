import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContent from "~/__mocks__/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import RegistrationForm from "./RegistrationForm.view";

export default {
  title: "Components/RegistrationForm",
  component: RegistrationForm,
  argTypes: {
    onChangeForm: {
      action: "onChangeForm",
    },
  },
  args: {},
} as ComponentMeta<typeof RegistrationForm>;

const Template: ComponentStory<typeof RegistrationForm> = (args) => (
  <RegistrationForm {...args} />
);

export const Default = createStoryComponent(Template);

export const Submitting = createStoryComponent(Template, { isSubmitting: true });

export const HasDefaultValue = createStoryComponent(Template, {
  content: mockContent.content,
});
