export const debounce = <F extends (...args: any[]) => any>(fn: F, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

