export interface PlayerProps {
    /**
     * width of the player
     */
    width?: number;
    /**
     * height of the player
     */
    height?: number;
    /**
     * minWidth are used to set the minimum width of the player
     */
    minWidth?: number;
    /**
     * minHeight are used to set the minimum height of the player
     */
    minHeight?: number;
    /**
     * resize is used to enable or disable the resize functionality of the player
     */
    resize?: boolean;
}

export type DefaultSize = {
    width: number;
    height: number;
}