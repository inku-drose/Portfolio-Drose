const fontOptions = [
  {
    name: 'Plus Jakarta Sans',
    className: 'font-jakarta',
    weight: 800,
    note: 'Polished · modern',
  },
  {
    name: 'Inter Tight',
    className: 'font-inter-tight',
    weight: 700,
    note: 'Compact · cinematic',
  },
  {
    name: 'Archivo Black',
    className: 'font-archivo',
    weight: 400,
    note: 'Bold · editorial',
  },
  {
    name: 'Barlow Condensed',
    className: 'font-barlow',
    weight: 700,
    note: 'Narrow · dramatic',
  },
  {
    name: 'DM Sans',
    className: 'font-dm-sans',
    weight: 700,
    note: 'Clean · restrained',
  },
  {
    name: 'Urbanist',
    className: 'font-urbanist',
    weight: 800,
    note: 'Soft edges · refined',
  },
  {
    name: 'Nunito Sans',
    className: 'font-nunito-sans',
    weight: 800,
    note: 'Rounded · approachable',
  },
  {
    name: 'Outfit',
    className: 'font-outfit',
    weight: 700,
    note: 'Geometric · smooth',
  },
  {
    name: 'Times New Roman',
    className: 'font-times',
    weight: 700,
    note: 'Classic · high contrast',
  },
  {
    name: 'Georgia',
    className: 'font-georgia',
    weight: 700,
    note: 'Warm · editorial serif',
  },
  {
    name: 'Roboto',
    className: 'font-roboto',
    weight: 700,
    note: 'Neutral · familiar',
  },
  {
    name: 'Lato',
    className: 'font-lato',
    weight: 700,
    note: 'Humanist · approachable',
  },
  {
    name: 'Google Sans · Medium/Bold',
    className: 'font-google-sans',
    weight: 700,
    note: 'Device-local · Outfit fallback',
  },
];

export function FontComparison() {
  return (
    <main className="font-comparison">
      <header className="font-comparison-header">
        <p className="font-comparison-kicker">DISPLAY TYPE STUDY · 01</p>
        <h1>Choose the voice of the opening.</h1>
        <p>Same name, same color, thirteen different typefaces.</p>
      </header>
      <section className="font-comparison-grid" aria-label="Font options">
        {fontOptions.map((font, index) => (
          <article className="font-sample" key={font.name}>
            <p className="font-sample-index">{String(index + 1).padStart(2, '0')} / 13</p>
            <h2 className={font.className} style={{ fontWeight: font.weight }}>
              <span>DROSE</span> <em>SHANE</em>
            </h2>
            <div className="font-sample-meta">
              <strong>{font.name}</strong>
              <span>{font.note}</span>
            </div>
          </article>
        ))}
      </section>
      <footer className="font-comparison-footer">
        <span>FONT COMPARISON</span>
        <a href="/">← Return to portfolio</a>
      </footer>
    </main>
  );
}
