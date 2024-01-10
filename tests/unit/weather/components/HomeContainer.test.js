import HomeContainer from '@/components/HomeContainer.vue'; 
import { shallowMount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect, test, beforeAll, afterAll } from "vitest";

describe("HomeContainer.vue", () => {
    it("should display the appropriate index message", () => {
        const wrapper = shallowMount(HomeContainer);
        expect(
            wrapper.html()
        ).contain(
            '<h1 class="font-bold uppercase text-apple-600 text-2xl leading-relaxed p-4 bg-apple-100">Click the search icon below to see the weather!</h1>'
        );
    });
});