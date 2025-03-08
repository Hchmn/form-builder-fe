import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from '@designable/core';
import {
  CompositePanel,
  Designer,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  Workbench,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import 'antd/dist/antd.less';
import React, { ReactNode, useMemo } from 'react';
import { saveSchema } from './service';
import { LogoWidget } from './widgets';
import { Workspace } from './Workspace';

GlobalRegistry.registerDesignerLocales({
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Buttons: 'Buttons',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
});

interface FormEditorProps {
  children?: ReactNode;
}

const FormEditor: React.FC<FormEditorProps> = ({ children }) => {
  const engine = useMemo(
    () =>
      createDesigner({
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
      }),
    [],
  );
  return (
    <Designer engine={engine}>
      {children}
      <Workbench>
        <StudioPanel logo={<LogoWidget />}>
          <CompositePanel>
            {CompositePanel.Item && (
              <CompositePanel.Item title="panels.Component" icon="Component">
                <ResourceWidget title="sources.Inputs" sources={[]} />
                <ResourceWidget title="sources.Layouts" sources={[]} />
                <ResourceWidget title="sources.Displays" sources={[]} />
              </CompositePanel.Item>
            )}
            {CompositePanel.Item && (
              <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                <OutlineTreeWidget />
              </CompositePanel.Item>
            )}
            {CompositePanel.Item && (
              <CompositePanel.Item title="panels.History" icon="History">
                <HistoryWidget />
              </CompositePanel.Item>
            )}
          </CompositePanel>
          <Workspace formId="form" />
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Workbench>
    </Designer>
  );
};

export default FormEditor;
