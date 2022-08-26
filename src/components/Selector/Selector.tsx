import * as React from 'react';
import { classes } from '@/utils/methods/classes';
import { Select } from 'antd';
import type { FC } from 'react';
import type { SelectorProps } from '@/components/Selector/type';
import './styles/selector.scss';
import Icon from '@/components/Icon';

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
                defaultValue={['singleGrid']}
                size={'small'}
                placeholder={'请选择'}
                mode={'multiple'}
                showArrow
                onChange={onChange}
                suffixIcon={<Icon name={'point'} size={12}/>}
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