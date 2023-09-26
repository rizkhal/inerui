import { Icon } from "@iconify/vue";
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
      h("div", { class: "relative" }, [
        h(
          "div",
          {
            class:
              "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
          },
          [
            h(Icon, {
              icon: "tabler:search",
              width: 19,
              class: "text-slate-500",
            }),
          ]
        ),
        h("input", {
          onInput,
          type: "search",
          name: "search",
          id: "search",
          autocomplete: "off",
          placeholder: "Search",
          value: props.modelValue,
          class:
            "text-sm pl-[35px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-inerui-600 focus:border-inerui-600 block w-full p-2.5",
        }),
      ]);
  },
});

// <div class="relative">
//   <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//       <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
//   </div>
//   <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
// </div>
