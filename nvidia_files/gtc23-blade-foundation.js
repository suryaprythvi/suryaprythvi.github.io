function sessionCardsFoundation() {
  $("#gtc-session-blade h3").removeAttr("style");
  var maxHeighth3 = 0;
  $("#gtc-session-blade h3").each(function () {
    if ($(this).height() > maxHeighth3) {
      maxHeighth3 = $(this).height();
    }
  });
  var specialmaxHeighth3 = maxHeighth3 - 28;;
  $("#gtc-session-blade h3").height(maxHeighth3);
  $("#gtc-session-blade #special-event h3").height(specialmaxHeighth3);
};
sessionCardsFoundation();
window.addEventListener('resize', sessionCardsFoundation, true);
