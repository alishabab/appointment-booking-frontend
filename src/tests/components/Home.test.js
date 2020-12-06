import { shallow } from 'enzyme';
import React from 'react';
import Home from '../../components/Home';

describe('itemDetailedView test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Home />,
    );
  });

  it('renders 2 location options', () => {
    expect(wrapper.find('option')).toHaveLength(2);
  });

  it('renders link to create appointment', () => {
    expect(wrapper.find('Link')).toHaveLength(1);
  });
});
