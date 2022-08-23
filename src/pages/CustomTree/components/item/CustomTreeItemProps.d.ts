import CustomTree from '../tree/CustomTree';
export interface CustomTreeItemProps {
    treeview: CustomTree;
    item: number;
    parent?: any;
    level: number;
    root?: any;
    selectRow?: boolean;
    expandAll?: boolean;
}
