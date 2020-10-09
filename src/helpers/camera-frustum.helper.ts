import { CameraFrustum } from '@/models';

export function cameraFrustum(container: HTMLElement): CameraFrustum {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    return {
      left: width / -2,
      right: width / 2,
      top: height / 2,
      bottom: height / -2,
      near: 1,
      far: 1000,
    };
  }