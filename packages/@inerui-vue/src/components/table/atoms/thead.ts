import { Icon as Iconify } from "@iconify/vue";
import { defineComponent, h } from "vue";

export type TColumn = {
  na: boolean;
  blank: boolean;
  sortable: boolean;
  searchable: boolean;
  checkbox: boolean;
  text: string;
  column: string;
};

export default defineComponent({
  name: "Thead",
  props: ["columns", "params"],
  emits: ["sort"],
  setup(props, { emit }) {
    const handleOnSort = ({ column }: any) => {
      emit("sort", column);
    };

    return () => {
      //

      return h(
        "thead",
        {
          class: "",
        },
        [
          h("tr", [
            props.columns.map((column: TColumn, index: number) => {
              return h(
                "th",
                {
                  scope: "col",
                  key: index.toString(),
                  onClick: () => handleOnSort(column),
                  class: `p-4 bg-slate-200 text-left text-xs font-medium cursor-pointer
                  ${index === 0 ? "rounded-tl-md" : null}
                  ${
                    index === props.columns.length - 1 ? "rounded-tr-md" : null
                  }`,
                },
                h(
                  "div",
                  { class: "inline-flex w-full space-x-4 items-center" },
                  [
                    h("span", {}, column.text),
                    column.sortable &&
                    props.params.column === column.column &&
                    props.params.direction === "asc"
                      ? h(
                          "span",
                          {},
                          h(Iconify, { icon: "heroicons:arrow-small-down" })
                        )
                      : null,
                    column.sortable &&
                    props.params.column === column.column &&
                    props.params.direction === "desc"
                      ? h(
                          "span",
                          {},
                          h(Iconify, { icon: "heroicons:arrow-small-up" })
                        )
                      : null,
                  ]
                )
              );
            }),
          ]),
        ]
      );
    };
  },
});
