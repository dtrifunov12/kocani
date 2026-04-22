/**
 * loads and decorates the accordion block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // Get all direct child divs (accordion items)
  const items = block.querySelectorAll(':scope > div');

  items.forEach((item, index) => {
    // Get the heading and content divs
    const children = item.querySelectorAll(':scope > div');
    if (children.length < 2) return; // Skip if structure is incomplete

    const headingDiv = children[0];
    const contentDiv = children[1];

    const heading = headingDiv.querySelector('h3');
    if (!heading) return; // Skip if no heading found

    // Add accordion item class
    item.classList.add('accordion-item');

    // Create button from heading
    const button = document.createElement('button');
    button.classList.add('accordion-button');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `accordion-content-${index}`);
    button.innerHTML = `${heading.textContent}<span class="accordion-icon">+</span>`;

    // Create content container
    const content = document.createElement('div');
    content.classList.add('accordion-content');
    content.setAttribute('id', `accordion-content-${index}`);
    content.setAttribute('hidden', '');
    content.innerHTML = contentDiv.innerHTML;

    // Replace old structure with new one
    item.innerHTML = '';
    item.appendChild(button);
    item.appendChild(content);

    // Add click event listener
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        content.setAttribute('hidden', '');
      } else {
        content.removeAttribute('hidden');
      }
    });
  });
}
