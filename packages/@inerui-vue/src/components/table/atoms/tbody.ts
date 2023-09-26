import { defineComponent, h } from "vue";
import Backdrop from "./backdrop";

export default defineComponent({
  props: ["loading", "data", "columns"],
  setup(props, { slots }) {
    return () => {
      return h("tbody", {}, [
        props.loading && h(Backdrop),
        props.data.map((item: any, i: number) => {
          return h(
            "tr",
            {
              key: i.toString(),
              class: "bg-white hover:bg-slate-200 transition-all border-b",
            },
            [
              props.columns.map((column: any, i: number) => {
                return h(
                  "td",
                  {
                    key: i.toString(),
                    scope: "col",
                    class: "p-3 text-slate-700",
                  },
                  slots[column.column]
                    ? slots[column.column]?.({ row: item })
                    : item[column.column]
                );
              }),
            ]
          );
        }),
      ]);
    };
  },
});
