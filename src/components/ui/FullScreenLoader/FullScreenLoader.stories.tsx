import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { FullScreenLoader } from '.';

export default {
  title: 'UI/FullScreenLoader',
  component: FullScreenLoader,
  argTypes: {},
} as ComponentMeta<typeof FullScreenLoader>;

const Template: ComponentStory<typeof FullScreenLoader> = (args) => (
  <FullScreenLoader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
