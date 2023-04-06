import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { createRef, useDuration } from "@motion-canvas/core/lib/utils";
import { all, waitUntil } from "@motion-canvas/core/lib/flow";
import { Img } from "@motion-canvas/2d/lib/components";
import reactLogo from "../../images/react-logo.png";
import { linear } from "@motion-canvas/core/lib/tweening";
import { Vector2 } from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view) {
  const logoRef = createRef<Img>();

  view.add(<Img src={reactLogo} ref={logoRef} scale={2} />);

  yield* logoRef().scale(3, 2);

  yield* waitUntil("componentsStart");

  yield* logoRef().position.y(-200, 1);

  yield* waitUntil("componentsSay");

  const componentsTitleRef = createRef<Txt>();

  view.add(
    <Txt
      fontSize={140}
      y={100}
      fill="white"
      fontFamily={"JetBrains Mono"}
      ref={componentsTitleRef}
    />
  );

  yield* all(
    componentsTitleRef().position.y(-400, 1),
    logoRef().position.y(-1000, 1),
    componentsTitleRef().text("Components", 1, linear)
  );

  yield* waitUntil("componentsExamples");

  const componentExamplesLayout = createRef<Rect>();

  view.add(
    <Rect
      layout
      ref={componentExamplesLayout}
      width="100%"
      padding={64}
      gap={50}
      alignItems="center"
    />
  );

  const button = createRef<Rect>();

  componentExamplesLayout().add(
    <Rect
      fill={"#2f70ed"}
      radius={30}
      layout
      padding={45}
      opacity={0}
      ref={button}
      justifyContent={"center"}
    >
      <Txt fontFamily={"JetBrains Mono"} text="Button" fill={"white"} />
    </Rect>
  );

  yield* button().opacity(1, 0.5);

  const menu = createRef<Rect>();

  componentExamplesLayout().add(
    <Rect
      radius={32}
      layout
      direction={"column"}
      fill="#2b3037"
      ref={menu}
      opacity={0}
    >
      <Rect radius={30} layout padding={45} ref={button}>
        <Txt fontFamily={"JetBrains Mono"} text="Action 1" fill={"white"} />
      </Rect>
      <Rect height={5} fill="#feffef" />
      <Rect radius={30} layout padding={45} ref={button}>
        <Txt fontFamily={"JetBrains Mono"} text="Action 2" fill={"white"} />
      </Rect>
      <Rect height={5} fill="#feffef" />
      <Rect radius={30} layout padding={45} ref={button}>
        <Txt fontFamily={"JetBrains Mono"} text="Action 3" fill={"white"} />
      </Rect>
    </Rect>
  );

  yield* menu().opacity(1, 0.5);

  const tabs = createRef<Rect>();

  componentExamplesLayout().add(
    <Rect layout ref={tabs} gap={8} opacity={0}>
      <Rect fill={"#2f70ed"} radius={[30, 30, 8, 8]} layout padding={45}>
        <Txt fontFamily={"JetBrains Mono"} text="Tab 1" fill={"white"} />
      </Rect>
      <Rect fill={"#2b3037"} radius={[30, 30, 8, 8]} layout padding={45}>
        <Txt fontFamily={"JetBrains Mono"} text="Tab 2" fill={"white"} />
      </Rect>
      <Rect fill={"#2b3037"} radius={[30, 30, 8, 8]} layout padding={45}>
        <Txt fontFamily={"JetBrains Mono"} text="Tab 3" fill={"white"} />
      </Rect>
    </Rect>
  );

  yield* tabs().opacity(1, 0.5);

  const ellipsis = createRef<Txt>();

  componentExamplesLayout().add(
    <Txt
      fontFamily={"JetBrains Mono"}
      text="Tab 1"
      fill={"white"}
      fontSize={100}
      ref={ellipsis}
      opacity={0}
    >
      ...
    </Txt>
  );

  yield* ellipsis().opacity(1, 0.5);

  yield* waitUntil("componentsReusable");

  yield* all(
    button().opacity(0, 0.5),
    menu().opacity(0, 0.5),
    tabs().opacity(0, 0.5),
    ellipsis().opacity(0, 0.5)
  );

  componentExamplesLayout().remove();

  yield* waitUntil("componentsEnd");
});
