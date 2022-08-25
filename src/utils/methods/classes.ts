import { isArray, isObject, isString } from './is';

type boolObj = Record<string, boolean>

const prefixClassName = 'ws';

export const classes = (componentName: string, ...args: any): string => {
    const className = new Array<string>();

    args.forEach((arg: unknown) => {
            if (isString(arg)) {
                className.push(`${prefixClassName}-${componentName.toLowerCase()}${arg && '-' + arg}`);
            }

            if (isArray(arg)) {
                (arg as string[]).forEach(str => isString(str) && className.push(str));
            }

            if (isObject(arg)) {
                for (const key in arg as boolObj) {
                    if ((arg as boolObj).hasOwnProperty.bind(key) && (arg as boolObj)[key]) {
                        className.push(key);
                    }
                }
            }
        }
    );

    return className.filter(v => v).join(' ');
};
