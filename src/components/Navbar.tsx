import React, { useState } from 'react';
import { Layers, Share2, Download, Undo, Redo } from 'lucide-react';
import { useWorkflow } from '../store/WorkflowContext';

export const Navbar: React.FC = () => {
    const { saveWorkflow, downloadWorkflow, undo, redo, canUndo, canRedo } = useWorkflow();
    const [showShareMenu, setShowShareMenu] = useState(false);

    const handleCopyJSON = () => {
        const data = saveWorkflow();
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert('JSON copied to clipboard!');
        setShowShareMenu(false);
    };

    const handleShareEmail = () => {
        const data = saveWorkflow();
        const subject = encodeURIComponent('Workflow Builder - Shared Workflow');
        const body = encodeURIComponent(`Here's my workflow:\n\n${JSON.stringify(data, null, 2)}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        setShowShareMenu(false);
    };

    const handleShareLink = () => {
        const data = saveWorkflow();
        const encoded = btoa(JSON.stringify(data));
        const url = `${window.location.origin}?workflow=${encoded}`;
        navigator.clipboard.writeText(url);
        alert('Shareable link copied to clipboard!');
        setShowShareMenu(false);
    };

    return (
        <header style={{
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            flexShrink: 0,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: 700, fontSize: '1.25rem' }}>
                    <Layers style={{ width: '24px', height: '24px' }} />
                    <span>Workflow Builder</span>
                </div>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <button style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)'
                    }}>Workflows</button>
                </nav>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Undo/Redo */}
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                        onClick={undo}
                        disabled={!canUndo}
                        style={{
                            padding: '0.5rem',
                            color: canUndo ? 'white' : 'rgba(255,255,255,0.4)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: canUndo ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Undo"
                    >
                        <Undo style={{ width: '18px', height: '18px' }} />
                    </button>
                    <button
                        onClick={redo}
                        disabled={!canRedo}
                        style={{
                            padding: '0.5rem',
                            color: canRedo ? 'white' : 'rgba(255,255,255,0.4)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: canRedo ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        title="Redo"
                    >
                        <Redo style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>

                <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>

                {/* Share Button with Dropdown */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            border: '1px solid rgba(255,255,255,0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <Share2 style={{ width: '16px', height: '16px' }} />
                        Share
                    </button>

                    {showShareMenu && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 0.5rem)',
                            right: 0,
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            padding: '0.5rem',
                            minWidth: '200px',
                            zIndex: 50
                        }}>
                            <button
                                onClick={handleCopyJSON}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.625rem 0.75rem',
                                    fontSize: '0.875rem',
                                    color: '#0f172a',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                📋 Copy JSON
                            </button>
                            <button
                                onClick={handleShareLink}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.625rem 0.75rem',
                                    fontSize: '0.875rem',
                                    color: '#0f172a',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                🔗 Copy Share Link
                            </button>
                            <button
                                onClick={handleShareEmail}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '0.625rem 0.75rem',
                                    fontSize: '0.875rem',
                                    color: '#0f172a',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    borderRadius: '0.375rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                ✉️ Share via Email
                            </button>
                        </div>
                    )}
                </div>

                {/* Download Workflow Button */}
                <button
                    onClick={downloadWorkflow}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'white',
                        color: '#667eea',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                    }}
                >
                    <Download style={{ width: '16px', height: '16px' }} />
                    Download Workflow
                </button>
            </div>
        </header>
    );
};
