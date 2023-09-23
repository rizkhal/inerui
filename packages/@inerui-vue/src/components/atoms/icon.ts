import { defineComponent, h } from "vue";
import { Icon as Iconify } from "@iconify/vue";

export const Icon = defineComponent({
  props: ["icon", "size"],
  setup({ icon, size }) {
    return () => h("span", {}, h(Iconify, { icon, size }));
  },
});
