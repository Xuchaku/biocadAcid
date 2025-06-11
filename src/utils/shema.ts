import * as yup from 'yup';
import { SUPPORTED_FORMATS } from './const';

const validFormat = (str: string, format: string[]) => {
   for (const letter of str) {
      if (!format.includes(letter)) return false;
   }
   return true;
};

export const schemaAcid = yup.object({
   firstAcid: yup
      .string()
      .required('Обязательное поле')
      .test(
         'acidLetters',
         `Неподходящий символ, доступные символы: ${SUPPORTED_FORMATS.join(',')}`,
         (value) => validFormat(value, SUPPORTED_FORMATS),
      ),
   secondAcid: yup
      .string()
      .required('Обязательное поле')
      .test(
         'acidLetters',
         `Неподходящий символ, доступные символы: ${SUPPORTED_FORMATS.join(',')}`,
         (value) => validFormat(value, SUPPORTED_FORMATS),
      ),
});
