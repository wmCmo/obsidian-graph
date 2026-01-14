import { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide, forceX, forceY } from 'd3-force';

const tags = ["♟️Business Strategy", "🎨Frontend Development", "🌐Web Development", "🌱Personal Development", "🏗️Software Architecture", "💬Communication", "💻Programming", "💼HR Management", "📅Project Management", "📈Data Visualization", "📊Data Analysis", "📐Statistics", "🔌Backend Development", "🔧Data Engineering", "🗄️Databases", "🤖AI&ML", "🧭Leadership", "🚀Dev OPs", "🛠️Development Tools"];

const courses = {
  nodes: tags.map(tag => ({ id: tag.at(), name: tag, value: 5 })),
  links: []
};

const myData = {
  nodes: Array.from({ length: 100 }, (_, i) => ({ id: `id${i}`, name: `Name${i}`, value: 5 }))
  ,
  links: Array.from({ length: 100 }, (_, i) => ({ source: `id${i}`, target: (i == 99) || (i == 49) ? "id0" : `id${i + 1}` }))
  // [
  //   { source: 'id1', target: 'id2' },
  //   { source: 'id2', target: 'id3' },
  //   { source: 'id3', target: 'id4' }
  // ]
};

const myDataB = {
  nodes: [
    { id: 'a', name: 'a', value: 2 },
    { id: 'b', name: 'b', value: 4 }
  ],
  links: []
};

function Test() {
  const fgRefA = useRef(null);
  const fgRefB = useRef(null);
  const simModeA = useRef('idle');
  const simModeB = useRef('idle');
  const dragStateA = useRef({ activated: false });
  const dragStateB = useRef({ activated: false });
  const graphShadow = 'drop-shadow(0px 9px 7px rgb(98, 95, 255))';

  const BASE_ALPHA = 0.02;

  const wakeEngine = (fg) => {
    if (!fg) return;
    // If the internal simulation loop has cooled/stopped, this restarts it.
    // We immediately clamp alpha back down so there is no visible "force spike".
    fg.d3ReheatSimulation?.();
    if (typeof fg.d3Alpha === 'function') fg.d3Alpha(BASE_ALPHA);
    fg.d3AlphaTarget?.(BASE_ALPHA);
  };

  const setSimMode = (fg, mode, modeRef) => {
    if (!fg) return;
    if (modeRef?.current === mode) return;
    if (modeRef) modeRef.current = mode;

    // `d3VelocityDecay` is basically friction:
    // - lower => more inertia/glide
    // - higher => more damping/settles faster
    if (mode === 'active') {
      fg.d3VelocityDecay?.(0.15);
    } else {
      fg.d3VelocityDecay?.(0.65);
    }
  };

  const onNodeDragActivate = (fgRef, simModeRef, dragStateRef) => {
    const state = dragStateRef.current;
    // `onNodeDrag` only fires once the pointer actually moves (not on mouse down),
    // so this avoids the "squish on hold" problem while still waking reliably.
    if (!state.activated) {
      state.activated = true;
      wakeEngine(fgRef.current);
      setSimMode(fgRef.current, 'active', simModeRef);
    }
  };

  useEffect(() => {
    const configureForces = (fg) => {
      if (!fg) return;

      const spread = 3;

      // Make the layout feel more like Obsidian: less repulsion, stronger links, more damping.
      const chargeForce = fg.d3Force('charge');
      chargeForce?.strength(-100 * spread);
      if (typeof chargeForce?.distanceMax === 'function') chargeForce.distanceMax(260 * spread);

      const linkForce = fg.d3Force('link');
      linkForce?.distance(50 * spread);
      if (typeof linkForce?.iterations === 'function') linkForce.iterations(6);

      // Prevent nodes from overlapping, regardless of how connected they are.
      // Tune the radius to match your node size (increase if nodes still touch).
      fg.d3Force('collide', forceCollide(20 * spread).strength(1));

      // Pull everything gently toward the center so disconnected clusters attract each other.
      fg.d3Force('x', forceX(0).strength(0.2));
      fg.d3Force('y', forceY(0).strength(0.2));

      // Keep the engine running at a low, steady temperature.
      // This avoids the "gravity suddenly stronger" feeling caused by reheating/alpha spikes.
      fg.d3AlphaTarget?.(BASE_ALPHA);
      if (typeof fg.d3Alpha === 'function') fg.d3Alpha(BASE_ALPHA);

      // Reheat a bit when mounted so the new forces take effect.
      fg.d3ReheatSimulation();
    };

    configureForces(fgRefA.current);
    configureForces(fgRefB.current);
  }, []);

  return (
    <div style={{ backgroundColor: "#262626", height: 1000 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-around", height: "100%", alignItems: "center" }}>
        <div style={{ filter: graphShadow, borderRadius: "4em", overflow: "hidden" }}>
          <ForceGraph2D
            ref={fgRefA}
            // graphData={courses}
            graphData={myData}
            width={520}
            height={520}
            backgroundColor='#1E1E1E'
            d3AlphaDecay={0.02}
            d3AlphaMin={0.001}
            d3VelocityDecay={0.65}
            cooldownTicks={Infinity}
            cooldownTime={Infinity}
            linkColor={() => "#AAAAB3"}
            nodeColor={() => '#aaaaaa'}
            onNodeDrag={() => onNodeDragActivate(fgRefA, simModeA, dragStateA)}
            onNodeDragEnd={(node) => {
              // Release the node back to the simulation.
              node.fx = null;
              node.fy = null;

              dragStateA.current.activated = false;
              setSimMode(fgRefA.current, 'idle', simModeA);
            }}
            nodeCanvasObjectMode={() => 'after'}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name ?? node.id;
              const fontSize = 12;
              ctx.font = `bold ${fontSize}px Montserrat`;
              const textWidth = ctx.measureText(label).width;
              const padding = 2 / globalScale;

              ctx.fillStyle = 'rgba(255, 255, 255, 0)';
              ctx.fillRect(
                node.x - textWidth / 2 - padding,
                node.y,
                textWidth + padding * 2,
                fontSize + padding * 2
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              ctx.fillStyle = 'white';
              ctx.fillText(label, node.x, node.y + 6 / globalScale + padding);
            }}
          />
        </div>

        <div style={{ filter: graphShadow }}>
          <div
            id='crop-this'
            style={{
              width: 520,
              height: 520,
              borderRadius: 100,
              overflow: 'hidden',
              lineHeight: 0
            }}
          >
            {/* <ForceGraph2D
              ref={fgRefB}
              graphData={myDataB}
              backgroundColor='#1E1E1E'
              width={520}
              height={520}
              d3VelocityDecay={0.65}
              onNodeDrag={() => setSimMode(fgRefB.current, 'active', simModeB)}
              onNodeDragEnd={(node) => {
                node.fx = null;
                node.fy = null;
                setSimMode(fgRefB.current, 'idle', simModeB);
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
