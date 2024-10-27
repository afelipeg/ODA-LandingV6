import React from 'react';
import { useInView } from 'react-intersection-observer';

function Video() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div 
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <div 
            style={{position:'relative', width:'100%', height:'0px', paddingBottom:'56.250%'}}
            onContextMenu={(e) => e.preventDefault()} // Disable right-click on the video container
          >
            <iframe 
              allow="fullscreen"
              allowFullScreen 
              height="100%" 
              src="https://shorturl.at/gikqI?" 
              width="100%" 
              style={{
                border:'none', 
                width:'100%', 
                height:'100%', 
                position:'absolute', 
                left:'0px', 
                top:'0px', 
                overflow:'hidden'
              }}
              onContextMenu={(e) => e.preventDefault()} // Disable right-click on the iframe
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Video;
