export function renderItemCards(items, container) {
  container.innerHTML = items
    .map(
      (item) => `
        <article>
          <h2>${item.name}</h2>
          <p>${item.shortDescription}</p>
        </article>
      `,
    )
    .join('')
}
