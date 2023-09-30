import { debounce, pickBy } from "lodash";
import { Thead, Tbody, Pagination, Filter } from "./atoms";
import { defineComponent, h, reactive, ref, watch } from "vue";
import { router as InertiaRouter } from "@inertiajs/vue3";
import { wait } from "../../utils";

export type TTableProps = {
  inertable: {
    data: any;
    fields: any;
    filters: any;
    columns: Object;
  };
};

export const Table = defineComponent({
  props: ["inertable"],
  emits: ["change"],
  setup(props: TTableProps, { slots, emit }) {
    const loading = ref<boolean>(false);

    InertiaRouter.on("success", () => {
      loading.value = false;
    });

    const params = reactive({
      page: props.inertable.data.current_page,
      // filters
      column: props.inertable.filters?.column,
      direction: props.inertable.filters?.direction,
      search: props.inertable.filters?.search ?? null,
      perpage: props.inertable.filters?.perpage ?? 15,
      filters: props.inertable.filters.filters
        ? Object.keys(props.inertable.filters.filters).reduce(
            (ac, a) => ({ ...ac, [a]: props.inertable.filters.filters[a] }),
            {}
          )
        : null,
    });

    const handleOnLoadPageEvent = (page: number) => {
      params.page = page;
    };

    const handleOnSort = (column: string) => {
      params.column = column;
      params.direction = params.direction === "asc" ? "desc" : "asc";
    };

    watch(
      () => params,
      (value) => {
        wait(200)
          .then(() => {
            loading.value = true;
          })
          .then(
            debounce(() => {
              InertiaRouter.get(window.location.pathname, pickBy(value), {
                preserveState: true,
                replace: true,
              });
            }, 700)
          );
      },
      { deep: true }
    );

    const mappedSlots: any = {};
    for (const key in slots) {
      if (typeof slots[key] === "function") {
        mappedSlots[key] = slots[key];
      }
    }

    return () => {
      return h("div", { class: "w-full relative overflow-hidden" }, [
        h("div", { class: "w-full relative overflow-hidden" }, [
          h(Filter, {
            params,
            fields: props.inertable.fields ?? [],
          }),
          h(
            "table",
            {
              class: "w-full relative h-full overflow-hidden",
            },
            [
              h(Thead, {
                params,
                onSort: handleOnSort,
                columns: props.inertable.columns,
              }),
              h(
                Tbody,
                {
                  loading: loading.value,
                  data: props.inertable.data.data,
                  columns: props.inertable.columns,
                },
                {
                  ...mappedSlots,
                }
              ),
            ]
          ),
        ]),
        h(Pagination, {
          onLoadPage: handleOnLoadPageEvent,
          total: props.inertable.data.total,
          last: props.inertable.data.last_page,
          current: props.inertable.data.current_page,
          from: props.inertable.data.from,
          to: props.inertable.data.to,
        }),
      ]);
    };
  },
});
