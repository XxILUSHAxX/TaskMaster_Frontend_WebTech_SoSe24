import { mount } from '@vue/test-utils';
import ColumnTable from '../src/components/ColumnTable.vue';

describe('ColumnTable.vue', () => {
    it('renders props.title when passed', () => {
        const title = 'To-Do';
        const wrapper = mount(ColumnTable, {
            props: { title, items: [] },
        });
        expect(wrapper.find('h2').text()).toBe(title);
    });

    it('emits add-item event when adding new item', async () => {
        const wrapper = mount(ColumnTable, {
            props: { title: 'To-Do', items: [] },
        });
        const input = wrapper.find('input.add-input');
        await input.setValue('New Task');
        await input.trigger('keyup.enter');
        expect(wrapper.emitted('add-item')[0][0]).toBe('New Task');
    });
});