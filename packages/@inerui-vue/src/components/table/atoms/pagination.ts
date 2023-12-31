import { Icon } from "components/atoms";
import { computed, defineComponent, h, ref, watch } from "vue";

export type TPaginationProps = {
  total: number;
  last: number;
  current: number;
  from: number;
  to: number;
};

export default defineComponent({
  props: ["total", "last", "current", "from", "to"],
  emits: ["loadPage"],
  setup(props: TPaginationProps, { emit }) {
    const page = ref<number>(props.current);

    const noPreviousPage = computed(() => props.current - 1 <= 0);
    const noNextPage = computed(() => props.current + 1 > props.last);

    watch(
      () => props.current,
      (value: number) => {
        page.value = value;
      }
    );

    return () => {
      return h(
        "div",
        {
          class:
            "border border-x-transparent rounded-bl-md rounded-br-md bg-white sm:flex items-center w-full sm:justify-between border-t border-gray-200 p-4",
        },
        [
          h("div", { class: "flex items-center mb-4 sm:mb-0" }, [
            h("div", { class: "text-sm font-normal text-gray-500" }, [
              h("p", { class: "inline-flex space-x-2" }, [
                h("span", "Baris"),
                h("span", { class: "text-gray-900 font-semibold" }, props.from),
                h("span", "ke"),
                h("span", { class: "text-gray-900 font-semibold" }, props.to),
                h("span", "dari"),
                h(
                  "span",
                  { class: "text-gray-900 font-semibold" },
                  props.total
                ),
              ]),
            ]),
          ]),
          h("div", { class: "flex items-center space-x-3" }, [
            h(
              "button",
              {
                disabled: noPreviousPage.value,
                onClick: () => emit("loadPage", 1),
                class: `inline-flex justify-center items-center p-2.5 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:text-sm focus:ring-1 focus:ring-inerui-600 focus:border-inerui-600 ${
                  noPreviousPage.value ? "opacity-50 cursor-not-allowed" : null
                }`,
              },
              [h(Icon, { icon: "heroicons:chevron-double-left" })]
            ),
            h(
              "button",
              {
                disabled: noPreviousPage.value,
                onClick: () => emit("loadPage", props.current - 1),
                class: `inline-flex justify-center items-center p-2.5 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:text-sm focus:ring-1 focus:ring-inerui-600 focus:border-inerui-600 ${
                  noPreviousPage.value ? "opacity-50 cursor-not-allowed" : null
                }`,
              },
              [h(Icon, { icon: "heroicons:chevron-left" })]
            ),
            h("div", { class: "flex flex-row items-center" }, [
              // TODO: handle loadPage event for page change using input
              // h("input", {
              //   min: 1,
              //   max: props.last,
              //   type: "number",
              //   value: page.value,
              //   onInput: () => emit("loadPage", page),
              //   class:
              //     "bg-gray-50 mr-2 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-[4rem] p-2.5",
              // }),
              h("div", { class: "text-sm font-normal text-gray-500 mx-1" }, [
                h("p", { class: "inline-flex space-x-2" }, [
                  h("span", "Halaman"),
                  h(
                    "span",
                    { class: "text-gray-900 font-semibold" },
                    page.value
                  ),
                  h("span", "dari"),
                  h(
                    "span",
                    { class: "text-gray-900 font-semibold" },
                    props.last
                  ),
                ]),
              ]),
            ]),
            h(
              "button",
              {
                disabled: noNextPage.value,
                onClick: () => emit("loadPage", props.current + 1),
                class: `inline-flex justify-center items-center p-2.5 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:text-sm focus:ring-1 focus:ring-inerui-600 focus:border-inerui-600 ${
                  noNextPage.value ? "opacity-50 cursor-not-allowed" : null
                }`,
              },
              [h(Icon, { icon: "heroicons:chevron-right" })]
            ),
            h(
              "button",
              {
                disabled: noNextPage.value,
                onClick: () => emit("loadPage", props.last),
                class: `inline-flex justify-center items-center p-2.5 text-gray-700 bg-white rounded border border-gray-200 shadow-sm outline-none hover:bg-gray-50 lg:text-sm focus:ring-1 focus:ring-inerui-600 focus:border-inerui-600 ${
                  noNextPage.value ? "opacity-50 cursor-not-allowed" : null
                }`,
              },
              [h(Icon, { icon: "heroicons:chevron-double-right" })]
            ),
          ]),
        ]
      );
    };
  },
});
