import { defineComponent, h } from "vue";
import { Thead, Tbody } from "./atoms";

export const Table = defineComponent({
    props: ["inertable"],
    setup({ inertable }) {
        // console.log(inertable);

        return () =>
            h("div", { class: "w-full relative overflow-x-auto" }, [
                h(
                    "table",
                    {
                        class: "w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
                    },
                    [
                        h(Thead, { columns: inertable.columns }),
                        h(Tbody, {
                            data: inertable.data.data,
                            columns: inertable.columns,
                        }),
                    ]
                ),
            ]);
    },
});
