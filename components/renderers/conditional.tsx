import React from 'react';
import type { ReactNode, ReactElement } from 'react';

/**
 * Props for the main Render component
 */
interface RenderProps {
    children: ReactNode;
}

/**
 * Props for the conditional rendering component
 */
interface RenderWhenProps {
    isTrue: boolean;
    children: ReactNode;
}

/**
 * Props for the fallback component
 */
interface RenderElseProps {
    children: ReactNode;
}

/**
 * A compound component for conditional rendering with a fallback option.
 * @component
 * @example
 * ```tsx
 * <Render>
 *   <Render.If isTrue={someCondition}>
 *     <Component />
 *   </Render.If>
 *   <Render.Else>
 *     <FallbackComponent />
 *   </Render.Else>
 * </Render>
 * ```
 */
const Render: React.FC<RenderProps> & {
    If: React.FC<RenderWhenProps>;
    Else: React.FC<RenderElseProps>;
} = (props) => {
    // Track the first matching condition and fallback
    let condition: ReactElement | null = null;
    let otherwise: ReactElement | null = null;

    // Iterate through children to find the first matching condition and fallback
    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            const childProps = child.props as { isTrue?: boolean };
            // If no isTrue prop, treat as fallback
            if (childProps.isTrue === undefined) {
                otherwise = child as ReactElement;
            } 
            // If has isTrue prop and it's true, and we haven't found a condition yet
            else if (!condition && childProps.isTrue === true) {
                condition = child as ReactElement;
            }
        }
    });

    // Return the first matching condition, or fallback, or null
    return condition || otherwise || null;
};

/**
 * Component for conditional rendering based on a boolean condition
 * @component
 * @param {RenderWhenProps} props - The component props
 * @param {boolean} props.isTrue - The condition to evaluate
 * @param {ReactNode} props.children - The content to render when condition is true
 * @returns {ReactElement | null} The rendered content or null
 */
const RenderWhen: React.FC<RenderWhenProps> = ({ isTrue, children }) => 
    (isTrue ? (children as ReactElement) : null);

/**
 * Component for rendering fallback content when no conditions are met
 * @component
 * @param {RenderElseProps} props - The component props
 * @param {ReactNode} props.children - The fallback content to render
 * @returns {ReactElement} The rendered fallback content
 */
const RenderElse: React.FC<RenderElseProps> = ({ children }) => 
    children as ReactElement;

// Attach sub-components to the main Render component
Render.If = RenderWhen;
Render.Else = RenderElse;

export { Render };