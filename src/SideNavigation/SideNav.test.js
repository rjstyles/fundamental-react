import { mount } from 'enzyme';
import React from 'react';
import { SideNav } from '../';

describe('<SideNav />', () => {
    const subSideNavList = (
        <SideNav.List>
            <SideNav.ListItem
                id='item_1'
                name='Link Item 1'
                url='#' />
            <SideNav.ListItem
                id='item_2'
                name='Link Item 2'
                url='#'>
                <SideNav.List>
                    <SideNav.ListItem
                        id='subitem_21'
                        name='Item 1'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_22'
                        name='Item 2'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_23'
                        name='Item 3'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_24'
                        name='Item 4'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_25'
                        name='Item 5'
                        url='#' />
                </SideNav.List>
            </SideNav.ListItem>
            <SideNav.ListItem
                id='item_3'
                name='Link Item 3'
                url='#' />
            <SideNav.ListItem
                id='item_4'
                name='Link Item 4'
                url='#'>
                <SideNav.List>
                    <SideNav.ListItem
                        id='subitem_41'
                        name='Item 1'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_41'
                        name='Item 2'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_41'
                        name='Item 3'
                        url='#' />
                    <SideNav.ListItem
                        id='subitem_41'
                        name='Item 4'
                        url='#' />
                </SideNav.List>
            </SideNav.ListItem>
            <SideNav.ListItem
                id='item_5'
                name='Link Item'
                url='#' />
        </SideNav.List>
    );

    const sideNavMultiLevel = <SideNav>{subSideNavList}</SideNav>;


    test('handle side nav list link click', () => {
        const wrapper = mount(sideNavMultiLevel);
        const Item2 = wrapper.find({ 'id': 'item_2' });
        const Item4 = wrapper.find({ 'id': 'item_4' });

        expect(Item2.state('expanded')).toBeFalsy();
        expect(Item4.state('expanded')).toBeFalsy();
        expect(wrapper.state('selectedId')).toBeFalsy();

        wrapper
            .find('.has-child')
            .at(0)
            .simulate('click');

        expect(Item2.state('expanded')).toBeTruthy();
        expect(Item4.state('expanded')).toBeFalsy();

        wrapper
            .find('.has-child')
            .at(1)
            .simulate('click');

        expect(Item2.state('expanded')).toBeTruthy();
        expect(Item4.state('expanded')).toBeTruthy();
    });

    test('handle side nav sub link click', () => {
        const wrapper = mount(sideNavMultiLevel);
        wrapper
            .find('.fd-nested-list__link')
            .at(2)
            .simulate('click');

        expect(wrapper.state('selectedId')).toEqual('subitem_21');

        wrapper
            .find('.fd-nested-list__link')
            .at(6)
            .simulate('click');

        expect(wrapper.state('selectedId')).toEqual('subitem_25');
    });

    describe('Prop spreading', () => {
        test('should allow props to be spread to the SideNav component', () => {
            const element = mount(<SideNav data-sample='Sample' />);

            expect(
                element.getDOMNode().attributes['data-sample'].value
            ).toBe('Sample');
        });
    });

    describe('onItemSelect handler', () => {
        test('should dispatch the onItemSelect callback with the event', () => {
            let f = jest.fn();
            const mockedEvent = { target: {} };

            const element = mount(<SideNav data-sample='Sample' onItemSelect={f}>
                <SideNav.List>
                    <SideNav.ListItem
                        id='item-1'
                        name='Link Item 1'
                        url='#' />
                </SideNav.List>
            </SideNav>);

            element.find('#item-1 a').simulate('click', mockedEvent);

            expect(f).toHaveBeenCalledTimes(1);
            expect(f).toHaveBeenCalledWith(expect.objectContaining({ 'target': {} }), 'item-1');
        });
    });
});
