import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { all } from "@motion-canvas/core/lib/flow";
import { Img } from "@motion-canvas/2d/lib/components";
import reactLogo from "../../images/react-logo.png";

export default makeScene2D(function* (view) {
  const logoRef = createRef<Img>();
  const layoutRef = createRef<Rect>();

  view.add(
    <Rect layout ref={layoutRef} direction={"column"} alignItems="center">
      <Img src={reactLogo} ref={logoRef} scale={2} />
    </Rect>
  );
});
