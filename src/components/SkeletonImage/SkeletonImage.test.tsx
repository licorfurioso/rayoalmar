import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonImage } from './SkeletonImage';

describe('SkeletonImage Component', () => {
  it('shows skeleton loader initially', () => {
    const { container } = render(<SkeletonImage />);

    const skeletonDiv = container.firstChild as HTMLElement;
    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv.className).toContain('skeleton');
  });

  it('renders with shimmer animation element', () => {
    const { container } = render(<SkeletonImage />);

    const skeletonDiv = container.firstChild as HTMLElement;
    const shimmerDiv = skeletonDiv.firstChild as HTMLElement;
    expect(shimmerDiv).toBeInTheDocument();
    expect(shimmerDiv.className).toContain('shimmer');
  });

  it('applies custom className when provided', () => {
    const { container } = render(<SkeletonImage className="custom-class" />);

    const skeletonDiv = container.firstChild as HTMLElement;
    expect(skeletonDiv.className).toContain('skeleton');
    expect(skeletonDiv.className).toContain('custom-class');
  });

  it('renders without custom className', () => {
    const { container } = render(<SkeletonImage />);

    const skeletonDiv = container.firstChild as HTMLElement;
    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv.className).toContain('skeleton');
  });
});
