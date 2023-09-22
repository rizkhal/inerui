import { defineComponent, h } from "vue";
import { Icon as Iconify } from "@iconify/vue";

export const Icon = defineComponent({
    props: ["icon"],
    setup({ icon }) {
        return () => h("span", { class: "" }, [h(Iconify, { icon: icon })]);
    },
});
