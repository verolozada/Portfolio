var freshPage = true; var btn = document.querySelector('.logo-menu'), svg = document.querySelector('svg'); btn.addEventListener('click', function () { svg.classList.toggle('click'); }, false); function showMobileMenu() { var menuWidth = $('.menu-shelf').width(); var mobileVis = jQuery('.menu-shelf').css('display'); if (mobileVis == "none") { jQuery('.menu-shelf, .menu-bg').animate({ width: 'toggle' }, 400); $('.navigation, .menu-bg').toggleClass("open-nav"); $('#main').toggleClass("main-move"); $('.project-inner').toggleClass("main-move"); } else { $('.navigation, .menu-bg').toggleClass("open-nav"); jQuery('.menu-shelf, .menu-bg').animate({ width: 'toggle' }, 400); $('#main').toggleClass("main-move"); $('.project-inner').toggleClass("main-move"); } }
jQuery(document).ready(function ($) {
    var pageUrl = document.location.href;
    var index = pageUrl.indexOf('work');
    if (index != -1) {
        $('#fullpage').addClass('hide');
        $("#hero").addClass("destroy").css({ 'display': 'none' });
        $('body').toggleClass("work-mode"); $(".view-case-study").addClass("projects-load");
        $(".pagination").addClass("visible");
        workPage = true;
        var currentProject = $('#entry-slug').val();
        $('body').addClass('fp-viewing-' + currentProject);
    }
    else { }
    window.onload = function () {
        $("body").removeClass("loading");
        $('.modal').fadeOut(500);
        $('#main').animate({ 'opacity': '1' }, 1500);
        if
        (freshPage) {
            setTimeout(function () {
                $(".logo-menu svg").toggleClass("hovered");
                $("a.scroll").toggleClass("scroll-pop");
            }, 1000);
        }
    };
    $(document).on('click', '.nav-button-next-project, .nav-button-next-project-btm', function (e) {
        e.preventDefault();
        var prettyUrl = $('#next-entry').val().replace('/index.php', '');
        var url = prettyUrl + ' #project-inner-content';
        loadPage2(url, prettyUrl);
        return false;
    });
    $(document).on('click', '.nav-button-prev-project, .nav-button-prev-project-btm', function (e) {
        e.preventDefault();
        var prettyUrl = $('#prev-entry').val().replace('/index.php', '');
        var url = prettyUrl + ' #project-inner-content';
        loadPage2(url, prettyUrl); return false;
    });
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tab ul.tabs li a').click(function (e) {
        var tab = $(this).closest('.tab'), index = $(this).closest('li').index();
        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp().removeClass("active_tab_content");
        tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown().addClass("active_tab_content");
        e.preventDefault();
    });
    $('.logo-menu').click(function (e) {
        showMobileMenu();
        return false;
    });
    $('a.scroll').click(function (e) {
        e.preventDefault();
        initFullPage();
        return false;
    });
    $(document).on('click', 'body.work-mode .view-case-study', function (e) {
        if (!$("#fullpage").hasClass("fullpage-wrapper")) { initFullPage(); }
        $('#fullpage').removeClass('hide');
        var pageSlug = $('#entry-slug').val();
        window.history.pushState(null, '{% if title is defined %}{{ title }} - {% endif %}{{ siteName }}', siteUrl + '#' + pageSlug);
        $('body').removeClass("work-mode");
        $.fn.fullpage.silentMoveTo(pageSlug);
        $.fn.fullpage.setAllowScrolling(true);
        $('.view-case-study').removeClass("clickme");
        setTimeout(function () { $('.view-case-study').removeClass("clickme"); }, 2501);
    });
    $(document).on('click', 'body:not(".work-mode") .view-case-study', function (e) {
        var prettyUrl = siteUrl + "work/" + projectUrl;
        var fullUrl = prettyUrl + " #project-inner-content";
        loadPage(fullUrl, prettyUrl);
        $('.view-case-study').addClass("loader");
        $('.nav-text-project').html(project_title);
        $.fn.fullpage.setAllowScrolling(false);
        $('.view-case-study').removeClass("clickme");
        setTimeout(function () {
            $('.view-case-study').removeClass("clickme");
        }, 1000);
    });
    function loadPage(url, prettyUrl) {
        $("#project-inner-container").load(url, function (response, status, xhr) {
            if (status == "success") {
                var pageTitle = $('#entry-title').val();
                window.history.pushState(null, pageTitle, prettyUrl);
                var currentProject = $('#entry-slug').val();
                $('body').addClass("work-mode"); $('.view-case-study').removeClass("loader");
            }
        });
    }
    function loadPage2(url, prettyUrl) {
        var currentProject = $('#entry-slug').val();
        $('#project-inner-container').animate({ 'opacity': '0' }, 350, function () {
            $('body').removeClass('fp-viewing-' + currentProject);
            $("#project-inner-container").load(url, function (response, status, xhr) {
                if (status == "success") {
                    var pageTitle = $('#entry-title').val();
                    window.history.pushState(null, pageTitle, prettyUrl);
                    $('.nav-text-project').html(pageTitle);
                    $('#project-inner-container').animate({ scrollTop: 0 }, 1);
                    currentProject = $('#entry-slug').val();
                    $('body').addClass('fp-viewing-' + currentProject);
                    $('#project-inner-container').animate({ 'opacity': '1' }, 350);
                }
            });
        });
    }
    setTimeout(function () {
        $('a.scroll').addClass('scrollplease');
        $('h4.tooltip').animate({ 'opacity': '1' }, 1500);
    }, 5000);
    $('#scroll-control').on('scroll', function (e) {
        var totalScroll = $('#scroll-control').scrollTop();
        var slowScroll = totalScroll * .2;
        $('svg.scroll-end').css({ 'clip': "rect(0px," + slowScroll + "px,200px,0px)", });
        if (totalScroll > 400) {
            if ((fullPageInit == false) && (workPage == false)) {
                fullPageInit = true;
                $('#hero').animate({ 'opacity': '0' }, 300, function () {
                    $('#scroll-control').off(); var
                        wh = window.innerHeight ? window.innerHeight : $(window).height();
                    $('#fullpage section').height(wh);
                    var loadedSection = $('#fullpage section:first-child');
                    projectUrl = loadedSection.data('url');
                    project_title = loadedSection.data('title');
                    loadedSection.addClass('projects-load');
                    setTimeout(function () { $('.view-case-study').addClass("clickme"); }, 2500);
                    loadedSection.find(".full-line").animate({ 'width': '100%' }, 500);
                    history.pushState(null, null, '#' + projectUrl); l
                    oadedSection.animate({ 'background-position-y': '-20px', 'background-size': '120%' }, 1000, function () {
                        initFullPage();
                        $('#scroll-control').hide();
                    }); $('.ui-info').animate({ 'opacity': '1' }, 350);
                }); $('#hero').addClass('destroy');
            }
        }
    }); var winHeight = $(window).height();
    $(window).scroll(function (e) {
        var scrTop = $(document).scrollTop() / winHeight, scrTopFixed = scrTop.toFixed(2), scrTransform = scrTopFixed * 80, bgPos = scrTransform / 10 + 95, heroOpacity = 1 - scrTransform / 100;
        if ((scrTransform >= 80) && (fullPageInit === false)) { }
    });
});