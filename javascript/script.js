initSmoothScrolling();

function initSmoothScrolling() {
  if (isCssSmoothScrollSupported()) {
    return;
  }

  var duration = 400;

  var pageUrl = location.hash
    ? stripHash(location.href)
    : location.href
  ;

  delegatedLinkHijacking();
  //directLinkHijacking();

  function delegatedLinkHijacking() {
    document.body.addEventListener('click', onClick, false);

    function onClick(e) {
      if (!isInPageLink(e.target))
        return;

      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration
      });
    }
  }

  function directLinkHijacking() {
    [].slice.call(document.querySelectorAll('a'))
      .filter(isInPageLink)
      .forEach(function(a) { a.addEventListener('click', onClick, false); })
    ;

    function onClick(e) {
      e.stopPropagation();
      e.preventDefault();

      jump(e.target.hash, {
        duration: duration
      });
    }

  }

  function isInPageLink(n) {
    return n.tagName.toLowerCase() === 'a'
      && n.hash.length > 0
      && stripHash(n.href) === pageUrl
    ;
  }

  function stripHash(url) {
    return url.slice(0, url.lastIndexOf('#'));
  }

  function isCssSmoothScrollSupported() {
    return 'scrollBehavior' in document.documentElement.style;
  }

  // Adapted from:
  // https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
  function setFocus(hash) {
    var element = document.getElementById(hash.substring(1));

    if (element) {
      if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
        element.tabIndex = -1;
      }

      element.focus();
    }
  }
  function resetFocus () {
    let scrollTop = document.body.scrollTop;
    let body = document.body;

    let tmp = document.createElement('input');
    tmp.style.opacity = 0;
    body.appendChild(tmp);
    tmp.focus();
    body.removeChild(tmp);
    body.scrollTop = scrollTop;
  }

}
