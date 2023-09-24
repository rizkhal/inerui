import { defineComponent, h } from "vue";

export default defineComponent({
  props: ["data", "columns"],
  setup({ data, columns }) {
    return () =>
      h(
        "tbody",
        {
          class: "text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
        },
        [
          data.map((item: any, i: number) => {
            return h(
              "tr",
              {
                key: i.toString(),
                class:
                  "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-200 transition-all",
              },
              [
                columns.map((column: any, i: number) => {
                  return h(
                    "td",
                    {
                      key: i.toString(),
                      scope: "col",
                      class: "p-3 text-slate-700",
                    },
                    h("span", { class: "text-xs" }, item[column.column])
                  );
                }),
              ]
            );
          }),
        ]
      );
  },
});
