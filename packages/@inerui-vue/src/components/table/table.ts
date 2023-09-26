import { debounce, pickBy } from "lodash";
import { Thead, Tbody, Pagination } from "./atoms";
import { defineComponent, h, reactive, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import { Search } from "components/search";
import { wait } from "../../utils";

export type TTableProps = {
  inertable: {
    data: any;
    filters: any;
    columns: Object;
  };
};

export const Table = defineComponent({
  props: ["inertable"],
  emits: ["change"],
  setup(props: TTableProps, { slots, emit }) {
    const loading = ref<boolean>(false);

    router.on("success", () => {
      loading.value = false;
    });

    const params = reactive({
      page: props.inertable.data.current_page,
      // filters
      column: props.inertable.filters?.column,
      direction: props.inertable.filters?.direction,
      search: props.inertable.filters?.search ?? null,
      perpage: props.inertable.filters?.perpage ?? 15,
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
              emit("change", pickBy(value));
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
          h(
            "div",
            {
              class:
                "py-4 mb-3 w-full inline-flex items-center justify-between",
            },
            [
              h(Search, {
                modelValue: params.search,
                "onUpdate:modelValue": (value) => {
                  params.search = value;
                },
              }),
            ]
          ),
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
