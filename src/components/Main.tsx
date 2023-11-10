import { ReactNode } from 'react';

import Box from '@mui/joy/Box';
import { Theme } from '@mui/joy/styles';
import { SxProps } from '@mui/system';

type Main = {
  children?: ReactNode,
  sx?: SxProps<Theme>;
};

const Main = ({ children, sx, ...props}: Main) =>
  <Box
    component="main"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>;

Main.displayName = "Main";

export default Main;
