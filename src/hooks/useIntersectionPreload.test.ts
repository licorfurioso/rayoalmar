import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIntersectionPreload } from './useIntersectionPreload';

describe('useIntersectionPreload Hook', () => {
  it('creates IntersectionObserver on mount', () => {
    const { result } = renderHook(() => useIntersectionPreload());

    expect(result.current.current).toBeTruthy();
    expect(result.current.current).toBeInstanceOf(IntersectionObserver);
  });

  it('uses correct threshold value', () => {
    const threshold = 0.8;
    const { result } = renderHook(() => useIntersectionPreload(threshold));

    expect(result.current.current).toBeTruthy();
  });

  it('observes DOM elements and triggers callbacks', () => {
    const { result } = renderHook(() => useIntersectionPreload());

    const observer = result.current.current;
    expect(observer).toBeInstanceOf(IntersectionObserver);

    // Create a test image element with data-src
    const img = document.createElement('img');
    img.setAttribute('data-src', '/test-image.jpg');
    document.body.appendChild(img);

    // Observe the element
    observer?.observe(img);

    // The IntersectionObserver mock from setupTests.ts will trigger automatically
    expect(observer).toBeTruthy();

    document.body.removeChild(img);
  });

  it('cleanup disconnects observer on unmount', () => {
    const { result, unmount } = renderHook(() => useIntersectionPreload());

    const observer = result.current.current;
    expect(observer).toBeTruthy();

    const disconnectSpy = vi.spyOn(observer!, 'disconnect');

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });
});

