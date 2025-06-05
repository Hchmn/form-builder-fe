import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { message } from 'antd';
import { createDesigner, Shortcut, KeyCode, Engine } from '@designable/core';
import { GenerateRandomId } from '../../../constants';

const publishForm = async (data: object) => {
  console.log('DATA', data);
  return true;
};

const DEFAULT_FORM = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
  },
  schema: {
    type: 'object',
    properties: {},
    'x-designable-id': 'r9ctfupbm43',
  },
};

interface InitDesignerProps {
  formId?: string;
  title?: string;
}

/**
 * Creates the designer engine with default form
 */
export const initDesigner = (props: InitDesignerProps = {}) => {
  const defaultProps: Required<InitDesignerProps> = {
    formId: GenerateRandomId(),
    title: 'Form-1',
  };

  const { formId, title } = {
    ...props,
    ...defaultProps,
  };

  const engine = createDesigner({
    shortcuts: [
      new Shortcut({
        codes: [
          [KeyCode.Meta, KeyCode.S],
          [KeyCode.Control, KeyCode.S],
        ],
        handler(ctx) {
          saveSchema(ctx.engine);
        },
      }),
    ],
    rootComponentName: 'Form',
  });

  engine.workbench.removeWorkspace('index');
  engine.workbench.addWorkspace({ id: formId, title });
  const workspace = engine.workbench.switchWorkspace(formId);
  engine.workbench.setActiveWorkspace(workspace);

  return engine;
};

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    designer.workbench.currentWorkspace.id,
    JSON.stringify(transformToSchema(designer.getCurrentTree())),
  );
  message.success('Save Success');
};

export const newSchema = (designer: Engine) => {
  designer.setCurrentTree(transformToTreeNode(DEFAULT_FORM));
  localStorage.removeItem(designer.workbench.currentWorkspace.id);
};

export const loadSchema = (designer: Engine, obj: any) => {
  try {
    const form = JSON?.parse(obj['form-schema-file']);
    designer.setCurrentTree(transformToTreeNode(form.design));
  } catch (e) {
    message.error('Please choose a valid form');
    console.error(e);
    return false;
  }
  return true;
};

export const loadOfflineSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(
        JSON.parse(
          localStorage.getItem(designer.workbench.currentWorkspace.id) || '{}',
        ),
      ),
    );
  } catch {
    return false;
  }
  return true;
};

export const submitSchema = async (designer: Engine, values: object) => {
  const data = {
    ...values,
    design: transformToSchema(designer.getCurrentTree()),
  };
  await publishForm(data);
  localStorage.removeItem(designer.workbench.currentWorkspace.id);
  message.success('Submit Success');
};
