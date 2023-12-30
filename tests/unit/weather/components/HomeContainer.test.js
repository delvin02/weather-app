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
            '<h1 class="text-xl">Pick a city below to see the weather!</h1>'
        );
    });
});