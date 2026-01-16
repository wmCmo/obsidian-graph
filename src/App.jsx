import ForceGraph2D from 'react-force-graph-2d';
import { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { forceX, forceY } from 'd3-force';
import courses from './assets/courses';

const App = () => {
  const refGraph = useRef(null);
  const containerRef = useRef(null);

  const zoomTarget = useRef(1);
  const isAnimating = useRef(false);

  const [hoverNode, setHoverNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const rawData = useMemo(() => {
    const nodes = Array.from({ length: 100 }, (_, i) => ({ id: `id${i}`, name: `Name${i}`, value: 5 }));
    const links = Array.from({ length: 100 }, (_, i) => ({ source: `id${i}`, target: (i == 99) || (i == 49) ? "id0" : `id${i + 1}` })).concat([
      { source: "id2", target: "id42" },
      { source: "id9", target: "id42" },
      { source: "id23", target: "id42" },
      { source: "id69", target: "id42" },
      { source: "id88", target: "id42" }
    ]);
    return { nodes, links };
  }, []);

  const rawCourses = useMemo(() => {

    const tags = [...new Set(courses.map(course => course.tag))];
    const nodes = tags.map(tag => ({ id: tag, name: tag, value: 0.5, type: "tags" })).concat(courses.map(course => ({ id: course.name + course.source, name: course.name, value: 1, type: "courses" })));
    const links = courses.map(course => ({ source: course.name + course.source, target: course.tag }));
    return { nodes, links, tags };
  }, []);

  const getId = n => (typeof n === 'object' ? n.id : n);

  const coursesData = useMemo(() => {
    const { nodes, links } = rawCourses;

    const linkCount = {};
    const neighborMap = {};


    links.forEach(link => {
      const sourceId = getId(link.source);
      const targetId = getId(link.target);
      linkCount[sourceId] = (linkCount[sourceId] || 0) + 1;
      linkCount[targetId] = (linkCount[targetId] || 0) + 1;

      if (!neighborMap[sourceId]) neighborMap[sourceId] = new Set();
      if (!neighborMap[targetId]) neighborMap[targetId] = new Set();

      neighborMap[sourceId].add(targetId);
      neighborMap[targetId].add(sourceId);
    });

    const sizedNodes = nodes.map(node => ({
      ...node,
      val: 0.5 + (linkCount[node.id] || 0),
      neighbors: neighborMap[node.id] || new Set()
    }));

    return { nodes: sizedNodes, links };
  }, [rawCourses]);

  // const graphData = useMemo(() => {
  //   const { nodes, links } = rawData;

  //   const linkCount = {};

  //   links.forEach(link => {
  //     const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
  //     const targetId = typeof link.target === 'object' ? link.target.id : link.target;
  //     linkCount[sourceId] = (linkCount[sourceId] || 0) + 1;
  //     linkCount[targetId] = (linkCount[targetId] || 0) + 1;
  //   });

  //   const sizedNodes = nodes.map(node => ({
  //     ...node,
  //     val: 0.5 + (linkCount[node.id] || 0)
  //   }));

  //   return { nodes: sizedNodes, links };

  // }, [rawData]);

  useEffect(() => {
    if (!refGraph.current) return;
    refGraph.current.d3Force('x', forceX(0).strength(0.2));
    refGraph.current.d3Force('y', forceY(0).strength(0.2));
    refGraph.current.d3Force('charge').strength(-100);

    zoomTarget.current = refGraph.current.zoom();
  }, [coursesData]);

  const handleWheel = useCallback(e => {
    e.preventDefault();
    if (!refGraph.current) return;

    const currentZoom = refGraph.current.zoom();

    if (Math.abs(zoomTarget.current - currentZoom) > 0.5 && !isAnimating.current) {
      zoomTarget.current = currentZoom;
    }

    const zoomFactor = e.deltaY > 0 ? 0.85 : 1.15;
    zoomTarget.current *= zoomFactor;

    const clampedZoom = Math.max(0.1, Math.min(zoomTarget.current, 8));

    isAnimating.current = true;
    refGraph.current.zoom(clampedZoom, 400);

    setTimeout(() => { isAnimating.current = false; }, 400);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  const nodeDesc = courses.find(course => course.name === selectedNode?.name)?.desc;

  return (
    <main style={{ display: "flex" }}>
      <div ref={containerRef}>
        <ForceGraph2D ref={refGraph} graphData={coursesData}

          width={520}
          onNodeHover={node => setHoverNode(node || null)}
          onNodeClick={node => setSelectedNode(node)}
          backgroundColor='#1e1e1e'
          nodeLabel={node => {
            const currentZoom = refGraph.current ? refGraph.current.zoom() : 1;
            if (currentZoom < 1.5) return node.name;
            return "";
          }}
          pixelRatio={1}
          cooldownTicks={100}
          linkColor={link => {
            if (!hoverNode) return "#444444";

            const getId = n => (typeof n === 'object' && n !== null ? n.id : n);
            const hoverId = getId(hoverNode);
            const sourceId = getId(link.source);
            const targetId = getId(link.target);
            const isConnected = sourceId === hoverId || targetId === hoverId;

            return isConnected ? "#ffffff" : "rgba(50,50,50, 0.1)";
          }}
          nodeColor={node => {
            const defaultColor = node.type === 'tags' ? "#7655af" : "#b794f4";

            if (!hoverNode) return defaultColor;

            const isNeighbor = hoverNode.neighbors?.has?.(node.id) || false;
            const isHovered = getId(node) === getId(hoverNode);

            if (isHovered || isNeighbor) return defaultColor;

            return "rgb(50, 50, 50)";
          }}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;

            // OPTIONAL: Hide text if zoomed out too far (Obsidian style)
            if (globalScale < 1.5) return;

            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Light gray text

            const nodeSize = node.val || 1;
            const nodeId = getId(node);
            const hoverId = hoverNode ? getId(hoverNode) : null;
            const isHovered = hoverId !== null && nodeId === hoverId;
            const isNeighbor = hoverNode?.neighbors?.has?.(nodeId) || false;

            ctx.globalAlpha = hoverNode && !isHovered && !isNeighbor ? 0.2 : 1;

            // Draw the text slightly below the node
            ctx.fillText(label, node.x, node.y + 8 + (nodeSize * 0.8));

            ctx.globalAlpha = 1;
          }}

          // 3. Optional: Coloring nodes to look nice
          enableZoomInteraction={false}
          enablePanInteraction={true}
        />
      </div>
    </main>
  );
};

export default App;
