import { Icon } from "@iconify/vue";
import { defineComponent, h } from "vue";

export default defineComponent({
  props: ["columns"],
  setup(props) {
    return () => {
      return h("tr", { class: "w-full text-center" }, [
        h(
          "td",
          {
            colspan: props.columns.length,
            class: "w-full",
          },
          [
            h("div", { class: "w-full flex text-center flex-col p-8 text-slate-300" }, [
              h(
                "div",
                { class: "flex justify-center w-full" },
                h(Icon, { icon: "heroicons:inbox", width: 42 })
              ),
              h("div", { class: "p-2" }, "Kosong"),
            ]),
          ]
        ),
      ]);
    };
  },
});
