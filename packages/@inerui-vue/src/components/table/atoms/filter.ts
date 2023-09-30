import { defineComponent, h } from "vue";
import { Search } from "./search";
import { Pills } from "./filters";

export type TFilterAttributes = {
  [key: string]: string | boolean;
};

export type TFilter = {
  type: string;
  attributes: Array<TFilterAttributes>;
};

export default defineComponent({
  props: ["params", "fields"],
  setup(props) {
    return () => {
      return h(
        "div",
        {
          class: "py-2 w-full inline-flex items-center justify-between",
        },
        [
          h("div", {}, [h(Pills, { ...props })]),
          h(Search, {
            modelValue: props.params.search,
            "onUpdate:modelValue": (value) => {
              props.params.search = value;
            },
          }),
        ]
      );
    };
  },
});
