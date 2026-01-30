import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowNode, WorkflowState, NodeType } from '../types';

interface WorkflowContextType {
    nodes: Record<string, WorkflowNode>;
    rootId: string;
    addNode: (parentId: string, type: NodeType, branchIndex?: number) => void;
    deleteNode: (nodeId: string) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
    saveWorkflow: () => WorkflowState;
    downloadWorkflow: () => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

const INITIAL_ROOT_ID = 'start-node';
const INITIAL_STATE: WorkflowState = {
    nodes: {
        [INITIAL_ROOT_ID]: {
            id: INITIAL_ROOT_ID,
            type: 'start',
            label: 'Start',
            children: [],
        },
    },
    rootId: INITIAL_ROOT_ID,
};

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<WorkflowState>(INITIAL_STATE);
    const [history, setHistory] = useState<WorkflowState[]>([INITIAL_STATE]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Helper to add state to history
    const addToHistory = useCallback((newState: WorkflowState) => {
        setHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(newState);
            // Limit history to 50 states
            if (newHistory.length > 50) {
                newHistory.shift();
                setHistoryIndex(prev => prev);
                return newHistory;
            }
            setHistoryIndex(newHistory.length - 1);
            return newHistory;
        });
    }, [historyIndex]);

    const addNode = useCallback((parentId: string, type: NodeType, branchIndex: number = 0) => {
        const newNodeId = uuidv4();
        const newNode: WorkflowNode = {
            id: newNodeId,
            type,
            label: type === 'branch' ? 'Condition' : type === 'end' ? 'End' : 'New Action',
            children: [],
        };

        setState((prev) => {
            const parent = prev.nodes[parentId];
            if (!parent) return prev;

            const newNodes = { ...prev.nodes };
            const oldChildId = parent.children[branchIndex];

            const updatedParent = {
                ...parent,
                children: [...parent.children]
            };

            if (parent.type === 'branch') {
                if (!oldChildId) {
                    updatedParent.children[branchIndex] = newNodeId;
                } else {
                    updatedParent.children[branchIndex] = newNodeId;
                    if (type !== 'end') {
                        newNode.children = [oldChildId];
                    }
                }
            } else {
                updatedParent.children[0] = newNodeId;

                if (oldChildId && type !== 'end') {
                    newNode.children = [oldChildId];
                }
            }

            newNodes[parentId] = updatedParent;
            newNodes[newNodeId] = newNode;

            const newState = { ...prev, nodes: newNodes };
            addToHistory(newState);
            return newState;
        });
    }, [addToHistory]);

    const deleteNode = useCallback((nodeId: string) => {
        setState((prev) => {
            if (nodeId === prev.rootId) return prev;

            const nodeToDelete = prev.nodes[nodeId];
            if (!nodeToDelete) return prev;

            const parentId = Object.keys(prev.nodes).find(key => prev.nodes[key].children.includes(nodeId));
            if (!parentId) return prev;

            const parent = prev.nodes[parentId];
            const newNodes = { ...prev.nodes };

            delete newNodes[nodeId];

            const childToInherit = nodeToDelete.children[0];
            const childIndex = parent.children.indexOf(nodeId);
            const updatedParent = { ...parent, children: [...parent.children] };

            if (childToInherit) {
                updatedParent.children[childIndex] = childToInherit;
            } else {
                if (parent.type === 'branch') {
                    updatedParent.children.splice(childIndex, 1);
                } else {
                    updatedParent.children = [];
                }
            }

            newNodes[parentId] = updatedParent;
            const newState = { ...prev, nodes: newNodes };
            addToHistory(newState);
            return newState;
        });
    }, [addToHistory]);

    const updateNodeLabel = useCallback((nodeId: string, label: string) => {
        setState((prev) => {
            const newState = {
                ...prev,
                nodes: {
                    ...prev.nodes,
                    [nodeId]: { ...prev.nodes[nodeId], label }
                }
            };
            return newState;
        });
    }, []);

    const saveWorkflow = useCallback(() => {
        console.log('Workflow Data:', JSON.stringify(state, null, 2));
        return state;
    }, [state]);

    const downloadWorkflow = useCallback(() => {
        const dataStr = JSON.stringify(state, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `workflow-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [state]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setState(history[newIndex]);
        }
    }, [history, historyIndex]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setState(history[newIndex]);
        }
    }, [history, historyIndex]);

    const value = {
        nodes: state.nodes,
        rootId: state.rootId,
        addNode,
        deleteNode,
        updateNodeLabel,
        saveWorkflow,
        downloadWorkflow,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
    };

    return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

export const useWorkflow = () => {
    const context = useContext(WorkflowContext);
    if (context === undefined) {
        throw new Error('useWorkflow must be used within a WorkflowProvider');
    }
    return context;
};
