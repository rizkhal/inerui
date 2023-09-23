import { defineComponent, h } from "vue";
import { Base } from "./atoms/default";

const Primary = defineComponent({
  setup() {
    return () =>
      h(Base, {
        label: "Info Alert!",
        message: "Change a few things up and try submitting again.",
      });
  },
});

export { Primary };
