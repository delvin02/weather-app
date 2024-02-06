import AutoComplete from '@/components/AutoComplete.vue';
import VueMultiselect from 'vue-multiselect';
import { shallowMount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect } from "vitest";

describe("AutoComplete.vue", () => {
    it('initializes options correctly', () => {
        let wrapper = shallowMount(AutoComplete, {
                global: {
                    components: {
                        VueMultiselect
                    }
                }
            });
        expect(wrapper.vm.options).toHaveLength(10);
    });
});