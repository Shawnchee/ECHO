"use client";

import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { nodeTypes } from "./graph-nodes";
import { generateMockGossipData, GossipNode as DataNode } from "@/lib/mock-data";
import { ZoomIn, ZoomOut, Maximize2, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import type { WalletAnalysis } from "@/lib/privacy-engine";

interface GossipGraphProps {
  address: string;
  analysis?: WalletAnalysis | null;
}

// Convert mock data to React Flow format
function convertToReactFlowFormat(data: ReturnType<typeof generateMockGossipData>) {
  const nodes: Node[] = data.nodes.map((node, index) => {
    const isMain = node.id === data.nodes[0].id;
    
    // Calculate position in a circular layout
    const radius = isMain ? 0 : 300;
    const angle = isMain ? 0 : (2 * Math.PI * (index - 1)) / (data.nodes.length - 1);
    const x = isMain ? 400 : 400 + radius * Math.cos(angle);
    const y = isMain ? 300 : 300 + radius * Math.sin(angle);

    return {
      id: node.id,
      type: node.type,
      position: { x, y },
      data: {
        ...node,
        isMain,
      },
    };
  });

  const edges: Edge[] = data.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: "smoothstep",
    animated: edge.riskLevel === "high",
    style: {
      stroke:
        edge.riskLevel === "high"
          ? "#ef4444"
          : edge.riskLevel === "medium"
            ? "#f59e0b"
            : "#10b981",
      strokeWidth: 2,
      opacity: 0.6,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color:
        edge.riskLevel === "high"
          ? "#ef4444"
          : edge.riskLevel === "medium"
            ? "#f59e0b"
            : "#10b981",
    },
    label: edge.amount ? `${edge.amount.toFixed(2)} SOL` : undefined,
    labelStyle: {
      fill: "#fff",
      fontSize: 10,
      fontFamily: "monospace",
    },
    labelBgStyle: {
      fill: "#000",
      fillOpacity: 0.8,
    },
  }));

  return { nodes, edges };
}

export function GossipGraph({ address, analysis }: GossipGraphProps) {
  const mockData = useMemo(() => generateMockGossipData(address), [address]);
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertToReactFlowFormat(mockData),
    [mockData]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showRiskPaths, setShowRiskPaths] = useState(true);

  const toggleRiskPaths = useCallback(() => {
    setShowRiskPaths((prev) => !prev);
    if (showRiskPaths) {
      // Hide high-risk edges
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          hidden: mockData.edges.find((e) => e.id === edge.id)?.riskLevel === "high",
        }))
      );
    } else {
      // Show all edges
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          hidden: false,
        }))
      );
    }
  }, [showRiskPaths, setEdges, mockData.edges]);

  return (
    <div className="h-full w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-black/20"
        minZoom={0.1}
        maxZoom={2}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#10b981"
          className="opacity-20"
        />
        
        <Controls
          className="!bg-black/80 !border-green-500/30 [&>button]:!bg-black/60 [&>button]:!border-green-500/30 [&>button]:!text-green-400 [&>button:hover]:!bg-green-500/20"
        />

        {/* Custom Control Panel */}
        <Panel position="top-right" className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={toggleRiskPaths}
              size="sm"
              variant="outline"
              className="bg-black/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-green-500/10 font-mono text-xs"
            >
              {showRiskPaths ? (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Hide Risk Paths
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Show Risk Paths
                </>
              )}
            </Button>
          </motion.div>
        </Panel>

        {/* Legend */}
        <Panel position="bottom-left" className="!bg-black/80 !backdrop-blur-sm !border !border-green-500/20 !rounded-lg !p-3">
          <div className="space-y-2">
            <div className="text-xs font-mono text-green-400 font-bold mb-2">Legend</div>
            
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400 font-mono">Wallet</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-400 font-mono">Program</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <span className="text-xs text-gray-400 font-mono">Token</span>
            </div>
            
            <div className="border-t border-green-500/20 my-2"></div>
            
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-6 bg-green-500"></div>
              <span className="text-xs text-gray-400 font-mono">Low Risk</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-6 bg-yellow-500"></div>
              <span className="text-xs text-gray-400 font-mono">Medium Risk</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-6 bg-red-500"></div>
              <span className="text-xs text-gray-400 font-mono">High Risk</span>
            </div>
          </div>
        </Panel>

        {/* Loading Overlay (for future API integration) */}
        {false && (
          <Panel position="top-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/90 backdrop-blur-sm border border-green-500/30 rounded-lg px-4 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-400 font-mono">Analyzing gossip chain...</span>
              </div>
            </motion.div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}
