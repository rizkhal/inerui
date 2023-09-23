import { Icon } from "../atoms";
import { defineComponent, h } from "vue";

type TMenu = {
  path: string;
  text: string;
  icon: string;
};

type TMenuItem = TMenu & {
  childrens: Array<TMenu>;
};

const Header = defineComponent({
  setup() {
    return () =>
      h(
        "div",
        {
          class:
            "sticky top-0 z-10 w-full bg-slate-100 dark:bg-slate-900 inline-flex items-center justify-between p-4 border-b dark:border-b-slate-800",
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

export const Sidebar = defineComponent({
  props: ["menus", "onClick"],
  setup({ menus, onClick: onNavigate }) {
    return () =>
      h("div", { class: "w-64 sticky top-0" }, [
        h(
          "div",
          {
            class:
              "w-full flex flex-col h-screen overflow-y-auto space-y-4 divide-y dark:divide-slate-800 divide-slate-200 p-4",
          },
          [
            h("div", { class: "flex flex-col space-y-1" }, [
              menus.map(
                ({ text, path, icon, childrens }: TMenuItem, index: number) => {
                  if (childrens && childrens.length) {
                    return h(
                      "div",
                      {
                        key: index.toString(),
                        class: "relative",
                      },
                      [
                        h(
                          "button",
                          {
                            class:
                              "relative dark:text-white text-slate-700 transition hover:bg-slate-200 dark:hover:bg-slate-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2",
                          },
                          [
                            h(Icon, { icon }),
                            h("span", { class: "text-sm" }, text),
                            h(Icon, {
                              icon: "heroicons:chevron-up-down",
                              class: "absolute right-2.5",
                            }),
                          ]
                        ),
                        h(
                          "div",
                          {
                            class: "",
                          },
                          [
                            h("div", { class: "ml-5 border-l" }, [
                              childrens.map(({ text }) => {
                                return h(
                                  "button",
                                  {
                                    class:
                                      "group dark:text-white text-slate-700 transition hover:text-slate-400 dark:hover:text-slate-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2",
                                  },
                                  [
                                    h("span", { class: "text-sm" }, text),
                                    h("div", {
                                      class:
                                        "w-2 h-2 group-hover:bg-emerald-500 absolute left-[9px] mt-0.5 rounded-full bg-gray-600 border border-gray-100",
                                    }),
                                  ]
                                );
                              }),
                            ]),
                          ]
                        ),
                      ]
                    );
                  }

                  return h(
                    "button",
                    {
                      key: index.toString(),
                      onClick: () => onNavigate(path),
                      class:
                        "dark:text-white text-slate-700 transition hover:bg-slate-200 dark:hover:bg-slate-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2",
                    },
                    [h(Icon, { icon }), [h("span", { class: "text-sm" }, text)]]
                  );
                }
              ),
            ]),
          ]
        ),
      ]);
  },
});

export const Layout = defineComponent({
  props: ["menus"],
  emits: ["onNavigate"],
  setup({ menus }, { slots, emit }) {
    return () => [
      h("div", { class: "w-full min-h-scree relative" }, [
        h("div", { class: "inline-flex w-full" }, [
          h(
            "div",
            {
              class:
                "hidden md:block flex flex-row bg-slate-100 dark:bg-slate-900 border-r border-r-slate-200 dark:border-slate-800",
            },
            h(Sidebar, {
              menus: menus,
              onClick: (path: string) => emit("onNavigate", path),
            })
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
