function a11yFixes () {
  /* correcting some react-select v1 a11y bugs. Not very elegant, but quicker than upgrading everything so we can upgrade that package */
  window.onload = function () {
    document.querySelectorAll('[role="combobox"]').forEach(function (el, i){
      let idText = el.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('label')[0].htmlFor
      el.setAttribute('id', idText)
    })

    let fuzzyNameSelect = document.querySelector('label[for="Fuzzy Name"]').parentNode.querySelector('span[role="option"]').parentNode
    fuzzyNameSelect.setAttribute('role', 'listbox')
    fuzzyNameSelect.setAttribute('aria-label', 'Fuzzy Name toggle')

    /* the Drupal page requires summary text so this isn't needed there (in iframe) */
    if (window.self !== window.top) { document.getElementById("Header-1").style.display = "none" }
  }
}

export default a11yFixes;
