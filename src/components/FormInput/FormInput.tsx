import { Button, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import type { InputValues } from '../../types';
import { memo, useEffect } from 'react';
import { StackCustom } from './style';

type FormInputProps = {
   onSubmit: (data: InputValues) => void;
};

export const FormInput = memo(({ onSubmit }: FormInputProps) => {
   const { register, formState, subscribe, setError, clearErrors, handleSubmit, getValues } =
      useFormContext<InputValues>();

   const { errors } = formState;

   useEffect(() => {
      const callback = subscribe({
         formState: {
            values: true,
         },
         callback: ({ values }) => {
            const { firstAcid, secondAcid } = values;
            if (firstAcid.length !== secondAcid.length) {
               setError('lengthError', {
                  type: 'custom',
                  message: 'Длина аминокислот должна совпадать',
               });
            } else {
               clearErrors('lengthError');
            }
         },
      });

      return () => callback();
   }, []);

   const isValidLength = !!errors.lengthError;

   return (
      <StackCustom
         direction={'column'}
         gap={1}
         error={isValidLength}
         as={'form'}
         onSubmit={(e) => {
            e.preventDefault();
            onSubmit(getValues());
         }}
      >
         <TextField
            fullWidth
            {...register('firstAcid')}
            error={!!errors.firstAcid}
            helperText={errors.firstAcid?.message}
         />
         <TextField
            fullWidth
            {...register('secondAcid')}
            error={!!errors.secondAcid}
            helperText={errors.secondAcid?.message}
         />

         <Button
            variant='contained'
            type='submit'
            disabled={Object.values(errors).length > 0 || !formState.isDirty || isValidLength}
         >
            Выравнивание
         </Button>
         <Typography color='error' fontSize={12}>
            {errors.lengthError?.message}
         </Typography>
      </StackCustom>
   );
});
