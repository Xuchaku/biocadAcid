import { Stack, styled, type SxProps } from '@mui/material';

export const customStyle: SxProps = {
   border: '1px solid #ccc',
   padding: '10px 20px',
   borderRadius: '5px',
   boxShadow: '0px 0px 25px 0px rgba(242, 72, 72, 0.50)',
};

export const StackCustom = styled(Stack, {
   shouldForwardProp: (prop) => prop !== 'imgLeft',
})<{ error: boolean }>(({ error }) => ({
   border: error ? '1px solid red' : '1px solid #ccc',
   padding: '10px 20px',
   borderRadius: '5px',
   boxShadow: error
      ? '0px 0px 25px 0px rgba(242, 72, 72, 0.50)'
      : '0px 0px 25px 0px rgba(72, 140, 242, 0.5)',
}));
