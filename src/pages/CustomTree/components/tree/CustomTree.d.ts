import React from 'react';
import './CustomTree.scss';
import { CustomTreeProps } from './CustomTreeProps';
interface CustomTreeviewState {
    loading: boolean;
    theme: string;
    expandAll?: boolean;
}
declare class CustomTree extends React.Component<CustomTreeProps, CustomTreeState> {
    api: any;
    container: any;
    constructor(props: CustomTreeProps);
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentDidMount(): void;
    expandAllFinished(): void;
    render(): JSX.Element;
}
export default CustomTree;
