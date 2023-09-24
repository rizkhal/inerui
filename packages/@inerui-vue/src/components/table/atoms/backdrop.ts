import { defineComponent, h } from "vue";

export default defineComponent({
  setup() {
    return () =>
      h(
        "div",
        {
          class:
            "flex flex-col justify-center items-center bg-slate-100/90 absolute z-50 w-full h-full",
        },
        [h("div", { class: "" }, ["Loading.."])]
      );
  },
});
