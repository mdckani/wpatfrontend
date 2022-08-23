import { CSSProperties } from "react";
import CustomTree from "./CustomTree";
export interface CustomTreeProps {
    className?: string;
    style?: CSSProperties;
    actionButtons?: JSX.Element[];
    autoLoad?: boolean;
    json?: string;
    items?: any[];
    lazyLoad?: boolean;
    expandAll?: boolean;
    marginItems?: string | number;
    onAfterLoad?: (data: any, item: any) => void;
    onBeforeLoad?: (data: any, item: any) => void;
    onRenderItem?: (item: any, treeview: CustomTree) => JSX.Element;
    onSelectItem?: (item: any) => void;
    onCheckItem?: void;
    selectRow?: boolean;
    showCheckbox?: boolean;
    showIcon?: boolean;
    showRoot?: boolean;
    theme?: string;
    url?: string;
    onActionButtonClick?: (item: any, actionButton: any) => void;
}