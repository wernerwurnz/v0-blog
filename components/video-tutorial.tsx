"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Maximize2, Minimize2, PlayCircle } from "lucide-react"

interface VideoTutorialProps {
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  downloadUrl?: string
  transcriptContent?: string
  resourcesContent?: string
}

export function VideoTutorial({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  downloadUrl,
  transcriptContent,
  resourcesContent,
}: VideoTutorialProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const toggleFullscreen = () => {
    const videoElement = document.getElementById("video-player") as HTMLVideoElement

    if (!isFullscreen) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  // Extract video ID from YouTube URL if it's a YouTube video
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = getYouTubeId(videoUrl)
  const isYouTube = !!youtubeId

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative">
        {!isPlaying ? (
          <div className="relative aspect-video cursor-pointer overflow-hidden bg-muted" onClick={handlePlay}>
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl || "/placeholder.svg"}
                alt={title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            ) : isYouTube ? (
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt={title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <PlayCircle className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40">
              <PlayCircle className="h-16 w-16 text-white" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-lg font-bold">{title}</h3>
              {description && <p className="text-sm opacity-90">{description}</p>}
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            {isYouTube ? (
              <iframe
                id="video-player"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video id="video-player" src={videoUrl} controls autoPlay className="h-full w-full"></video>
            )}
          </div>
        )}
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent px-4">
          <TabsTrigger
            value="about"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            About
          </TabsTrigger>
          {transcriptContent && (
            <TabsTrigger
              value="transcript"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Transcript
            </TabsTrigger>
          )}
          {resourcesContent && (
            <TabsTrigger
              value="resources"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Resources
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="about" className="p-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{title}</h3>
            {description && <p className="text-muted-foreground">{description}</p>}
            <div className="flex gap-2 pt-2">
              {!isPlaying && (
                <Button onClick={handlePlay}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Play Video
                </Button>
              )}
              {downloadUrl && (
                <Button variant="outline" asChild>
                  <a href={downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              )}
              {isPlaying && !isYouTube && (
                <Button variant="outline" onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="mr-2 h-4 w-4" />
                      Fullscreen
                    </>
                  )}
                </Button>
              )}
              {isYouTube && (
                <Button variant="outline" asChild>
                  <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </a>
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        {transcriptContent && (
          <TabsContent value="transcript" className="p-4">
            <div className="prose max-w-none dark:prose-invert">{transcriptContent}</div>
          </TabsContent>
        )}
        {resourcesContent && (
          <TabsContent value="resources" className="p-4">
            <div className="prose max-w-none dark:prose-invert">{resourcesContent}</div>
          </TabsContent>
        )}
      </Tabs>
    </Card>
  )
}
