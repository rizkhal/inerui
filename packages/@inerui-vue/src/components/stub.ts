import { defineComponent, h } from "vue";

export const Stub = defineComponent({
  setup() {
    return () =>
      h("span", { class: "" }, [
        //
      ]);
  },
});
