import { defineComponent, h } from "vue";
import { Link } from "@inertiajs/vue3";
import { Icon } from "../atoms";

type TMenuItem = {
    to: string;
    text: string;
    icon: string;
};

export const Sidebar = defineComponent({
    props: ["menus"],
    setup({ menus }) {
        return () =>
            h("div", { class: "w-64 sticky top-0" }, [
                h(
                    "div",
                    {
                        class: "w-full flex flex-col h-screen overflow-y-auto space-y-4 divide-y dark:divide-slate-800 divide-slate-200 p-4",
                    },
                    [
                        h("div", { class: "flex flex-col space-y-1" }, [
                            menus.map(
                                (
                                    { text, to, icon }: TMenuItem,
                                    index: number
                                ) => {
                                    return h(
                                        Link,
                                        {
                                            href: to,
                                            key: index.toString(),
                                            class: "dark:text-white text-slate-700 transition hover:bg-slate-200 dark:hover:bg-slate-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2",
                                        },
                                        [
                                            h(Icon, { icon }),
                                            [
                                                h(
                                                    "span",
                                                    { class: "text-sm" },
                                                    text
                                                ),
                                            ],
                                        ]
                                    );
                                }
                            ),
                        ]),
                    ]
                ),
            ]);
    },
});

const Header = defineComponent({
    setup() {
        return () =>
            h(
                "div",
                {
                    class: "w-full bg-slate-100 dark:bg-slate-900 inline-flex items-center justify-between p-4 border-b dark:border-b-slate-800",
                },
                [
                    [
                        h("div", "left"),
                        h("button", { class: "" }, [
                            h("img", {
                                src: "https://avatars.githubusercontent.com/u/24653114?v=4",
                                class: "w-10 h-10 rounded-full",
                            }),
                        ]),
                    ],
                ]
            );
    },
});

export const Layout = defineComponent({
    props: ["menus"],
    setup({ menus }, { slots }) {
        return () => [
            h("div", { class: "w-full min-h-scree relative" }, [
                h("div", { class: "inline-flex w-full" }, [
                    h(
                        "div",
                        {
                            class: "hidden md:block flex flex-row bg-slate-100 dark:bg-slate-900 border-r border-r-slate-200 dark:border-slate-800",
                        },
                        h(Sidebar, { menus })
                    ),
                    h(
                        "div",
                        {
                            class: "flex w-full flex-1",
                        },
                        [
                            h("div", { class: "flex flex-col w-full" }, [
                                h(Header),
                                h(
                                    "div",
                                    {
                                        class: "p-4 w-full dark:bg-slate-900 h-full",
                                    },
                                    slots.default?.()
                                ),
                            ]),
                        ]
                    ),
                ]),
            ]),
        ];
    },
});
