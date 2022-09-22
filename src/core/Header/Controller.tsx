import Icon from '@/components/Icon';
import * as React from 'react';
import { useContext, useState } from 'react';
import { CtrPlayerContext } from '@/utils/hooks/useCtrPlayerContext';
import { createPortal } from 'react-dom';
import { Button } from 'antd';
import { classes } from '@/utils/methods/classes';
import './styles/controller.scss';
import { obtainControlAccess, releaseControlAccess } from '@/services/controller';

const cn = 'Controller-Dialog';

const Controller = () => {
    const {
        ctrPlayerModel: {
            isController,
            isVideoList,
            playerWrapperEle,
        },
        deviceId,
        setCtrPlayerModelData
    } = useContext(CtrPlayerContext);

    const [dialogVisible, setDialogVisible] = useState(false);

    const clickHandler = () => {
        if (!setCtrPlayerModelData || isVideoList || dialogVisible) return;

        if (!isController) {
            setDialogVisible(true);
        } else {
            releaseControlAccess({
                id: deviceId
            }).then(res => {
                if (!res?.success) return;

                if (res.success) {
                    setCtrPlayerModelData!({
                        type: 'isController',
                        payload: false
                    });
                }
            });
        }
    };

    const controlAccessHandler = () => {
        setDialogVisible(false);

        obtainControlAccess({
            id: deviceId
        }).then(res => {
            if (!res?.success) return;

            if (res?.code?.toString().startsWith('20')) {
                setCtrPlayerModelData!({
                    type: 'isController',
                    payload: true
                });
            }
        });
    };

    return (
        <>
            <Icon
                name={isController ? 'control-active' : 'control'}
                title={'控制面板'}
                onClick={clickHandler}
                style={{ cursor: isVideoList ? 'not-allowed' : 'pointer' }}
                useStyles={{ cursor: isVideoList ? 'not-allowed' : 'pointer' }}
            />
            {
                dialogVisible && playerWrapperEle &&
                createPortal(
                    <div className={classes(cn, '')}>
                        <div className={classes(cn, 'wrapper')}>
                            <div className={classes(cn, 'content')}>
                                <Icon name={'tip'}/>
                                <label>当前无控制权限，是否获取权限</label>
                            </div>
                            <div className={classes(cn, 'btn')}>
                                <Button
                                    className={classes(cn, 'normal', ['cancel'])}
                                    size={'small'}
                                    type={'default'}
                                    onClick={() => setDialogVisible(false)}
                                >
                                    取消
                                </Button>
                                <Button
                                    className={classes(cn, 'normal')}
                                    size={'small'}
                                    type={'primary'}
                                    onClick={controlAccessHandler}
                                >
                                    确认
                                </Button>
                            </div>
                        </div>
                    </div>
                    , playerWrapperEle
                )
            }
        </>
    );
};

export default Controller;
