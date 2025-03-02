import React, { ReactNode } from 'react';
import { FormPath } from '@formily/core';
import { toJS } from '@formily/reactive';
import {
  ArrayField,
  Field as InternalField,
  ObjectField,
  VoidField,
  observer,
  Schema,
} from '@formily/react';
import { FormItem } from '@formily/antd';
import { each, reduce } from '@formily/shared';
import { createBehavior } from '@designable/core';
import { useDesigner, useTreeNode, useComponents } from '@designable/react';
import { isArr, isStr } from '@designable/shared';
import { AllLocales } from '../../locales';
import { Container } from '../../container';

Schema.silent(true);

const SchemaStateMap: Record<string, string> = {
  title: 'title',
  description: 'description',
  default: 'value',
  enum: 'dataSource',
  readOnly: 'readOnly',
  writeOnly: 'editable',
  required: 'required',
  'x-content': 'content',
  'x-value': 'value',
  'x-editable': 'editable',
  'x-disabled': 'disabled',
  'x-read-pretty': 'readPretty',
  'x-read-only': 'readOnly',
  'x-visible': 'visible',
  'x-hidden': 'hidden',
  'x-display': 'display',
  'x-pattern': 'pattern',
};

const NeedShownExpression: Record<string, boolean> = {
  title: true,
  description: true,
  default: true,
  'x-content': true,
  'x-value': true,
};

const isExpression = (val: unknown): boolean =>
  isStr(val) && /^\{\{.*\}\}$/.test(val);

const filterExpression = (val: unknown): unknown => {
  if (typeof val === 'object' && val !== null) {
    const isArray = isArr(val);
    const results = reduce(
      val as Record<string | number, unknown>,
      (buf: Record<string | number, unknown> | unknown[], value, key) => {
        if (isExpression(value)) {
          return buf;
        }
        const filteredValue = filterExpression(value);
        if (filteredValue === undefined || filteredValue === null) return buf;
        if (isArray) {
          return [...(buf as unknown[]), filteredValue];
        }
        (buf as Record<string | number, unknown>)[key] = filteredValue;
        return buf;
      },
      isArray ? [] : {},
    );
    return results;
  }
  if (isExpression(val)) {
    return undefined;
  }
  return val;
};

interface SchemaProps {
  [key: string]: any;
}

const toDesignableFieldProps = (
  schema: SchemaProps,
  components: Record<string, any>,
  nodeIdAttrName: string = 'default-node-id', // Default value
  id: string,
): Record<string, any> => {
  const results: Record<string, any> = {};
  each(SchemaStateMap, (fieldKey, schemaKey) => {
    const value = schema[schemaKey];
    if (isExpression(value)) {
      if (!NeedShownExpression[schemaKey]) return;
      if (value) {
        results[fieldKey] = value;
        return;
      }
    } else if (value) {
      results[fieldKey] = filterExpression(value);
    }
  });

  if (!components['FormItem']) {
    components['FormItem'] = FormItem;
  }

  const decorator =
    schema['x-decorator'] && FormPath.getIn(components, schema['x-decorator']);
  const component =
    schema['x-component'] && FormPath.getIn(components, schema['x-component']);
  const decoratorProps = schema['x-decorator-props'] || {};
  const componentProps = schema['x-component-props'] || {};

  if (decorator) {
    results.decorator = [decorator, toJS(decoratorProps)];
  }
  if (component) {
    results.component = [component, toJS(componentProps)];
  }
  if (decorator) {
    FormPath.setIn(results['decorator'][1], nodeIdAttrName, id);
  } else if (component) {
    FormPath.setIn(results['component'][1], nodeIdAttrName, id);
  }

  if (results.title) {
    results.title = <span data-content-editable="title">{results.title}</span>;
  }

  if (results.description) {
    results.description = (
      <span data-content-editable="description">{results.description}</span>
    );
  }

  return results;
};

interface FieldProps extends SchemaProps {
  children?: ReactNode;
  type?: string;
}

export const Field: React.FC<FieldProps> & { Behavior?: any } = observer(
  (props) => {
    const designer = useDesigner();
    const components = useComponents();
    const node = useTreeNode();
    if (!node) return null;

    const nodeIdAttrName = designer.props.nodeIdAttrName ?? 'default-node-id'; // Ensure a valid string

    const fieldProps = toDesignableFieldProps(
      props,
      components,
      nodeIdAttrName,
      node.id,
    );

    if (props.type === 'object') {
      return (
        <Container>
          <ObjectField {...fieldProps} name={node.id}>
            {props.children}
          </ObjectField>
        </Container>
      );
    } else if (props.type === 'array') {
      return <ArrayField {...fieldProps} name={node.id} />;
    } else if (node.props?.type === 'void') {
      return (
        <VoidField {...fieldProps} name={node.id}>
          {props.children}
        </VoidField>
      );
    }
    return <InternalField {...fieldProps} name={node.id} />;
  },
);

Field.Behavior = createBehavior({
  name: 'Field',
  selector: 'Field',
  designerLocales: AllLocales.Field,
});
