import { defineComponent, h } from "vue";
import { Icon } from "../../atoms";

export type TAlertDefaultProps = {
  label: string;
  message: string;
  icon?: string;
  variant: "success" | "info" | "warning" | "danger";
};

const Default = defineComponent({
  props: ["label", "message", "variant", "icon"],
  setup({ label, message, variant, icon }: TAlertDefaultProps) {
    return () => {
      const classes = {
        info: "bg-blue-200 dark:bg-gray-800 dark:text-blue-400 text-blue-800",
        danger: "bg-rose-200 dark:bg-gray-800 dark:text-rose-400 text-rose-800",
        success:
          "bg-emerald-200 dark:bg-gray-800 dark:text-emerald-400 text-emerald-800",
        warning:
          "bg-yellow-200 dark:bg-gray-800 dark:text-yellow-400 text-yellow-800",
      }[variant];

      return h(
        "div",
        {
          role: "alert",
          class: `p-4 mb-4 text-sm rounded-lg ${classes}`,
        },
        [
          h("div", { class: "font-normal" }, [
            h(
              "div",
              { class: `font-semibold ${icon ? "inline-flex items-center space-x-2" : null}` },
              [h(Icon, { icon: icon }), h("span", label)]
            ),
            h("p", message),
          ]),
        ]
      );
    };
  },
});

export { Default };
