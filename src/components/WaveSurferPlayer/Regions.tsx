import React, { useState, useEffect } from "react"
import WaveSurfer from "wavesurfer.js"
import RegionsPlugin, { Region } from "wavesurfer.js/dist/plugins/regions.js"
import { Button, Group, useMantineTheme, Stack } from "@mantine/core"

interface RegionsFileProps {
  wavesurfer: WaveSurfer
  setActiveRegion: (region: Region | null) => void
  setCuePoint: (region: Region | null) => void
  loop?: boolean
}

const RegionsFile: React.FC<RegionsFileProps> = ({
  wavesurfer,
  setActiveRegion,
  setCuePoint,
  loop,
}) => {
  const theme = useMantineTheme()
  const [wsRegions, setWsRegions] = useState<RegionsPlugin | null>(null)
  const [savedRegions, setSavedRegions] = useState<Region[] | null>([])

  useEffect(() => {
    if (wavesurfer) {
      setWsRegions(wavesurfer.registerPlugin(RegionsPlugin.create()))
    }
  }, [wavesurfer])

  useEffect(() => {
    if (wsRegions) {
      const regionOutHandler = (region: Region) => {
        if (loop) {
          region.play()
        } else {
          setActiveRegion(null)
        }
      }
      const subscriptions = [
        wavesurfer.on("decode", () => {
          wsRegions.enableDragSelection({
            color: "rgba(255, 0, 0, 0.2)",
          })
          setCuePoint(
            wsRegions.addRegion({
              id: "CUE",
              start: 5.05,
              color: "orange",
            }),
          )
          const seekToPercentage =
            wsRegions.getRegions()[0].start /
            wavesurfer!.getDecodedData()!.duration
          wavesurfer?.seekTo(seekToPercentage)
        }),

        wavesurfer.on("ready", () => {
          wsRegions.on("region-double-clicked", (region: Region) => {
            if (region !== wsRegions.getRegions()[0]) region.remove()
            const newRegions = wsRegions.getRegions()
            setSavedRegions([...newRegions])
          })

          wsRegions.on("region-created", () => {
            const newRegions = wsRegions.getRegions()
            setSavedRegions([...newRegions])
          })

          wsRegions.on("region-updated", () => {
            const updatedCuepoint = wsRegions.getRegions()[0]
            const seekToPercentage =
              updatedCuepoint!.start / wavesurfer!.getDecodedData()!.duration
            if (!wavesurfer.isPlaying()) wavesurfer?.seekTo(seekToPercentage)
          })
        }),
        wavesurfer.on("audioprocess", () => {
          wsRegions.on("region-in", (region: Region) => {
            setActiveRegion(region)
          })
        }),
        wsRegions.on("region-out", regionOutHandler),
      ]
      return () => {
        subscriptions.forEach((unsub) => unsub())
      }
    }
  }, [loop, setActiveRegion, setCuePoint, wavesurfer, wsRegions])

  return (
    <Stack>
      <Group>
        {savedRegions?.map(
          (region: Region, i) =>
            i > 0 && (
              <Button
                key={i}
                color={theme.colors.yellow[9 - i]}
                onClick={() => {
                  region.play()
                }}
              >
                {i}
              </Button>
            ),
        )}
      </Group>
    </Stack>
  )
}

export default RegionsFile
