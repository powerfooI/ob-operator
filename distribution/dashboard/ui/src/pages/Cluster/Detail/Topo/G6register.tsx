//@ts-nocheck
import { Group, Image, Rect, Text } from '@antv/g6-react-node';

import moreImg from '@/assets/more.svg';


const nodeWidth = 150;
const nodeheight = 48;


function config(width: number, height: number) {
  return {
    container: 'topoContainer',
    width,
    height,
    linkCenter: true,
    // fitCenter: true,
    fitView: true,
    maxZoom: 2,
    minZoom: 0.2,
    layout: {
      type: 'compactBox',
      direction: 'TB',
      getId: function getId(d: any) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
      getVGap: function getVGap() {
        return 40;
      },
      getHGap: function getHGap() {
        return 70;
      },
    },
    defaultEdge: {
      type: 'flow-line',
      sourceAnchor: 0,
      targetAnchor: 1,
      style: {
        radius: 8,
        stroke: '#c5cbd4',
      },
    },
    defaultNode: {
      style: {
        width: 100,
        height: 48,
        fill: 'rgb(19,33,92)',
        radius: 5,
      },
      anchorPoints: [
        [0.9, 0.5],
        [0, 0.5],
      ],
    },
    nodeStateStyles: {
      hover: {
        fill: '#fff',
        shadowBlur: 30,
        shadowColor: '#ddd',
      },
      operatorhover: {
        'operator-box': {
          opacity: 1,
        },
      },
    },
    modes: {
      default: [
        'zoom-canvas',
        'drag-canvas',
        // {
        //   type: 'tooltip',
        //   formatText(model: any) {
        //     return TopoTooltip(model.type, tooltipData);
        //   },
        //   offset: 10,
        // },
      ],
    },
  };
}

const reactStyles = {
  width: nodeWidth,
  height: nodeheight,
  fill: '#fff',
  radius: 5,
};

function ReactNode(handleClick?: any) {
  return ({ cfg }: any) => {
    const { label, status } = cfg;
    return (
      <Group>
        <Rect
          style={{ ...reactStyles }}
          name="container"
        >
          <Image
            style={{
              img: cfg.img,
              width: 50,
              height: 50,
              x: 10,
              y: -20,
              position: 'absolute',
            }}
            name="logo"
            zIndex={99}
          />
          <Text
            style={{
              position: 'absolute',
              fontSize: 12,
              x: nodeWidth / 2 - 12,
              y: nodeheight / 2,
              fill: 'rgb(0,0,0,.85)',
            }}
            name="clusterTitle"
          >
            {label}
          </Text>
          <Image
            style={{
              position: 'absolute',
              img: cfg.badgeImg,
              x: nodeWidth / 2 - 25,
              y: nodeheight / 2 + 10,
              width: 12,
              height: 12,
            }}
            name="clusterBadge"
            zIndex={99}
          />
          <Text
            style={{
              position: 'absolute',
              fontSize: 8,
              fill: 'rgb(0,0,0,.45)',
              x: nodeWidth / 2 - 12,
              y: nodeheight / 2 + 20,
            }}
          >
            {status}
          </Text>
          {cfg.type !== 'server' && (
            <Image
              onClick={handleClick}
              id={cfg.label}
              style={{
                position: 'absolute',
                x: 130,
                y: 16,
                width: 2.5,
                height: 16,
                cursor: 'pointer',
                img: moreImg,
              }}
              name="moreImg"
            />
          )}
        </Rect>
      </Group>
    );
  };
}

export { ReactNode, config };
