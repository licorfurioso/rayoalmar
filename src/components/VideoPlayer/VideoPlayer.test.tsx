import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer Component', () => {
  const mockProps = {
    videoUrl: '/videos/test-video.mp4',
    title: 'Test Video Title',
    description: 'Test video description',
  };

  it('renders video player with provided source', () => {
    render(<VideoPlayer {...mockProps} />);

    const videoContainer = screen.getByLabelText('Video: Test Video Title');
    expect(videoContainer).toBeInTheDocument();
  });

  it('displays title and description', () => {
    render(<VideoPlayer {...mockProps} />);

    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
    expect(screen.getByText('Test video description')).toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    render(<VideoPlayer videoUrl="/videos/test.mp4" title="Video" />);

    expect(screen.getByText('Video')).toBeInTheDocument();
  });

  it('has proper accessibility labels', () => {
    render(<VideoPlayer {...mockProps} />);

    expect(screen.getByLabelText('Video: Test Video Title')).toBeInTheDocument();
  });
});

