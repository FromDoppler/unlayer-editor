import React from 'react';
import { TwitterProperty } from './TwitterProperty';
import { shallow } from 'enzyme';

describe('Twitter property', () => {
  let renderer;
  beforeEach(() => {
    renderer = shallow(<TwitterProperty value="twitter" />);
  });
  it('Not null', () => {
    expect(renderer).toBeDefined();
  });
});
