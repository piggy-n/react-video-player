import type { FC } from 'react';

export interface HeaderProps {
    onMouseOver: (arg: boolean) => void;
}

export interface HeaderInterface extends FC<HeaderProps> {
    Equipment: FC<EquipmentProps>;
    PlayerController: FC<PlayerControllerProps>;
}

export interface EquipmentProps {
    name: string;
    online?: boolean;
    showStatus?: boolean;
}

export interface PlayerControllerProps {

}