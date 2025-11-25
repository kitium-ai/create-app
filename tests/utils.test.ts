import { describe, it, expect } from 'vitest';
import { isValidProjectName } from '../src/utils.js';

describe('utils', () => {
  describe('isValidProjectName', () => {
    it('should accept valid project names', () => {
      expect(isValidProjectName('my-project')).toBe(true);
      expect(isValidProjectName('my_project')).toBe(true);
      expect(isValidProjectName('myproject')).toBe(true);
      expect(isValidProjectName('my-project-123')).toBe(true);
      expect(isValidProjectName('123-project')).toBe(true);
    });

    it('should reject invalid project names', () => {
      expect(isValidProjectName('My-Project')).toBe(false); // uppercase
      expect(isValidProjectName('my project')).toBe(false); // spaces
      expect(isValidProjectName('my.project')).toBe(false); // dots
      expect(isValidProjectName('my@project')).toBe(false); // special chars
      expect(isValidProjectName('')).toBe(false); // empty
    });
  });
});

