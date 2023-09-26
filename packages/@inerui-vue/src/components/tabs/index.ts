import { Icon } from "components/atoms";
import { ref, defineComponent, h } from "vue";

export type TTabsMenuLists = {
  label: string;
  icon?: string;
  component?: any;
};

export type TTabProps = {
  heading?: string;
  summary?: string;
  tabs: Array<TTabsMenuLists>;
};

const Tab = defineComponent({
  name: "Tab",
  props: ["heading", "summary", "tabs"],
  emits: ["change"],
  setup(props: TTabProps, { emit, slots }) {
    const selected = ref<number>(0);

    const handleOnChange = (index: number) => {
      selected.value = index;
      emit("change", index);
    };

    return () => {
      const onlyText = (label: string) => h("span", label);

      const withIcon = (label: string, icon: string) =>
        h("div", { class: "inline-flex items-center space-x-2" }, [
          h(Icon, { icon }),
          h("span", label),
        ]);

      const heading =
        (props.heading || props.summary) &&
        h("div", { class: "flex flex-col space-y-2" }, [
          props.heading &&
            h(
              "h1",
              { class: "font-bold text-2xl text-slate-800" },
              props.heading
            ),
          props.summary &&
            h("p", { class: "font-normal text-slate-600" }, props.summary),
        ]);

      return h("div", { class: "w-full h-full relative" }, [
        h("div", { class: "relative" }, [
          slots.heading?.() || heading,
          h(
            "div",
            {
              class:
                "sticky top-0 mt-4 text-sm font-medium text-center text-inerui-500 border-b border-slate-200 dark:text-inerui-400 dark:border-inerui-700",
            },
            [
              h(
                "div",
                {
                  class: "flex flex-wrap space-x-4 -mb-px",
                },
                [
                  props.tabs.map(({ label, icon }, index: number) => {
                    return h(
                      "button",
                      {
                        key: index.toString(),
                        onClick: () => handleOnChange(index),
                        class: `inline-block p-2 border-b-2 rounded-t-lg hover:text-inerui-600 hover:border-inerui-500 dark:hover:text-inerui-300 transition-all duration-300 ${
                          index === selected.value
                            ? "border-inerui-500"
                            : "border-transparent"
                        }`,
                      },
                      icon ? withIcon(label, icon) : onlyText(label)
                    );
                  }),
                ]
              ),
            ]
          ),
        ]),
        h(props.tabs[selected.value].component),
      ]);
    };
  },
});

export { Tab };
