import { Icon } from "components/atoms";
import { defineComponent, h } from "vue";

type TColumn = {
  na: boolean;
  blank: boolean;
  sortable: boolean;
  searchable: boolean;
  checkbox: boolean;
  text: string;
  column: string;
};

export default defineComponent({
  props: ["columns", "params"],
  setup(props) {
    const sortIs = (column: any, direction: string): boolean => {
      return (
        column.sortable &&
        props.params.direction == direction &&
        props.params.column == column.column
      );
    };

    const renderSort = (column: any) => {
      if (sortIs(column, "asc")) {
        return h(Icon, { icon: "heroicons:arrow-small-down" });
      } else if (sortIs(column, "desc")) {
        return h(Icon, { icon: "heroicons:arrow-small-down" });
      }

      return null;
    };

    return () =>
      h(
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
                  class: `p-4 bg-slate-200 text-left text-xs font-medium cursor-pointer
                  ${index === 0 ? "rounded-tl-md" : null}
                  ${
                    index === props.columns.length - 1 ? "rounded-tr-md" : null
                  }`,
                },
                h(
                  "div",
                  { class: "inline-flex w-full justify-between items-center" },
                  [h("span", {}, column.text), renderSort(column)]
                )
              );
            }),
          ]),
        ]
      );
  },
});
