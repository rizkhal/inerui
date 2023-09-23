import { defineComponent, ref, h } from "vue";

const Stub = defineComponent({
  setup() {
    const message = ref("Hello, Vue!");

    const changeText = () => {
      message.value = "Text changed!" + new Date();
      console.log(message.value);
    };

    return () => {
      return h("div", [
        h("h1", message.value),
        h("button", { onClick: changeText }, "Change Text"),
      ]);
    };
  },
});

export { Stub };
