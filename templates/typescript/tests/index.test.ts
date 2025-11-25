import { describe, it, expect } from 'vitest';
import { greet } from '../src/index.js';

describe('greet', () => {
  it('should return greeting message', () => {
    expect(greet('World')).toBe('Hello, World!');
  });

  it('should handle different names', () => {
    expect(greet('KitiumAI')).toBe('Hello, KitiumAI!');
  });
});
