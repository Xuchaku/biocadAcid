import { Typography } from '@mui/material';
import type { FORMAT } from '../../types';
import { Letter } from '../Letter';

type AcidProps = {
   acid: string;
   acidCompare?: string;
};

export const Acid = ({ acid, acidCompare }: AcidProps) => {
   const acidArr = acid.split('') as FORMAT[];
   const acidCompareArr = acidCompare?.split('') as FORMAT[] | undefined;

   return (
      <Typography sx={{ display: 'flex', flexWrap: 'wrap' }}>
         {acidArr.map((letter: FORMAT, index) => (
            <Letter
               letter={letter}
               isAcidCompareArr={!!acidCompareArr}
               isPointed={Boolean(acidCompareArr && acidCompareArr[index] !== acidArr[index])}
            />
         ))}
      </Typography>
   );
};
