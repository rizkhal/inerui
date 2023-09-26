import route from "ziggy-js";
import { Icon } from "../atoms";
import { router } from "@inertiajs/vue3";
import { Transition, defineComponent, h, ref } from "vue";

type TMenu = {
  path: string;
  text: string;
  icon: string;
};

type TMenuItem = TMenu & {
  childrens?: Array<TMenu>;
};

const Header = defineComponent({
  setup() {
    return () => {
      return h(
        "div",
        {
          class:
            "sticky top-0 z-10 w-full bg-slate-100 dark:bg-slate-900 inline-flex items-center justify-end p-4 border-b dark:border-b-slate-800",
        },
        [
          [
            // h("div", "left"),
            h("button", { class: "" }, [
              h("img", {
                src: "https://avatars.githubusercontent.com/u/24653114?v=4",
                class: "w-10 h-10 rounded-full",
              }),
            ]),
          ],
        ]
      );
    };
  },
});

export const Sidebar = defineComponent({
  props: ["menus", "onClick"],
  setup({ menus, onClick: onNavigate }) {
    const isOpen = ref<any>([]);

    router.on("navigate", () => {
      menus.map(({ childrens }: TMenuItem, index: number) => {
        if (childrens) {
          isOpen.value[index] = childrens.filter(
            ({ path: p }) => route().current() === p
          ).length
            ? true
            : false;
        }
      });
    });

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
                        class: `relative overflow-hidden`,
                      },
                      [
                        h(
                          "button",
                          {
                            onClick: () =>
                              (isOpen.value[index] = !isOpen.value[index]),
                            class: `relative dark:text-white text-slate-700 transition hover:bg-slate-200 dark:hover:bg-slate-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2 ${
                              childrens.filter(
                                ({ path: p }) => route().current() === p
                              ).length
                                ? "bg-slate-200"
                                : null
                            }`,
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
                        h(Transition, { mode: "in-out" }, [
                          h(
                            "div",
                            {
                              class: `relative transition-all duration-500 ${
                                isOpen.value[index] ? "h-max" : "h-0"
                              }`,
                            },
                            [
                              h(
                                "div",
                                {
                                  class: "ml-5 border-l",
                                },
                                [
                                  childrens.map(({ text, path }) => {
                                    return h(
                                      "button",
                                      {
                                        onClick: () => onNavigate(path),
                                        class: `group dark:text-white transition hover:text-inerui-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2 ${
                                          route().has(path) &&
                                          route().current(path)
                                            ? "text-inerui-600"
                                            : "text-slate-600"
                                        }`,
                                      },
                                      [
                                        h("span", { class: "text-sm" }, text),
                                        h("div", {
                                          class: `w-2.5 h-2.5 group-hover:bg-inerui-600 absolute left-[8px] mt-0.5 rounded-full border border-gray-100 ${
                                            route().has(path) &&
                                            route().current(path)
                                              ? "bg-inerui-600"
                                              : "bg-slate-300"
                                          }`,
                                        }),
                                      ]
                                    );
                                  }),
                                ]
                              ),
                            ]
                          ),
                        ]),
                      ]
                    );
                  }

                  return h(
                    "button",
                    {
                      key: index.toString(),
                      onClick: () => onNavigate(path),
                      class: `dark:text-white text-slate-700 transition hover:bg-slate-200 dark:hover:bg-slate-600 py-2 px-3 rounded-md w-full inline-flex items-center space-x-2 ${
                        route().has(path) && route().current() === path
                          ? "bg-slate-200"
                          : null
                      }`,
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
    return () => {
      return h("div", { class: "w-full min-h-scree relative" }, [
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
                // h(Header),
                h(
                  "div",
                  {
                    class: "p-4 w-full dark:bg-slate-900 h-full",
                  },
                  [slots.default?.()]
                ),
              ]),
            ]
          ),
        ]),
      ]);
    };
  },
});
