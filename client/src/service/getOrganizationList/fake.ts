function organizationFactory(name: string) {
  return {
    name
  };
}
const list = ["易班", "广播台", "海天", "实验室"].map(item => {
  return organizationFactory(item);
});

export default list;
