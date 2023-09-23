import { defineComponent, h } from "vue";

export default defineComponent({
  props: ["data", "columns"],
  setup({ data, columns }, { slots }) {
    return () =>
      h(
        "tbody",
        {
          class:
            "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
        },
        [
          data.map((item: any, i: number) => {
            return h(
              "tr",
              {
                key: i.toString(),
                class:
                  "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
              },
              [
                columns.map((column: any, i: number) => {
                  return h(
                    "td",
                    {
                      key: i.toString(),
                      scope: "col",
                      class: "px-6 py-3 text-red-500",
                    },
                    h("button", {}, item[column.column])
                  );
                }),
              ]
            );
          }),
        ]
      );
  },
});
