import NotFoundContainer from '@/components/NotFoundContainer.vue';
import { shallowMount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect  } from "vitest";

describe("NotFoundContainer.vue", () => {
    it('should display the appropriate not found message', () => {
        const wrapper = shallowMount(NotFoundContainer);
        expect(
            wrapper.html()
        ).contain(
            '<h1 class="text-xl">Pick a city below to see the weather!</h1>'
        );
    });
});