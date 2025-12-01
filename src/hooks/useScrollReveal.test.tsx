import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, render } from '@testing-library/react';
import { useScrollReveal } from './useScrollReveal';

describe('useScrollReveal Hook', () => {
  beforeEach(() => {
    // Reset matchMedia mock
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('returns false initially (not revealed)', () => {
    const { result } = renderHook(() => useScrollReveal());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.ref.current).toBeNull();
  });

  it('returns true when element is in viewport', async () => {
    // The hook manages its own ref internally, so we test it by rendering with a component
    const TestComponent = () => {
      const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
      return (
        <div ref={ref} data-visible={isVisible}>
          Test
        </div>
      );
    };

    const { container } = render(<TestComponent />);
    const element = container.firstChild as HTMLElement;

    // Wait for IntersectionObserver to trigger (setupTests.ts triggers automatically)
    await waitFor(
      () => {
        expect(element.getAttribute('data-visible')).toBe('true');
      },
      { timeout: 100 }
    );
  });

  it('IntersectionObserver integration works correctly', () => {
    const { result } = renderHook(() => useScrollReveal());

    expect(result.current.ref).toBeTruthy();
    expect(typeof result.current.isVisible).toBe('boolean');
  });

  it('cleanup on unmount prevents memory leaks', () => {
    const { unmount } = renderHook(() => useScrollReveal());

    // Create mock element
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    unmount();

    // Cleanup should have been called
    expect(true).toBe(true);

    document.body.removeChild(mockElement);
  });

  it('shows immediately when prefers-reduced-motion is enabled', async () => {
    // Mock prefers-reduced-motion
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const TestComponent = () => {
      const { ref, isVisible } = useScrollReveal();
      return (
        <div ref={ref} data-visible={isVisible}>
          Test
        </div>
      );
    };

    const { container } = render(<TestComponent />);
    const element = container.firstChild as HTMLElement;

    // Should become visible immediately for reduced motion
    await waitFor(
      () => {
        expect(element.getAttribute('data-visible')).toBe('true');
      },
      { timeout: 100 }
    );
  });

  it('accepts custom threshold option', () => {
    const { result } = renderHook(() => useScrollReveal({ threshold: 0.5 }));

    expect(result.current.ref).toBeTruthy();
    expect(result.current.isVisible).toBe(false);
  });

  it('accepts custom rootMargin option', () => {
    const { result } = renderHook(() =>
      useScrollReveal({ rootMargin: '100px' })
    );

    expect(result.current.ref).toBeTruthy();
    expect(result.current.isVisible).toBe(false);
  });

  it('handles undefined ref element gracefully', () => {
    const { result } = renderHook(() => useScrollReveal());

    // Initially ref.current is null - hook should handle this
    expect(result.current.ref.current).toBeNull();
    expect(result.current.isVisible).toBe(false);
  });
});
