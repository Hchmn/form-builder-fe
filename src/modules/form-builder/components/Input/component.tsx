import { createBehavior, createResource } from '@designable/core';
import { Input as FormilyInput } from '@formily/antd';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';
import type { INodeSchema } from '@designable/core';

export const Input = FormilyInput as typeof FormilyInput & {
  Behavior?: ReturnType<typeof createBehavior>;
  Resource?: ReturnType<typeof createResource>;
};

Input.Behavior = createBehavior(
  {
    name: 'Input',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input) as INodeSchema,
    },
    designerLocales: AllLocales.Input,
  },
  {
    name: 'Input.TextArea',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Input.TextArea',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Input.TextArea) as INodeSchema,
    },
    designerLocales: AllLocales.TextArea,
  },
);

Input.Resource = createResource(
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'Input',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    ],
  },
  {
    icon: 'TextAreaSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: 'TextArea',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
        },
      },
    ],
  },
);
