describe('svg-fallback', function () {
  it('should have an SVG logo', function () {
    browser().navigateTo('/');
    expect(element('img[src="logo.svg"]').count()).toBe(1);
  });

  it('should have an SVGZ logo', function () {
    browser().navigateTo('/');
    expect(element('img[src="logo.svgz"]').count()).toBe(1);
  });

  it('should translate SVG and SVGZ logo to PNG', function () {
    browser().navigateTo('/svg-false.html');
    expect(element('img[src="logo.png"]').count()).toBe(2);
  });

  it('should translate SVG logo to specified PNG', function () {
    browser().navigateTo('/svg-false.html');
    expect(element('img[src="logo-big.png"]').count()).toBe(1);
  });
});