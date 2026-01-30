export type NodeType = 'start' | 'action' | 'branch' | 'end';

export interface WorkflowNode {
    id: string;
    type: NodeType;
    label: string;
    children: string[]; // IDs of children nodes
}

export interface WorkflowState {
    nodes: Record<string, WorkflowNode>;
    rootId: string;
}
