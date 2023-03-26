import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { createRef, useDuration } from "@motion-canvas/core/lib/utils";
import { all, waitUntil } from "@motion-canvas/core/lib/flow";
import { Img } from "@motion-canvas/2d/lib/components";
import reactLogo from "../../images/react-logo.png";

export default makeScene2D(function* (view) {
  const logoRef = createRef<Img>();

  view.add(<Img src={reactLogo} ref={logoRef} scale={2} />);

  yield* logoRef().scale(3, 2);

  yield* waitUntil("componentsStart");

  yield* logoRef().position.y(-200, 1);

  yield* waitUntil("componentsSay");

  yield view.add(
    <Txt
      text="COMPONENTS"
      fontSize={140}
      y={100}
      fill="white"
      fontFamily={"JetBrains Mono"}
    />
  );
});
