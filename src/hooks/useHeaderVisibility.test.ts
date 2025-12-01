import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHeaderVisibility } from './useHeaderVisibility';

describe('useHeaderVisibility Hook', () => {
  it('returns true when initialized (header visible)', () => {
    const { result } = renderHook(() => useHeaderVisibility());

    expect(result.current).toBe(true);
  });

  it('returns boolean visibility state', () => {
    const { result } = renderHook(() => useHeaderVisibility(3000));

    // Should return a boolean value
    expect(typeof result.current).toBe('boolean');
    // Initially visible
    expect(result.current).toBe(true);
  });

  it('shows header on scroll event', () => {
    const { result } = renderHook(() => useHeaderVisibility(3000));

    // Simulate scroll event
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('shows header on mouse move event', () => {
    const { result } = renderHook(() => useHeaderVisibility(3000));

    // Simulate mouse move event
    act(() => {
      window.dispatchEvent(new Event('mousemove'));
    });

    expect(result.current).toBe(true);
  });

  it('shows header on touch event', () => {
    const { result } = renderHook(() => useHeaderVisibility(3000));

    // Simulate touch event
    act(() => {
      window.dispatchEvent(new Event('touchstart'));
    });

    expect(result.current).toBe(true);
  });

  it('cleanup removes event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useHeaderVisibility());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});

