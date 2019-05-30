import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';
describe('mount main', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Main debug />);

        expect(component).toMatchSnapshot();
    });
});
