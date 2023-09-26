import { InputEvent } from "types/type";
import { defineComponent, h } from "vue";

export const Search = defineComponent({
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const onInput = (event: InputEvent) => {
      emit("update:modelValue", event.target.value);
    };

    return () =>
      h("form", { class: "" }, [
        h("div", { class: "mt-1 relative lg:w-64 xl:w-96" }, [
          h("input", {
            onInput,
            type: "search",
            name: "search",
            id: "search",
            autocomplete: "off",
            placeholder: "Search",
            value: props.modelValue,
            class:
              "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-inerui-600 focus:border-inerui-600 block w-full p-2.5",
          }),
        ]),
      ]);
  },
});
