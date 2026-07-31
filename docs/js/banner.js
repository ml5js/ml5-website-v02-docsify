// ==========================================
// Banner Functionality
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
  let banner = document.getElementById('banner');
  let closeBanner = document.getElementById('close-banner');

  if (banner && closeBanner) {
    // Check if banner was previously dismissed
    if (sessionStorage.getItem('ml5BannerDismissed') !== 'true') {
      banner.style.display = 'flex';
    }

    // Handle banner close event
    closeBanner.addEventListener('click', function () {
      banner.style.opacity = '0';
      banner.style.transform = 'translate(0px, 20px)';

      // Hide completely after fade-out transition
      setTimeout(function () {
        banner.style.display = 'none';
      }, 300);

      sessionStorage.setItem('ml5BannerDismissed', 'true');
    });
  }
});