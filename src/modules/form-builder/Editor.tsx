import { GlobalRegistry } from '@designable/core';
import {
  CompositePanel,
  Designer,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
} from '@designable/react';
import { SettingsForm } from '@designable/react-settings-form';
import 'antd/dist/antd.less';
import React, { useMemo } from 'react';
import { Input } from './components/Input/component';
import { initDesigner } from './service';
import { LogoWidget } from './widgets';
import { ActionsWidget } from './widgets/ActionsWidget';
import { WorkspaceManager } from './WorkspaceManager';

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

const FormEditor: React.FC = ({ children }) => {
  const engine = useMemo(() => initDesigner(), []);

  return (
    <Designer engine={engine}>
      {children}
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          {CompositePanel.Item && (
            <CompositePanel.Item title="panels.Component" icon="Component">
              <ResourceWidget title="sources.Inputs" sources={[Input]} />
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
        <WorkspaceManager />
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};

export default FormEditor;
