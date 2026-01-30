import React, { useState } from 'react';
import { useWorkflow } from '../store/WorkflowContext';
import { Plus, Trash2, PlayCircle, GitBranch, Square } from 'lucide-react';

interface NodeProps {
    nodeId: string;
}

interface DeleteModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            pointerEvents: 'auto'
        }}>
            <div style={{
                backgroundColor: '#1f2937',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                animation: 'slideIn 0.2s ease-out'
            }}>
                <h3 style={{
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem'
                }}>
                    Delete this node?
                </h3>
                <p style={{
                    color: '#9ca3af',
                    fontSize: '0.875rem',
                    marginBottom: '1.5rem'
                }}>
                    This action cannot be undone. The node will be removed from the workflow.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '0.5rem 1.25rem',
                            backgroundColor: '#374151',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '0.5rem 1.25rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export const WorkflowNodeComponent: React.FC<NodeProps> = ({ nodeId }) => {
    const { nodes, addNode, deleteNode, updateNodeLabel } = useWorkflow();
    const node = nodes[nodeId];

    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!node) return null;

    const handleAddClick = (type: 'action' | 'branch' | 'end') => {
        addNode(nodeId, type);
        setShowAddMenu(false);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        deleteNode(nodeId);
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const isBranch = node.type === 'branch';

    const renderIcon = () => {
        switch (node.type) {
            case 'start': return <PlayCircle size={14} />;
            case 'action': return <PlayCircle size={14} />;
            case 'branch': return <GitBranch size={14} />;
            case 'end': return <Square size={14} />;
            default: return <PlayCircle size={14} />;
        }
    };

    const handleAddToBranch = (index: number) => {
        addNode(nodeId, 'action', index);
    };

    return (
        <div className="node-wrapper">
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            {/* Node Card */}
            <div className={`node-card type-${node.type}`}>
                <div className="node-header">
                    {renderIcon()}
                    <span>{node.type}</span>
                </div>

                <div className="node-body">
                    <input
                        value={node.label}
                        onChange={(e) => updateNodeLabel(nodeId, e.target.value)}
                        className="node-label-input"
                        readOnly={node.type === 'start'}
                    />
                </div>

                {/* Delete Button */}
                {node.type !== 'start' && (
                    <button
                        className="delete-btn"
                        onClick={handleDeleteClick}
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>

            {/* Logic for Children & Connections */}
            {node.type !== 'end' && (
                <>
                    {!isBranch && (
                        <div className="add-node-wrapper">
                            <button
                                className="add-node-btn"
                                onClick={() => setShowAddMenu(!showAddMenu)}
                            >
                                <Plus size={16} />
                            </button>

                            {showAddMenu && (
                                <div className="add-menu">
                                    <button className="add-menu-item" onClick={() => handleAddClick('action')}>
                                        <PlayCircle size={14} className="text-indigo-600" /> Action
                                    </button>
                                    <button className="add-menu-item" onClick={() => handleAddClick('branch')}>
                                        <GitBranch size={14} className="text-blue-500" /> Condition
                                    </button>
                                    <button className="add-menu-item" onClick={() => handleAddClick('end')}>
                                        <Square size={14} className="text-red-500" /> End
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isBranch && <div className="h-6 w-px bg-slate-300"></div>}

                    <div className={`children-container ${isBranch ? 'branch-children' : ''}`}>
                        {isBranch ? (
                            <>
                                {[0, 1].map((index) => {
                                    const childId = node.children[index];
                                    return (
                                        <div key={index} className="branch-child-col">
                                            <div className="branch-label">
                                                {index === 0 ? 'TRUE' : 'FALSE'}
                                            </div>

                                            {childId ? (
                                                <WorkflowNodeComponent nodeId={childId} />
                                            ) : (
                                                <div
                                                    className="empty-branch-placeholder"
                                                    onClick={() => handleAddToBranch(index)}
                                                >
                                                    <Plus size={24} className="mb-2 opacity-50" />
                                                    <span className="text-xs font-medium">Add Step</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            node.children.map(childId => (
                                <WorkflowNodeComponent key={childId} nodeId={childId} />
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
