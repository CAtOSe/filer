const filesystem = require('./filesystem');

test('list project directory', async () => {
  const dirListing = await filesystem.listDirectory('./');
  expect(dirListing).toBeDefined();
  expect(dirListing).toContain('package.json'); // Do not remove package.json or this test will fail
});

test('list nonexistent directory', async () => {
  let dirListing;

  try {
    dirListing = await filesystem.listDirectory('./core/');
  } catch (e) {
    expect(e).toBeDefined();
  }

  expect(dirListing.code).toBe('ENOENT');
});
