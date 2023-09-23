import { defineComponent, h } from "vue";

export type TBaseProps = {
  label: string;
  message: string;
};

const Base = defineComponent({
  props: ["label", "message"],
  setup({ label, message }: TBaseProps) {
    return () => {
      return h(
        "div",
        {
          role: "alert",
          class:
            "p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-200 dark:bg-gray-800 dark:text-blue-400",
        },
        [
          h("div", { class: "font-normal" }, [
            h("span", { class: "font-semibold" }, label),
            h("p", message),
          ]),
        ]
      );
    };
  },
});

export { Base };
