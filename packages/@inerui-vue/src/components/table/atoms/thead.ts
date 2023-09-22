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
    props: ["columns"],
    setup({ columns }) {
        return () =>
            h(
                "thead",
                {
                    class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
                },
                [
                    h("tr", [
                        columns.map((column: TColumn, index: number) => {
                            return h(
                                "th",
                                {
                                    key: index.toString(),
                                    scope: "col",
                                    class: "p-4 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer",
                                },
                                column.text
                            );
                        }),
                    ]),
                ]
            );
    },
});
