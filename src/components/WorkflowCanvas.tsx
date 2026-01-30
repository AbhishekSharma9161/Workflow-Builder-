import React, { useState } from 'react';
import { useWorkflow } from '../store/WorkflowContext';
import { WorkflowNodeComponent } from './Node';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export const WorkflowCanvas: React.FC = () => {
    const { rootId } = useWorkflow();
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 10, 50));
    };

    const handleResetZoom = () => {
        setZoom(100);
    };

    return (
        <div className="workflow-canvas">
            {/* Zoom Controls - Bottom Left */}
            <div style={{
                position: 'fixed',
                bottom: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '0.5rem',
                zIndex: 30
            }}>
                <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    style={{
                        padding: '0.5rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: zoom >= 200 ? 'not-allowed' : 'pointer',
                        color: zoom >= 200 ? '#cbd5e1' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (zoom < 200) e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title="Zoom In"
                >
                    <ZoomIn size={20} />
                </button>

                <div style={{
                    height: '1px',
                    backgroundColor: '#e2e8f0',
                    margin: '0.25rem 0'
                }}></div>

                <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 50}
                    style={{
                        padding: '0.5rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: zoom <= 50 ? 'not-allowed' : 'pointer',
                        color: zoom <= 50 ? '#cbd5e1' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        if (zoom > 50) e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title="Zoom Out"
                >
                    <ZoomOut size={20} />
                </button>

                <div style={{
                    height: '1px',
                    backgroundColor: '#e2e8f0',
                    margin: '0.25rem 0'
                }}></div>

                <button
                    onClick={handleResetZoom}
                    style={{
                        padding: '0.5rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    title="Reset Zoom"
                >
                    <Maximize2 size={20} />
                </button>

                <div style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    marginTop: '0.25rem',
                    fontWeight: 500
                }}>
                    {zoom}%
                </div>
            </div>

            {/* Workflow Content with Zoom */}
            <div style={{
                paddingTop: '2rem',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out'
            }}>
                <WorkflowNodeComponent nodeId={rootId} />
            </div>
        </div>
    );
};
