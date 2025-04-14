document.addEventListener('DOMContentLoaded', () => {
    // Get all elements that should be animated
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight * 0.9 &&
            rect.bottom >= 0
        );
    };

    // Function to handle scroll event
    const handleScroll = () => {
        // Handle regular animated elements
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });

        // Handle timeline items with individual checks
        timelineItems.forEach((item, index) => {
            if (isInViewport(item)) {
                // Add a slight delay based on the item's position
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100); // 100ms delay between each item
            }
        });
    };

    // Initial check for elements in viewport
    handleScroll();

    // Add scroll event listener with throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}); 