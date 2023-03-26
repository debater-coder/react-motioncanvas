import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/intro?scene";

import "./global.css";
import "@fontsource/jetbrains-mono";

import audio from "../voiceover.mp3";

export default makeProject({
  scenes: [intro],
  audio,
});
