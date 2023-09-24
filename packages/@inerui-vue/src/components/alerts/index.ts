import { defineComponent, h } from "vue";
import { Default, TAlertDefaultProps } from "./atoms";

const Alert = defineComponent({
  props: ["label", "message", "variant", "icon"],
  setup({ label, message, variant, icon }: TAlertDefaultProps) {
    return () =>
      h(Default, {
        icon,
        variant,
        label,
        message,
      });
  },
});

export { Alert };
