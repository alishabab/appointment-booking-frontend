import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import Login from '../../components/Login';

describe('itemDetailedView test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
  });

  it('renders login form', () => {
    expect(wrapper.find('Form')).toHaveLength(0);
  });
});
