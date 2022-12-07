import Card from "./Card";

const Meta = {
  title: "Components/Card",
  component: Card,
  args: {},
  argTypes: {},
};

export default Meta;

const Template = (args) => <Card {...args} />;

export const Primary = () => Template.bind({});

Primary.args = {
  card: {
    name: "스토리북 공부하기",
  },
};
