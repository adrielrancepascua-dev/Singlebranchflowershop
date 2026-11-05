export type AppMode = 'cafe' | 'flower_demo';

export function getAppMode(): AppMode {
  return 'flower_demo';
}

export function isFlowerDemoMode(): boolean {
  return getAppMode() === 'flower_demo';
}
