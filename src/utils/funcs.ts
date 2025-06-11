export function throttle<T extends (...args: unknown[]) => unknown>(
   func: T,
   wait: number,
): (...args: Parameters<T>) => void {
   let lastCallTime: number | null = null;
   let timeoutId: ReturnType<typeof setTimeout> | null = null;

   return function (...args: Parameters<T>): void {
      const now = Date.now();

      if (lastCallTime === null || now - lastCallTime >= wait) {
         // Вызываем функцию сразу, если прошло достаточно времени
         func(...args);
         lastCallTime = now;
      } else if (!timeoutId) {
         // Запускаем отложенный вызов, если функция была вызвана слишком рано
         const remainingTime = wait - (now - lastCallTime);
         timeoutId = setTimeout(() => {
            func(...args);
            lastCallTime = Date.now();
            timeoutId = null;
         }, remainingTime);
      }
   };
}
