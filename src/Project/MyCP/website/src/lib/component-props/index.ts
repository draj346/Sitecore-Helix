import {
  ComponentParams,
  ComponentRendering,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { AriaRole, HTMLAttributeAnchorTarget } from 'react';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};

export type CustomLinkTypes = {
  href: string;
  id?: string;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  target?: HTMLAttributeAnchorTarget | undefined;
  rel?: string | undefined;
  role?: AriaRole | undefined;
};

export type CollapseType = typeof import('bootstrap').Collapse;
export type TabType = typeof import('bootstrap').Tab;

export type OptionType = {
  value: string;
  label: string;
};
