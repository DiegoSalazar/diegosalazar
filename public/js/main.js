document.addEventListener('DOMContentLoaded', function() {

    /*======= Skillset *=======*/
    // The progress bars are now set to their width via inline style in HAML.
    // A CSS transition can be added for a visual effect if desired,
    // for example, by setting initial width to 0 via CSS and then transitioning.
    // For now, removing the JS-based animation.
    // If animation is desired:
    // const progressBars = document.querySelectorAll('.progress-bar');
    // progressBars.forEach(bar => {
    //   const targetWidth = bar.dataset.level;
    //   bar.style.width = '0%'; // Ensure it starts at 0 if not set by CSS
    //   setTimeout(() => { // Timeout to allow rendering before transition
    //     bar.style.width = targetWidth;
    //   }, 100);
    // });

    /* Bootstrap Tooltip Initialization */
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        animation: tooltipTriggerEl.dataset.bsAnimation === 'true' // Handle data-bs-animation
      });
    });
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    // This section has been removed as the RSS feed is commented out in HTML
    // and we are removing jQuery dependency.
    
    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    GitHubCalendar(".calendar", "DiegoSalazar");
    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "DiegoSalazar", selector: "#ghfeed" });
});