import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHeaderVisibility } from './useHeaderVisibility';

describe('useHeaderVisibility Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('hides header after hideDelay timeout', async () => {
    const { result } = renderHook(() => useHeaderVisibility(100));

    expect(result.current).toBe(true);

    // Trigger an event to start the timeout
    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
      await Promise.resolve();
    });

    expect(result.current).toBe(true);

    // Fast-forward time and wait for state update
    await act(async () => {
      vi.advanceTimersByTime(150);
      await Promise.resolve();
    });

    expect(result.current).toBe(false);
  });

  it('clears previous timeout when event triggers again', async () => {
    const { result } = renderHook(() => useHeaderVisibility(100));

    // Trigger event
    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
      await Promise.resolve();
    });

    expect(result.current).toBe(true);

    // Wait 50ms (less than hideDelay)
    await act(async () => {
      vi.advanceTimersByTime(50);
      await Promise.resolve();
    });

    // Trigger event again - should reset timeout
    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
      await Promise.resolve();
    });

    // Wait another 50ms (total 100ms from first event, but only 50ms from second)
    await act(async () => {
      vi.advanceTimersByTime(50);
      await Promise.resolve();
    });

    // Should still be visible because timeout was reset
    expect(result.current).toBe(true);

    // Wait another 50ms to exceed the new timeout
    await act(async () => {
      vi.advanceTimersByTime(50);
      await Promise.resolve();
    });

    expect(result.current).toBe(false);
  });

  it('cleanup removes event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useHeaderVisibility());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it('clears timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = renderHook(() => useHeaderVisibility(100));

    // Trigger event to set timeout
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
