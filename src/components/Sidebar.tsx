import React from 'react';
import { PlayCircle, GitBranch, Square, Info } from 'lucide-react';

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Node Toolbox</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all">
                        <div className="p-2 rounded bg-indigo-50 text-indigo-600">
                            <PlayCircle size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">Action</div>
                            <div className="text-[10px] text-gray-400">Perform a task</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all">
                        <div className="p-2 rounded bg-blue-50 text-blue-500">
                            <GitBranch size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">Condition</div>
                            <div className="text-[10px] text-gray-400">Branch flow</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-red-300 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all">
                        <div className="p-2 rounded bg-red-50 text-red-500">
                            <Square size={16} />
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">End</div>
                            <div className="text-[10px] text-gray-400">Terminate flow</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 mt-auto bg-gray-50 border-t border-gray-200">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600 leading-relaxed">
                        <p className="font-medium mb-1 text-gray-900">How to use:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Hover connection lines to add nodes.</li>
                            <li>Click node titles to rename.</li>
                            <li>Use branches to split logic.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};
