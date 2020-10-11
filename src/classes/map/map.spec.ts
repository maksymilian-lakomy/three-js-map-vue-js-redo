// import { Map } from "./map.class";
// import { mapMeshFactory } from "@/helpers/map-object3d-factory.helper";

// import { DOMWindow, JSDOM } from "jsdom";
// import "@testing-library/jest-dom";
// import createContext from "gl";
// import { WebGLRenderer } from "three";

// describe(Map.name, () => {
//   let mockContainer: HTMLElement;
//   let window: DOMWindow;
//   let renderer: WebGLRenderer;
//   let map: Map;

//   beforeEach(() => {
//     jest.mock("mapMeshFactory");

//     ({ window } = new JSDOM());
//     mockContainer = window.document.createElement("div");

//     const context = createContext(1, 1);
//     const canvas = window.document.createElement("canvas");

//     renderer = new WebGLRenderer({ context, canvas });

//     map = new Map(mockContainer, [], renderer);
//   });

//   it("should exist", () => {
//     expect(map).toBeDefined();
//   });

//   it("should always have empty scene when no map supplied", () => {
//     expect(map.scene.children).toHaveLength(0);
//   });
// });
