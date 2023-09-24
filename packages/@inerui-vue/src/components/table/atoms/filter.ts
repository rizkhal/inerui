import { defineComponent, h } from "vue";
import { Search } from "src/components/search";

export default defineComponent({
  setup() {
    return () => {
      return h(
        "div",
        { class: "w-full inline-flex items-center justify-between py-4" },
        [
          h("div", {}, "ini span"),
          h("div", {}, h(Search)),
          //
        ]
      );
    };
  },
});
