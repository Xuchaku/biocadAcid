import { Stack, styled } from '@mui/material';

export const StackCustom = styled(Stack, {
   shouldForwardProp: (prop) => prop !== 'imgLeft',
})(() => ({
   borderRadius: '5px',
   boxShadow: '0px 0px 25px 0px rgba(72, 140, 242, 0.5)',
   boxSizing: 'border-box',
}));
