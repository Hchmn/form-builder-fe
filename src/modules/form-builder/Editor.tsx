// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import 'antd/dist/antd.less';
import React, { useMemo, ReactNode } from 'react';
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@designable/core';
import { saveSchema } from './service';
import PreviewWidget from './widgets/PreviewWidget';
import SchemaEditorWidget from './widgets/SchemaEditorWidget';
import { LogoWidget } from './widgets';
import { Field } from './components';

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
      <StudioPanel logo={<LogoWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" sources={[]} />
            <ResourceWidget title="sources.Layouts" sources={[]} />
            <ResourceWidget title="sources.Displays" sources={[]} />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget use={'HISTORY'} />
              <ViewToolsWidget use={['DESIGNABLE', 'PREVIEW', 'JSONTREE']} />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Field,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};

export default FormEditor;
