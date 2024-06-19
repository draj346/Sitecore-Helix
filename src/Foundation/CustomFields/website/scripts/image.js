$(function () {
    window.lazyLoadObserver = lozad("[data-class='lozad']", {
        rootMargin: "10px 0px",
        threshold: .1
    });
    lazyLoadObserver.observe()
});