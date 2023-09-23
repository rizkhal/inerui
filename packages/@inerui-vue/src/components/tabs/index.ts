import { Icon } from "components/atoms";
import { ref, defineComponent, h } from "vue";

export type TTabsMenuLists = {
  label: string;
  icon?: string;
  component?: any;
};

export type TProps = {
  heading?: string;
  summary?: string;
  tabs: Array<TTabsMenuLists>;
};

const Tab = defineComponent({
  props: ["heading", "summary", "tabs"],
  setup(props: TProps) {
    const selected = ref<number>(0);

    return () => {
      const onlyText = (label: string) => h("span", label);

      const withIcon = (label: string, icon: string) =>
        h("div", { class: "inline-flex items-center space-x-2" }, [
          h(Icon, { icon }),
          h("span", label),
        ]);

      const renderContent = h(props.tabs[selected.value].component, {
        class: "",
      });

      return h("div", { class: "w-full h-full relative" }, [
        h("div", { class: "relative" }, [
          h("div", { class: "bg-red-500" }, [
            h("h1", { class: "font-bold text-2xl" }, props.heading),
            h("p", { class: "font-normal" }, props.summary),
          ]),
          h(
            "div",
            {
              class:
                "sticky top-0 mt-4 text-sm font-medium text-center text-primary-500 border-b border-slate-200 dark:text-primary-400 dark:border-primary-700",
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
                        onClick: () => {
                          selected.value = index;
                        },
                        class:
                          "inline-block p-2 border-b-2 border-transparent rounded-t-lg hover:text-primary-600 hover:border-primary-500 dark:hover:text-primary-300",
                      },
                      icon ? withIcon(label, icon) : onlyText(label)
                    );
                  }),
                ]
              ),
            ]
          ),
        ]),
        renderContent,
      ]);
    };
  },
});

export { Tab };
