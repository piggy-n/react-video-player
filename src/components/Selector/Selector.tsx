import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { Select } from 'antd';
import type { FC } from 'react';
import type { SelectorProps } from '@/components/Selector/type';
import './styles/selector.scss';

const cn = 'Selector';

const Selector: FC<SelectorProps> = (
    {
        options = [],
        onChange,
        value,
    }
) => {
    return (
        <div
            className={classes(cn, '')}
            id={'ws-selector'}
        >
            <Select
                value={value}
                size={'small'}
                placeholder={'请选择'}
                mode={'multiple'}
                allowClear={false}
                onChange={onChange}
                suffixIcon={
                    <div className={classes(cn, 'big-circular')}>
                        <div className={classes(cn, 'small-circular')}/>
                    </div>
                }
                getPopupContainer={() => document.getElementById('ws-selector') as HTMLElement}
            >
                {
                    options?.map(item =>
                        <Select.Option
                            key={item.url}
                            value={item.value}
                        >
                            {item.label}
                        </Select.Option>
                    )
                }
            </Select>
        </div>
    );
};

export default Selector;