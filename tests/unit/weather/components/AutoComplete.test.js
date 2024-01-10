import AutoComplete from '@/components/AutoComplete.vue';
import { shallowMount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect, test, beforeAll, afterAll } from "vitest";

describe("AutoComplete.vue", () => {
    it('initializes options correctly', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(AutoComplete, {
                global: {
                    components: {
                        VueMultiselect
                    }
                }
            });
        })

        expect(wrapper.vm.options).toHaveLength(10);
    });
});