import { Event, Subject } from "@/models";
import { EventEmitter } from "./subject.mixin";

class BaseMock {}
const MockEventEmmiter = EventEmitter(BaseMock);

describe(EventEmitter.name, () => {
  const firstExpectedEventName = "firstMockEventName";
  const secondExpectedEventName = "secondMockEventName";
  const expectedEvent: Event = {};

  class EventEmitter extends MockEventEmmiter implements Subject {
    public firstEmit(): void {
      this.notify(firstExpectedEventName, expectedEvent);
    }

    public secondEmit(): void {
      this.notify(secondExpectedEventName, expectedEvent);
    }
  }

  let eventEmitter: EventEmitter;

  beforeEach(() => (eventEmitter = new EventEmitter()));

  it("should exist", () => {
    expect(eventEmitter).toBeDefined();
  });

  it("should notify listener & pass eventData", () => {
    const listener = jest.fn();

    eventEmitter.addEventListener(firstExpectedEventName, listener);
    eventEmitter.firstEmit();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(expectedEvent);
  });

  it("should not notify listener when it was detached", () => {
    const listener = jest.fn();

    eventEmitter.addEventListener(firstExpectedEventName, listener);
    eventEmitter.removeEventListener(firstExpectedEventName, listener);
    eventEmitter.firstEmit();

    expect(listener).not.toHaveBeenCalled();
  });

  it("should notify all listeners", () => {
    const firstListener = jest.fn();
    const secondListener = jest.fn();

    eventEmitter.addEventListener(firstExpectedEventName, firstListener);
    eventEmitter.addEventListener(firstExpectedEventName, secondListener);
    eventEmitter.firstEmit();

    expect(firstListener).toHaveBeenCalledTimes(1);
    expect(firstListener).toHaveBeenCalledWith(expectedEvent);
    expect(secondListener).toHaveBeenCalledTimes(1);
    expect(secondListener).toHaveBeenCalledWith(expectedEvent);
  });

  it("should notify listeners for each event source", () => {
    const firstListener = jest.fn();
    const secondListener = jest.fn();

    eventEmitter.addEventListener(firstExpectedEventName, firstListener);
    eventEmitter.addEventListener(secondExpectedEventName, secondListener);

    eventEmitter.firstEmit();
    eventEmitter.secondEmit();

    expect(firstListener).toHaveBeenCalledTimes(1);
    expect(firstListener).toHaveBeenCalledWith(expectedEvent);
    expect(secondListener).toHaveBeenCalledTimes(1);
    expect(secondListener).toHaveBeenCalledWith(expectedEvent);
  });

  it("should remove all listeners when it was called", () => {
    const listener = jest.fn();

    eventEmitter.addEventListener(firstExpectedEventName, listener);
    eventEmitter.removeAllListeners();

    eventEmitter.firstEmit();

    expect(listener).not.toHaveBeenCalled();
  })
});
