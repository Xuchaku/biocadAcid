import { memo, useEffect, useRef, useState } from 'react';
import type { InputValues } from '../../types';
import { StackCustom } from './style';
import { throttle } from '../../utils/funcs';
import { LETTER_WIDTH } from '../../utils/const';
import { Acid } from '../Acid';

type AcidsProps = {
   acids: InputValues;
   handleCopy: () => void;
};

export const Acids = memo(({ acids, handleCopy }: AcidsProps) => {
   const [arrsAcids, setArrsAcids] = useState<string[]>([]);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleSelection = () => {
         const selection = window.getSelection();
         if (selection && selection.toString()) {
            navigator.clipboard.writeText(selection.toString().replaceAll('\n', '')).then(() => {
               handleCopy();
            });
         }
      };
      const container = containerRef.current;
      if (container) {
         container.addEventListener('mouseup', handleSelection);
      }
      return () => {
         if (container) {
            container.removeEventListener('mouseup', handleSelection);
         }
      };
   }, [handleCopy]);

   useEffect(() => {
      const resizeHandler = throttle(() => {
         const strs: string[] = [];
         const lengthAcid = acids.firstAcid.length;
         const width = containerRef.current?.offsetWidth as number;

         if (width >= lengthAcid * LETTER_WIDTH) {
            strs.push(acids.firstAcid);
            strs.push(acids.secondAcid);
            setArrsAcids(strs);
         } else {
            const countLetterOnRow = Math.floor(width / LETTER_WIDTH);
            let i = 0;
            while (i < lengthAcid) {
               strs.push(acids.firstAcid.slice(i, i + countLetterOnRow));
               strs.push(acids.secondAcid.slice(i, i + countLetterOnRow));
               i += countLetterOnRow;
            }
            setArrsAcids(strs);
         }
      }, 200);
      resizeHandler();
      window.addEventListener('resize', resizeHandler);
      return () => window.removeEventListener('resize', resizeHandler);
   }, [acids.firstAcid]);

   return (
      <StackCustom ref={containerRef}>
         {arrsAcids.map((acid, index) => {
            if (index % 2 == 0) {
               return <Acid acid={acid} />;
            } else {
               return <Acid acid={acid} acidCompare={arrsAcids[index - 1]} />;
            }
         })}
      </StackCustom>
   );
});
