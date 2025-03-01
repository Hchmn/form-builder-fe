import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { MonacoInput } from '@designable/react-settings-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SchemaEditorWidget = (props: any) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(transformToSchema(props.tree), null, 2)}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON?.parse(value)));
      }}
      language="json"
    />
  );
};

export default SchemaEditorWidget;
