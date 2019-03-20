$(document).ready(function () {
  $('.sidenav').sidenav();

  $('a').on('click', function() {
    $(this).removeClass('inactive').addClass('current');
  });

  // $(window).resize(()=>{
  //   $('.title').removeClass('title').addClass('change');
  // })
});

