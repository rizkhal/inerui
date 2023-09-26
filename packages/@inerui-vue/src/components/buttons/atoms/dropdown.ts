import { defineComponent, h } from "vue";
import { usePopper } from "src/composables/usePopper";

export const Dropdown = defineComponent({
  props: ["visible"],
  setup(props) {
    const { initPopper, destroyPopper } = usePopper();

    const visible = props.visible;

    return () => {
      return h("div", {}, "hello dropdown button");
    };
  },
});
