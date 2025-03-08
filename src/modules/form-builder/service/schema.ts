import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { message } from 'antd';
import { createDesigner, Shortcut, KeyCode, Engine } from '@designable/core';

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

export const initDesigner = () => {
  return createDesigner({
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
};

export const saveSchema = (designer: Engine) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree())),
  );
  message.success('Save Success');
};

export const newSchema = (designer: Engine) => {
  designer.setCurrentTree(transformToTreeNode(DEFAULT_FORM));
  localStorage.removeItem('formily-schema');
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
        JSON.parse(localStorage.getItem('formily-schema') || '{}'),
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
  localStorage.removeItem('formily-schema');
  message.success('Submit Success');
};
