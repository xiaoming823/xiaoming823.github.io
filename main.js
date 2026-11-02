(function () {
  var button = document.getElementById('copy-email');
  var status = document.getElementById('copy-status');
  var address = 'zhan5991@purdue.edu';
  if (!button || !status) return;
  button.hidden = false;
  function fallback() {
    var box = document.createElement('textarea');
    box.value = address;
    box.setAttribute('readonly', '');
    box.style.cssText = 'position:fixed;top:0;left:-9999px';
    document.body.appendChild(box);
    box.select();
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (error) {}
    box.remove();
    button.focus();
    return copied;
  }
  button.addEventListener('click', async function () {
    var copied = false;
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(address); copied = true; } catch (error) {}
    }
    if (!copied) copied = fallback();
    status.textContent = copied ? 'Email address copied.' : 'Please select and copy: ' + address;
  });
})();