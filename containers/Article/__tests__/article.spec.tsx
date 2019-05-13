import * as React from 'react';
import { mount } from 'enzyme';
import Article from '../Article';

describe('Containers', () => {
  describe('Article', () => {
    it('should render without throwing an error', function () {
      const wrap = mount(<Article/>)
      expect(wrap.find('a').text()).toBe('Click here')
    })
  })
})
