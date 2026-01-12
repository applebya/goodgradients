import { useCallback, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Share2 } from './icons';
import { toast } from './Toast';

interface ShareMenuProps {
  getShareUrl: () => string;
  gradientName: string;
}

export function ShareMenu({ getShareUrl, gradientName }: ShareMenuProps) {
  const [open, setOpen] = useState(false);

  const handleCopyLink = useCallback(async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard');
    setOpen(false);
  }, [getShareUrl]);

  const handleShareTwitter = useCallback(() => {
    const url = getShareUrl();
    const text = `Check out this beautiful gradient: "${gradientName}" on Good Gradients`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    setOpen(false);
  }, [getShareUrl, gradientName]);

  const handleShareLinkedIn = useCallback(() => {
    const url = getShareUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
    setOpen(false);
  }, [getShareUrl]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          className="h-8 w-8"
          aria-label="Share gradient"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-1">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left rounded-md hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy link
        </button>
        <button
          onClick={handleShareTwitter}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left rounded-md hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </button>
        <button
          onClick={handleShareLinkedIn}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left rounded-md hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Share on LinkedIn
        </button>
      </PopoverContent>
    </Popover>
  );
}
