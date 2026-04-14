(() => {
  const web3 = new Web3();
  const input = document.getElementById('input');
  const toType = document.getElementById('to');
  const convertButtons = Array.from(document.querySelectorAll('.convert-btn'));
  const output = document.getElementById('output');
  const applyPadding = document.getElementById('apply-padding');
  const applyPaddingContainer = document.getElementById('apply-padding-container');
  const donateModal = document.getElementById('donate-modal');
  const openDonateModalButton = document.getElementById('open-donate-modal');
  const closeDonateModalButton = document.getElementById('close-donate-modal');
  const copyDonateAddressButton = document.getElementById('copy-donate-address');
  const donateAddress = document.getElementById('donate-address');
  const copyFeedback = document.getElementById('copy-feedback');
  let selectedType = 'string';

  const convert = (value) => {
    if (selectedType === 'bytes32') {
      const hexValue = web3.toHex(value);

      output.value = applyPadding.checked ? web3.padRight(hexValue, 66) : hexValue;
    }
    if (selectedType === 'number') {
      output.value = web3.toDecimal(value);
    }
    if (selectedType === 'string') {
      try {
        output.value = web3.toUtf8(value);
      } catch (_error) {
        output.value = web3.toAscii(value);
      }
    }
  };

  const updateSelectedType = (type) => {
    selectedType = type;
    convertButtons.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.type === selectedType);
    });
    applyPaddingContainer.style.display = selectedType === 'bytes32' ? 'flex' : 'none';
    convert(input.value);
  };

  input.addEventListener('keyup', () => convert(input.value));
  input.addEventListener('blur', () => convert(input.value));
  toType.addEventListener('click', (event) => {
    const button = event.target.closest('.convert-btn');
    if (!button) return;
    updateSelectedType(button.dataset.type);
  });
  applyPadding.addEventListener('change', () => convert(input.value));

  openDonateModalButton.addEventListener('click', () => {
    donateModal.classList.add('is-open');
    donateModal.setAttribute('aria-hidden', 'false');
    copyFeedback.textContent = '';
  });

  closeDonateModalButton.addEventListener('click', () => {
    donateModal.classList.remove('is-open');
    donateModal.setAttribute('aria-hidden', 'true');
  });

  donateModal.addEventListener('click', (event) => {
    if (event.target === donateModal) {
      donateModal.classList.remove('is-open');
      donateModal.setAttribute('aria-hidden', 'true');
    }
  });

  copyDonateAddressButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(donateAddress.textContent.trim());
      copyFeedback.textContent = 'Address copied.';
    } catch (_error) {
      copyFeedback.textContent = 'Could not copy. Please copy manually.';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      donateModal.classList.remove('is-open');
      donateModal.setAttribute('aria-hidden', 'true');
    }
  });

  updateSelectedType(selectedType);
})();
