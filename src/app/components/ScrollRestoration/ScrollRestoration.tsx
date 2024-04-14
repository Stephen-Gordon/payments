import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ScrollRestoration: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Save scroll position when navigating away from the page
    const onBeforeUnload = () => {
      localStorage.setItem('scrollPosition', window.pageYOffset.toString());
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    // Restore scroll position when navigating back to the page
    const onRouteChangeComplete = () => {
      const scrollPosition = localStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
      } else {
        window.scrollTo(0, 0);
      }
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);

  return null; // This component doesn't render anything
};

export default ScrollRestoration;
