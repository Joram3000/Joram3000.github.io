import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js";
import { Button, Group, useMantineTheme, Stack } from "@mantine/core";

interface RegionsFileProps {
  wavesurfer: WaveSurfer;
  setActiveRegion: (region: Region | null) => void;
  loop?: boolean;
  cuePlay?: () => void;
}

const RegionsFile: React.FC<RegionsFileProps> = ({
  wavesurfer,
  setActiveRegion,
}) => {
  const theme = useMantineTheme();
  const [wsRegions, setWsRegions] = useState<RegionsPlugin | null>(null);

  useEffect(() => {
    if (wavesurfer)
      setWsRegions(wavesurfer.registerPlugin(RegionsPlugin.create()));
  }, [wavesurfer]);

  useEffect(() => {
    if (wsRegions) {
      wavesurfer?.on("decode", () => {
        wsRegions.enableDragSelection({
          color: "rgba(255, 0, 0, 0.2)",
        });
        wsRegions.addRegion({
          id: "CUE",
          start: 5.0,
          color: "red",
        });
      });
      wavesurfer?.on("ready", () => {
        wsRegions?.on("region-clicked", () => {
          console.log("a region is clicked");
        });
        wsRegions?.on("region-double-clicked", (region: Region) =>
          region.remove()
        );

        wsRegions?.on("region-in", (region: Region) => setActiveRegion(region));
        wsRegions?.on("region-out", () => {
          setActiveRegion(null);
        });
      });
    }
  }, [wsRegions]);

  // useEffect(() => {
  //   if (loop) {
  //     wsRegions?.on("region-out", (region: Region) => {
  //       playRegion(region);
  //     });
  //   }
  // }, [loop]);

  const playRegion = (region: Region) => {
    region.play();
  };

  return (
    <Stack>
      <Group>
        {wsRegions &&
          wsRegions.getRegions().map(
            (region: Region, i) =>
              i > 0 && (
                <Button
                  color={theme.colors.yellow[9 - i]}
                  key={i}
                  onClick={() => playRegion(region)}
                >
                  {i}
                </Button>
              )
          )}
      </Group>
    </Stack>
  );
};

export default RegionsFile;
