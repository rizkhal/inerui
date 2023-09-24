import { debounce, pickBy } from "lodash";
import { Thead, Tbody, Pagination } from "./atoms";
import { defineComponent, h, reactive, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import { Search } from "components/search";

export type TTableProps = {
  inertable: {
    data: any;
    columns: Object;
  };
};

export const Table = defineComponent({
  props: ["inertable"],
  emits: ["onChange"],
  setup(props: TTableProps, { emit }) {
    const loading = ref<boolean>(false);

    router.on("success", () => {
      loading.value = false;
    });

    const params = reactive({
      column: props.inertable.data.filters?.column,
      search: props.inertable.data.filters?.search,
      direction: props.inertable.data.filters?.direction,
      perpage: props.inertable.data.filters?.perpage ?? 15,
      page: props.inertable.data.current_page,
    });

    const handleOnLoadPageEvent = (page: number) => {
      params.page = page;
    };

    watch(
      () => params,
      (value) => {
        loading.value = true;
        debounce(() => {
          emit("onChange", pickBy(value));
        }, 300)();
      },
      { deep: true }
    );

    return () => {
      return h("div", { class: "w-full relative overflow-hidden" }, [
        h("div", { class: "w-full relative overflow-hidden" }, [
          h(
            "div",
            {
              class:
                "py-4 mb-3 w-full inline-flex items-center justify-between",
            },
            [h(Search), h(Search)]
          ),
          h(
            "table",
            {
              class: "w-full relative h-full overflow-hidden",
            },
            [
              h(Thead, {
                params: params,
                columns: props.inertable.columns,
              }),
              h(Tbody, {
                loading: loading.value,
                data: props.inertable.data.data,
                columns: props.inertable.columns,
              }),
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
