import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: ["params", "fields"],
  setup(props) {
    const onClickPills = (value: string) => {
      props.params.filters = {
        verified: value,
      };
    };

    const filtersModels = ref<any>(
      props.fields
        ? Object.keys(props.fields).reduce(
            (ac, a) => ({ ...ac, [a]: null }),
            {}
          )
        : null
    );

    return () => {
      let keys = Object.keys(props.params.filters ?? {});
      const isPills = keys.filter((v) => props.fields[v].type === "pills");

      if (isPills) {
        isPills.map((value) => {
          filtersModels.value[value] = props.params.filters[value];
        });
      }

      return Object.entries(props.fields).map(([value, obj]: any) => {
        if (obj.type === "pills") {
          return h(
            "div",
            {
              key: value,
              class: "inline-flex rounded divide-x divide-slate-300",
            },
            [
              Object.entries(obj.attributes).map(
                ([filterValue, label], index) => {
                  return h(
                    "button",
                    {
                      key: filterValue,
                      onClick: () => onClickPills(filterValue),
                      class: `py-2 px-4 text-xs transition-all duration-300
                          ${index === 0 && "rounded-l"}
                          ${
                            index ===
                              Object.values(obj.attributes).length - 1 &&
                            "rounded-r"
                          }
                          ${
                            filtersModels.value[value] == filterValue
                              ? "bg-slate-300 text-slate-800"
                              : "bg-slate-200 text-slate-800"
                          }`,
                    },
                    [`${label}`]
                  );
                }
              ),
            ]
          );
        }
        return h("span", {}, "ini else");
      });
    };
  },
});
