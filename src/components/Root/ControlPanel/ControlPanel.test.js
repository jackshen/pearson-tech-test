import { fireEvent, render } from "@testing-library/react";
import React from "react";

import ControlPanel from "./ControlPanel";

describe("ControlPanel", () => {
  test("InputSlider works properly", async () => {
    const handleChangeMock = jest.fn();

    const { getByTestId } = render(
      <ControlPanel max={100} min={-100} numSteps={200} onChange={handleChangeMock} value={0} />
    );

    fireEvent.change(getByTestId("input-slider"), {
      target: { value: "0.8" }
    });

    expect(handleChangeMock.mock.calls[handleChangeMock.mock.calls.length - 1][0].toFixed(1)).toMatchSnapshot();

    fireEvent.change(getByTestId("input-slider"), {
      target: { value: "0.1" }
    });

    expect(handleChangeMock.mock.calls[handleChangeMock.mock.calls.length - 1][0].toFixed(1)).toMatchSnapshot();

    fireEvent.change(getByTestId("input-slider"), {
      target: { value: "-0.5" }
    });

    expect(handleChangeMock.mock.calls[handleChangeMock.mock.calls.length - 1][0].toFixed(1)).toMatchSnapshot();
  });
});
