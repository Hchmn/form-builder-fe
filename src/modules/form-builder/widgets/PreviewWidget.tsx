import { transformToSchema } from '@designable/formily-transformer';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { useMemo } from 'react';
import {
  Form,
  FormItem,
  DatePicker,
  Cascader,
  Editable,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  ArrayCards,
} from '@formily/antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewWidget = (props: any) => {
  const form = useMemo(() => createForm(), []);

  const { form: formProps, schema } = transformToSchema(props.tree);
  const SchemaField = createSchemaField({
    components: {
      Space,
      FormGrid,
      FormLayout,
      FormTab,
      FormCollapse,
      ArrayTable,
      ArrayCards,
      FormItem,
      DatePicker,
      Cascader,
      Editable,
      Input,
      NumberPicker,
      Switch,
      Password,
      PreviewText,
      Radio,
      Reset,
      Select,
      Submit,
      TimePicker,
      Transfer,
      TreeSelect,
    },
  });

  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};

export default PreviewWidget;
