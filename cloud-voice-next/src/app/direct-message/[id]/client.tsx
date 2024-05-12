"use client";

import React, { useEffect } from "react";

let Client = () => {
  useEffect(() => {
    const init = {
        output: (e) => {
            console.info('output');
        },
        error: (e) => {
          console.log(e.message);
        },
      };
      
    let config = {
      codec: "opus",
      sampleRate: 44100,
      numberOfChannels: 2,
      bitrate: 128_000, // 128 kbps
    };
    //@ts-ignore
    let encoder = new AudioEncoder(init);
    encoder.configure(config);
  });
  return <p>asd</p>;
};
export default Client;
