import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

export default function App() {
  const searchParams = new URLSearchParams(document.location.search);
  useEffect(() => {
    const apiKey = process.env.REACT_APP_VIDEOSDK_API_KEY;
    const redirectUrl = window.location.href.split("?")[0];
    const meetingId =
      searchParams.get("meeting-id") || Math.random().toString(36).slice(2, 7);
    const name = searchParams.get("name") || "User";
    const config = {
      name: name,
      meetingId: meetingId,
      apiKey: apiKey,

      containerId: null,
      redirectOnLeave: redirectUrl,

      micEnabled: false,
      webcamEnabled: false,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,

      chatEnabled: true,
      screenShareEnabled: true,
      pollEnabled: true,
      whiteboardEnabled: true,
      raiseHandEnabled: true,

      recordingEnabled: true,
      recordingEnabledByDefault: false,
      recordingWebhookUrl: "https://www.videosdk.live/callback",
      recordingAWSDirPath: `/meeting-recordings/${meetingId}/`, // automatically save recording in this s3 path

      brandingEnabled: true,
      brandLogoURL: "https://www.linkpicture.com/q/Web-Meet-logos_white.png",
      brandName: searchParams.get("name") || "Web Meet",
      poweredBy: false,

      participantCanLeave: true, // if false, leave button won't be visible

      livestream: {
        autoStart: true,
        outputs: [
          // {
          //   url: "rtmp://x.rtmp.youtube.com/live2",
          //   streamKey: "<STREAM KEY FROM YOUTUBE>",
          // },
        ],
      },

      permissions: {
        askToJoin: false, // Ask joined participants for entry in meeting
        toggleParticipantMic: true, // Can toggle other participant's mic
        toggleParticipantWebcam: true, // Can toggle other participant's webcam
        removeParticipant: true, // Remove other participant from meeting
        endMeeting: true, // End meeting for all participant
        drawOnWhiteboard: true, // Can Draw on whiteboard
        toggleWhiteboard: true, // Can toggle whiteboard
        toggleRecording: false, // Can toggle recording
      },

      joinScreen: {
        visible: true, // Show the join screen ?
        title: "Share Meeting Code", // Meeting title
        meetingUrl: redirectUrl + `?meeting-id=${meetingId}`, // Meeting joining url
      },

      pin: {
        allowed: true, // participant can pin any participant in meeting
        layout: "SPOTLIGHT", // meeting layout - GRID | SPOTLIGHT | SIDEBAR
      },

      leftScreen: {
        // visible when redirect on leave not provieded
        actionButton: {
          // optional action button
          label: searchParams.get("app-name") || "WebMeet", // action button label
          href: redirectUrl, // action button href
        },
      },
    };

    const meeting = new VideoSDKMeeting();
    meeting.init(config);
  }, []);

  return <div></div>;
}
