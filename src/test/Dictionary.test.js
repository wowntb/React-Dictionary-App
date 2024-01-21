import React from "react";
import Dictionary from "../Dictionary";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<Dictionary></Dictionary>).toJSON();
  expect(tree).toMatchSnapshot();
});
