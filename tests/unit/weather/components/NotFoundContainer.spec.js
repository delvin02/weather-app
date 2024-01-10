import NotFoundContainer from '@/components/NotFoundContainer.vue';
import { shallowMount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect  } from "vitest";

describe('NotFoundContainer', () => {
    it('displays the 404 message', () => {
        const wrapper = shallowMount(NotFoundContainer, {
            global: {
                mocks: {
                    $route: {
                        query: {}
                    }
                }
            }
        });

        expect(wrapper.text()).toContain("Zap, 404!");
    });

    it('displays an error message when provided in route query', () => {
        const errorMessage = 'Test Error Message';
        const wrapper = shallowMount(NotFoundContainer, {
            global: {
                mocks: {
                    $route: {
                        query: { error: errorMessage }
                    }
                }
            }
        });

        expect(wrapper.text()).toContain(errorMessage);
    });

    it('does not display an error message when not provided in route query', () => {
        const wrapper = shallowMount(NotFoundContainer, {
            global: {
                mocks: {
                    $route: {
                        query: {}
                    }
                }
            }
        });
        expect(wrapper.find('p').exists()).toBe(false);
    });
});