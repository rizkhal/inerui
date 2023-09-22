import { InputEvent } from "types/i";
import { defineComponent, h } from "vue";

export const Search = defineComponent({
  setup(props, { emit }) {
    const onInput = (event: InputEvent) => {
      emit("update:modelValue", event.target.value);
    };

    return () =>
      h("form", { class: "lg:pr-3" }, [
        h("div", { class: "mt-1 relative lg:w-64 xl:w-96" }, [
          h("input", {
            onInput,
            type: "search",
            name: "email",
            id: "search",
            autocomplete: "off",
            placeholder: "Search",
            value: props.modelValue,
            class:
              "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5",
          }),
        ]),
      ]);
  },
  props: {
    modelValue: String,
  },
});
