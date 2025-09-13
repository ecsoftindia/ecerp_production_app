import { AppSafePipe } from './app-safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    const pipe = new AppSafePipe();
    expect(pipe).toBeTruthy();
  });
});
