import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  const CLASS_NAMES = {
    TABLIST: 'tabs-list deal-cards__tab-container',
    TABPANEL: 'tabs-panel',
    DEALS_LIST: 'deal-cards__list',
    DEALS_ITEM: 'deal-cards__item',
    IMAGE: 'deal-cards__image',
    CONTENT: 'deal-cards__content',
    DETAILS: 'deal-cards__details',
    LOCATION: 'deal-cards__location',
    CTA: 'deal-cards__cta',
    TAB: 'tabs-tab deal-cards__tab',
  };

  const ATTRIBUTES = {
    ROLE: 'role',
    ARIA_HIDDEN: 'aria-hidden',
    ARIA_SELECTED: 'aria-selected',
    ARIA_CONTROLS: 'aria-controls',
    ARIA_LABELLEDBY: 'aria-labelledby',
    TYPE: 'type',
  };

  // Build the tablist container
  const tablist = document.createElement('div');
  tablist.className = CLASS_NAMES.TABLIST;
  tablist.setAttribute(ATTRIBUTES.ROLE, 'tablist');

  // Decorate tabs and panels
  [...block.children].forEach((child, index) => {
    const tab = child.firstElementChild;
    const id = toClassName(tab.textContent);

    // Set up the tab panel
    const tabpanel = child;
    Object.assign(tabpanel, {
      className: CLASS_NAMES.TABPANEL,
      id: `tabpanel-${id}`,
    });
    tabpanel.setAttribute(ATTRIBUTES.ARIA_HIDDEN, index !== 0);
    tabpanel.setAttribute(ATTRIBUTES.ARIA_LABELLEDBY, `tab-${id}`);
    tabpanel.setAttribute(ATTRIBUTES.ROLE, 'tabpanel');

    // Add deals card styling
    decorateDeals(tabpanel, CLASS_NAMES);

    // Build the tab button
    const button = createButton(tab.innerHTML, `tab-${id}`, `tabpanel-${id}`, index === 0);
    button.addEventListener('click', () => onTabClick(button, tabpanel, tablist, block));

    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);
}

function decorateDeals(tabpanel, CLASS_NAMES) {
  if (!tabpanel) return;

  tabpanel.classList.add(CLASS_NAMES.DEALS_LIST);
  tabpanel.querySelectorAll(':scope > div').forEach((item) => {
    item.classList.add(CLASS_NAMES.DEALS_ITEM);

    // Style images
    item.querySelectorAll('img').forEach((img) => img.classList.add(CLASS_NAMES.IMAGE));

    // Group content
    const paragraphs = item.querySelectorAll('p');
    if (paragraphs.length > 0) {
      wrapElement(paragraphs[0], CLASS_NAMES.CONTENT, item);
      const detailsContainer = createElementWithClass('div', CLASS_NAMES.DETAILS);
      item.appendChild(detailsContainer);

      // Decorate specific elements
      const [, location, cta] = paragraphs;
      if (location) location.classList.add(CLASS_NAMES.LOCATION), detailsContainer.append(location);
      if (cta) cta.classList.add(CLASS_NAMES.CTA), detailsContainer.append(cta);
    }
  });
}

function wrapElement(element, className, parent) {
  const wrapper = document.createElement('div');
  wrapper.className = className;
  parent.insertBefore(wrapper, element);
  wrapper.appendChild(element);
}

function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function createButton(innerHTML, id, controls, isSelected) {
  const button = document.createElement('button');
  Object.assign(button, {
    innerHTML,
    id,
    className: 'tabs-tab deal-cards__tab',
  });
  button.setAttribute('role', 'tab');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-controls', controls);
  button.setAttribute('aria-selected', isSelected);
  return button;
}

function onTabClick(button, tabpanel, tablist, block) {
  block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
    panel.setAttribute('aria-hidden', true);
  });
  tablist.querySelectorAll('button').forEach((btn) => {
    btn.setAttribute('aria-selected', false);
  });
  tabpanel.setAttribute('aria-hidden', false);
  button.setAttribute('aria-selected', true);
}
