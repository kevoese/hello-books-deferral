import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jsdom-global/register';
import InputForm from './index';
const errors = {
    test: 'this is a test'
};
const touched = {
    test: 'this is a test'
};

describe('input Form component', () => {
    it('should render the input-form with a span when errors are available', () => {
        const component = shallow(
            <InputForm errors={errors} touched={touched} name="test" />
        );
        expect(component).toMatchSnapshot();
    });

    it('should render the input-form without a span when errors are not available', () => {
        const component = shallow(
            <InputForm errors={{}} touched={{}} name="test" />
        );

        expect(component).toMatchSnapshot();
    });

    it('should render the input-form with a textarea and not an input when inputtype is textarea', () => {
        const component = shallow(
            <InputForm
                errors={{}}
                touched={{}}
                inputtype="textarea"
                name="password"
            />
        );
        expect(component).toMatchSnapshot();
    });
    it('should render the input-form with a select and not an input when inputtype is select', () => {
        const component = shallow(
            <InputForm
                errors={{}}
                touched={{}}
                inputtype="select"
                name="password"
            />
        );
        expect(component).toMatchSnapshot();
    });
    it('should render the input and label in flex col when block props is true', () => {
        const component = shallow(
            <InputForm
                block={'true'}
                errors={{}}
                touched={{}}
                inputtype="select"
                name="password"
            />
        );
        expect(component).toMatchSnapshot();
    });
    it('testing mount', () => {
        const component = mount(
            <InputForm
                errors={{}}
                touched={{}}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
                name="password"
            />
        );
        expect(component).toMatchSnapshot();
    });
});
