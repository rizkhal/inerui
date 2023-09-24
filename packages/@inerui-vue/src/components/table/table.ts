import { pickBy } from "lodash";
import { Thead, Tbody, Pagination } from "./atoms";
import { defineComponent, h, reactive, watch } from "vue";

export type TTableProps = {
  inertable: {
    data: any;
    columns: Object;
  };
};

export const Table = defineComponent({
  props: ["inertable"],
  emits: ["onChange"],
  setup({ inertable }: TTableProps, { emit }) {
    watch(
      () => inertable,
      (value) => {
        console.log("props changed", value);
      },
      { deep: true }
    );

    const params = reactive({
      column: inertable.data.filters?.column,
      search: inertable.data.filters?.search,
      direction: inertable.data.filters?.direction,
      perpage: inertable.data.filters?.perpage ?? 15,
      page: inertable.data.current_page,
    });

    const handleOnLoadPageEvent = (page: number) => {
      params.page = page;
    };

    watch(
      () => params,
      function (value: any) {
        const params = pickBy(value);
        emit("onChange", params);
      },
      { deep: true }
    );

    return () => {
      return h("div", { class: "w-full relative overflow-x-auto" }, [
        h(
          "table",
          {
            class:
              "w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
          },
          [
            h(Thead, { columns: inertable.columns }),
            h(Tbody, {
              data: inertable.data.data,
              columns: inertable.columns,
            }),
          ]
        ),
        h(Pagination, {
          onLoadPage: handleOnLoadPageEvent,
          total: inertable.data.total,
          last: inertable.data.last_page,
          current: inertable.data.current_page,
          from: inertable.data.from,
          to: inertable.data.to,
        }),
      ]);
    };
  },
});
