import { JSX } from "@nativescript-dom/solidjs-types/jsx-runtime";
import {
  children,
  createSignal,
  getOwner,
  Owner,
  runWithOwner,
  Component,
  For,
} from "solid-js";

export const List: Component<
  {
    renderItem: (props: { item: any; index: any; type: any }) => any;
    items: any[];
    onItemType: (item: any, index: any) => string;
    itemTypes: string[];
  } & Omit<
    JSX.IntrinsicElements["listview"],
    "itemTemplateSelector" | "items" | "itemTemplates" | "itemTemplate"
  >
> = (props) => {
  const owner = getOwner();
  const { items, renderItem, onItemType, itemTypes, ...restProps } = props;
  const templates = props.itemTypes || ["_default"];

  return (
    <listview
      {...restProps}
      items={{
        length: props.items?.length,
        getItem(index) {
          return {
            index: props.items?.[index],
          };
        },
      }}
      itemTemplateSelector={(item, index) => {
        return onItemType?.(item, index) || "_default";
      }}
    >
      <arrayprop key="itemTemplates">
        <For each={templates}>
          {(key) => (
            <itemtemplate
              key={key}
              on:itemLoading={(event) => {
                const { view, item, index } = event;
                const update_solid_context = (view as any)
                  .__update_solid_context;
                if (update_solid_context) {
                  update_solid_context(item, index, key);
                }
              }}
              on:createView={(event) => {
                runWithOwner(owner as Owner, () => {
                  const [item, setItem] = createSignal();
                  const [index, setIndex] = createSignal<number>(0);
                  const [type, setType] = createSignal<string>(key);
                  const element = children(() =>
                    renderItem({ item, index, type: type })
                  );
                  event.view = element() as never;
                  (event.view as any).__update_solid_context = (
                    item: any,
                    index: number,
                    type: string
                  ) => {
                    setItem(item);
                    setIndex(index);
                    setType(type);
                  };
                });
              }}
            />
          )}
        </For>
      </arrayprop>
    </listview>
  );
};