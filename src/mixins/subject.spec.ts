import { EventEmitter } from "./subject.mixin";

describe(EventEmitter.name,() => {
  it("should exist", () => {
    expect(EventEmitter).toBeDefined();
  });
});
