import { defineComponent, h } from "vue";
import { Search } from "./search";

export type TFilterAttributes = {
  [key: string]: string | boolean;
};

export type TFilter = {
  type: string;
  attributes: Array<TFilterAttributes>;
};

export default defineComponent({
  props: ["params"],
  setup(props) {
    const onClickPills = (value: string) => {
      props.params.filters = {
        verified: value,
      };
    };

    return () => {
      return h(
        "div",
        {
          class: "py-2 w-full inline-flex items-center justify-between",
        },
        [
          h("div", {}, [
            Object.values(props.params.fields).map(
              (obj: any, index: number) => {
                if (obj.type === "pills") {
                  return h(
                    "div",
                    {
                      key: index,
                      class:
                        "inline-flex bg-slate-200 rounded divide-x divide-slate-300",
                    },
                    [
                      Object.entries(obj.attributes).map(([value, label]) => {
                        return h(
                          "button",
                          {
                            key: value,
                            onClick: () => onClickPills(value),
                            class: "p-3 text-xs",
                          },
                          label
                        );
                      }),
                    ]
                  );
                }
                return h("span", {}, "ini else");
              }
            ),
          ]),
          h(Search, {
            modelValue: props.params.search,
            "onUpdate:modelValue": (value) => {
              props.params.search = value;
            },
          }),
        ]
      );
    };
  },
});
