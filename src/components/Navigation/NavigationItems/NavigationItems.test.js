import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavgationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render <NavgationItem /> for logout if auth", () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(<NavgationItem link="/logout">Logout</NavgationItem>)
    ).toEqual(true);
  });

  it("should render two <NavgationItem /> if not auth", () => {
    expect(wrapper.find(NavgationItem)).toHaveLength(2);
  });

  it("should render three <NavgationItem /> if auth", () => {
    //wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavgationItem)).toHaveLength(3);
  });
});
