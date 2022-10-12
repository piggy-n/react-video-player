import type { FC } from 'react';
import { classes } from '@/utils/methods/classes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import './styles/toast.scss';

interface ToastProps {
    message: string;
    eleId?: string;
}

const cn = 'Toast';

const Toast: FC<ToastProps> = (
    {
        message,
        eleId,
    }
) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const removeToast = () => {
        if (document.querySelector('#ws-toast')) {
            document
                .querySelector(eleId ? `#${eleId}` : '#ws-player-container')!
                .removeChild(document.querySelector('#ws-toast')!);
        }
    };

    useEffect(() => {
        timer.current = setTimeout(() => {
            // ReactDOM.unmountComponentAtNode(element!);
            // element!.remove();
            removeToast();
        }, 2000);
        return () => {
            timer.current && clearTimeout(timer.current);
        };
    }, []);

    return (
        <div className={classes(cn, '')}>
            {message}
        </div>
    );
};

export const toast = (option: ToastProps) => {
    const wsToast = document.querySelector('#ws-toast');
    if (!wsToast) {
        const container = document.createElement('div');
        container.id = 'ws-toast';
        document.querySelector(option.eleId ? `#${option.eleId}` : '#ws-player-container')!.appendChild(container);
        ReactDOM.render(<Toast {...option} />, container);
    }
};
