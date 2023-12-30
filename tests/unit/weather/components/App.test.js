import App from '@/App.vue';
import { mount } from '@vue/test-utils';
import { describe } from "vitest";
import { expect, beforeEach } from "vitest";

describe("App.vue", () => {
    const wrapper = mount(App);

    it("should display the current day's date", () => {
        const formattedDate = new Date().toDateString();
        expect(wrapper.html()).contain(formattedDate);
    });
});