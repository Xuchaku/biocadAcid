import { Typography } from '@mui/material';
import type { FORMAT } from '../../types';
import { COLOR_SHEME, LETTER_WIDTH } from '../../utils/const';

type LetterProps = {
   letter: FORMAT;
   isPointed: boolean;
   isAcidCompareArr: boolean;
};

export const Letter = ({ letter, isPointed, isAcidCompareArr }: LetterProps) => {
   return (
      <Typography
         component={'span'}
         sx={{
            background: isAcidCompareArr
               ? isPointed
                  ? COLOR_SHEME[letter]
                  : undefined
               : COLOR_SHEME[letter],
            flexBasis: `${LETTER_WIDTH}px`,
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
         }}
      >
         {letter}
      </Typography>
   );
};
