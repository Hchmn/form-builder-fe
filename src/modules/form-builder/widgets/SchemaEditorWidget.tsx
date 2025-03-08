import { ITreeNode } from '@designable/core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { MonacoInput } from '@designable/react-settings-form';
import { FC } from 'react';

interface SchemaEditorWidgetProps {
  tree: ITreeNode;
  onChange: (tree: ITreeNode) => void;
}

const SchemaEditorWidget: FC<SchemaEditorWidgetProps> = (props) => {
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
