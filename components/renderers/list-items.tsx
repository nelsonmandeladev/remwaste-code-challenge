import { Children } from "react";
import type { ReactNode, ReactElement } from "react";

/**
 * Props for the ListItemRender component
 * @template T - The type of items in the list
 */
type ListItemRenderProps<T> = {
  /** Function to render each item in the list */
  render: (item: T, index: number) => ReactElement;
  /** Array of items to render */
  items: T[];
};

/**
 * A component that renders a list of items using a provided render function.
 * @component
 * @template T - The type of items in the list
 * @param {ListItemRenderProps<T>} props - The component props
 * @param {(item: T, index: number) => ReactElement} props.render - Function to render each item
 * @param {T[]} props.items - Array of items to render
 * @returns {ReactNode} Array of rendered items
 * @example
 * ```tsx
 * <ListItemRender
 *   items={['a', 'b', 'c']}
 *   render={(item, index) => <div key={index}>{item}</div>}
 * />
 * ```
 */
export const ListItemRender = <T,>({
  render,
  items,
}: ListItemRenderProps<T>): ReactNode =>
  Children.toArray(items.map((item: T, index: number) => render(item, index)));
