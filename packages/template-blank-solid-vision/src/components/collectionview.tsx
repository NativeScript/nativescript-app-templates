import { JSX } from "@nativescript-dom/solidjs-types/jsx-runtime";
import { ContentView } from "@nativescript/core";
import {
  children,
  Component,
  createSignal,
  For,
  getOwner,
  Owner,
  runWithOwner,
} from "solid-js";

export const DynamicList: Component<
  {
    renderItem: (props: { item: any; index: any; type: any }) => any;
    items: any[];
    onItemType: (item: any, index: any) => string;
    itemTypes: string[];
  } & Omit<
    JSX.IntrinsicElements["collectionview"],
    "itemTemplateSelector" | "items" | "itemTemplates" | "itemTemplate"
  >
> = (props) => {
  const owner = getOwner();
  const { items, renderItem, onItemType, itemTypes, ...restProps } = props;
  const templates = props.itemTypes || ["_default"];
  return (
    <contentview
      style={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
      }}
    >
      <collectionview
        {...restProps}
        items={{
          length: props.items?.length,
          getItem(index: number) {
            return {
              index: props.items?.[index],
            };
          },
        }}
        itemTemplateSelector={(item: any, index: any) => {
          return onItemType?.(item, index) || "_default";
        }}
      >
        <arrayprop key="itemTemplates">
          <For each={templates}>
            {(key) => (
              <itemtemplate
                key={key}
                on:itemLoading={(event: any) => {
                  const { view, item, index } = event;
                  const update_solid_context = (view as any)
                    .__update_solid_context;
                  if (update_solid_context) {
                    update_solid_context(item, index, key);
                  } else {
                    runWithOwner(owner as Owner, () => {
                      const [item, setItem] = createSignal(event.item);
                      const [index, setIndex] = createSignal<number>(
                        event.index || 0
                      );
                      const [type, setType] = createSignal<string>(key);
                      const element = children(() =>
                        renderItem({ item, index, type: type })
                      );

                      (event.view as ContentView).content = element() as never;

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
                  }
                }}
                on:createView={(event: any) => {
                  event.view = document.createElement("ContentView") as any;
                }}
              />
            )}
          </For>
        </arrayprop>
      </collectionview>
    </contentview>
  );
};