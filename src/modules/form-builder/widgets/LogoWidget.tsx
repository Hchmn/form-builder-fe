import { useTheme } from '@designable/react';
import { baseUrl } from '../../../constants';

const logo = {
  dark: `${baseUrl}logo.jpeg`,
  light: `${baseUrl}logo.jpeg`,
};

export const LogoWidget = () => {
  const theme = useTheme();
  const url = logo[theme as 'dark' | 'light'] ?? logo.light;
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
      <img src={url} style={{ margin: '5px 8px', height: 50, width: 'auto' }} />
    </div>
  );
};
