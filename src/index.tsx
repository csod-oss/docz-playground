import * as React from 'react';
import { SFC, Fragment, ComponentType as CT } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider';
import { PropDoc } from '@csod-oss/react-props-to-docs-ts/build/props-parser';

export type PageProps = RouteComponentProps<any> & { doc: Entry };
export type RenderComponent = CT<RenderComponentProps>;

export interface PropsTableProps {
  docs: PropDoc;
  component: CT;
}
export interface RenderComponentProps {
  className?: string;
  style?: any;
  wrapper?: CT<any>;
  components: ComponentsMap;
  component: JSX.Element;
  position: number;
  code: string;
  codesandbox: string;
  scope: Record<string, any>;
  variations?: Array<any>;
  propsTable?: PropsTableProps;
}
export interface Heading {
  depth: number;
  slug: string;
  value: string;
}
export interface Entry {
  id: string;
  filepath: string;
  slug: string;
  route: string;
  name: string;
  order: number;
  menu: string | null;
  headings: Heading[];
  [key: string]: any;
}
export interface ComponentsMap {
  loading?: CT;
  page?: CT<PageProps>;
  notFound?: CT<RouteComponentProps<any>>;
  render?: RenderComponent;
  h1?: CT<any> | string;
  h2?: CT<any> | string;
  h3?: CT<any> | string;
  h4?: CT<any> | string;
  h5?: CT<any> | string;
  h6?: CT<any> | string;
  span?: CT<any> | string;
  a?: CT<any> | string;
  ul?: CT<any> | string;
  table?: CT<any> | string;
  pre?: CT<any> | string;
  code?: CT<any> | string;
  inlineCode?: CT<any> | string;
  [key: string]: any;
}
export interface PlaygroundProps {
  components: ComponentsMap;
  className?: string;
  style?: any;
  wrapper?: CT<any>;
  children: any;
  variations?: Array<any>;
  propsTable?: PropsTableProps;
  __scope: Record<string, any>;
  __position: number;
  __code: string;
  __codesandbox: string;
}

const isFn = (value: any): boolean => typeof value === 'function';

const BasePlayground: SFC<PlaygroundProps> = ({
  components,
  className,
  style,
  wrapper: Wrapper,
  children,
  variations,
  propsTable,
  __scope,
  __position,
  __code,
  __codesandbox
}) => {
  if (!components || !components.render) return null;

  return (
    <components.render
      className={className}
      style={style}
      components={components}
      component={<Wrapper>{isFn(children) ? children() : children}</Wrapper>}
      variations={variations}
      propsTable={propsTable}
      scope={__scope}
      position={__position}
      code={__code}
      codesandbox={__codesandbox}
    />
  );
};

export default withMDXComponents(BasePlayground);


