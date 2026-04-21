/**
 * Decorates the accordion block
 * @param {Element} block The accordion block element
 */
export default function decorate(block) {
  const items = block.querySelectorAll(':scope > div');

  items.forEach((item) => {
    const [headingDiv, contentDiv] = item.children;

    if (!headingDiv || !contentDiv) return;

    // Extract text content
    const heading = headingDiv.textContent.trim();
    const content = contentDiv.innerHTML;

    // Build accordion item structure
    item.className = 'accordion-item';
    item.innerHTML = `
      <button class="accordion-button" aria-expanded="false">
        <span class="accordion-title">${heading}</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-content" hidden>
        ${content}
      </div>
    `;

    // Add click handler
    const button = item.querySelector('.accordion-button');
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isOpen);
      item.querySelector('.accordion-content').hidden = isOpen;
    });
  });
}
