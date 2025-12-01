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
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders without title but with description', () => {
    const { container } = render(
      <VideoPlayer videoUrl="/videos/test.mp4" description="Only description" />
    );

    expect(screen.getByText('Only description')).toBeInTheDocument();
    const h3Elements = container.querySelectorAll('h3');
    expect(h3Elements.length).toBe(0);
  });

  it('renders without caption section when no title or description', () => {
    const { container } = render(<VideoPlayer videoUrl="/videos/test.mp4" />);

    const videoContainer = screen.getByLabelText('Video: undefined');
    expect(videoContainer).toBeInTheDocument();

    // Caption div should not exist
    const captionDivs = container.querySelectorAll('[class*="caption"]');
    expect(captionDivs.length).toBe(0);
  });

  it('has proper accessibility labels', () => {
    render(<VideoPlayer {...mockProps} />);

    expect(
      screen.getByLabelText('Video: Test Video Title')
    ).toBeInTheDocument();
  });

  it('renders title without description', () => {
    render(<VideoPlayer videoUrl="/videos/test.mp4" title="Only Title" />);

    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(
      screen.queryByText('Test video description')
    ).not.toBeInTheDocument();
  });
});
