import { Alert, Snackbar, Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInput } from './components/FormInput';
import type { InputValues } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaAcid } from './utils/shema';
import { Acids } from './components/Acids';
import { useCallback, useState } from 'react';

function App() {
   const [openCopy, setOpenCopy] = useState<boolean>(false);

   const [acids, setAcids] = useState<InputValues | null>(null);
   const form = useForm<InputValues>({
      defaultValues: {
         firstAcid: '',
         secondAcid: '',
      },
      resolver: yupResolver(schemaAcid),
      mode: 'onChange',
   });

   const onSubmit = useCallback((data: InputValues) => {
      setAcids(data);
   }, []);

   const handleCopy = useCallback(() => {
      setOpenCopy(true);
   }, []);

   const handleClose = () => {
      setOpenCopy(false);
   };

   return (
      <FormProvider {...form}>
         <Stack maxWidth={600} direction={'column'} gap={1.5} margin={'auto'}>
            <FormInput onSubmit={onSubmit} />
            {acids && <Acids acids={acids} handleCopy={handleCopy} />}
         </Stack>
         <Snackbar open={openCopy} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success' variant='filled' sx={{ width: '100%' }}>
               Аминокислота успешно скоирована!
            </Alert>
         </Snackbar>
      </FormProvider>
   );
}

export default App;
