import React, { useEffect } from "react";
import { Network, Data, Options } from "vis-network/standalone";

interface Props {
  data: Data;
  options?: Options;
}

const defaultOptions = {
  autoResize: true,
  width: '100%'
}

const containerId = "graphViz";

export const GraphViz: React.FC<Props> = ({ data, options }) => {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Unable to find container with id "${containerId}"`);
    }
    
    // Render after a short delay
    // This allows the library to calculate the painted container
    setTimeout(() => {
      new Network(container, data, {
        ...defaultOptions,
        ...options,
      });
    }, 250)

  }, [data, options]);

  return <div id={containerId}></div>;
};
