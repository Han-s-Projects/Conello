import BoardLink from "./BoardLink";

const Meta = {
  title: "Components/BoardLink",
  component: BoardLink,
  args: {},
  argTypes: {},
};

export default Meta;

const Template = (args) => <BoardLink {...args} />;

export const Primary = Template.bind({});

Primary.args = { name: "보드1", id: "12fyifsdifhfksfhsd" };
