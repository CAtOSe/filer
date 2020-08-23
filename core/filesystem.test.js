const filesystem = require('./filesystem');

// @test listDirectory
test('list project directory', async () => {
  const dirListing = await filesystem.listDirectory('./');
  expect(dirListing).toBeDefined();

  expect(dirListing.length).toBeGreaterThan(0);
});

// @test listDirectory
test('list nonexistent directory', async () => {
  const dirListing = await filesystem.listDirectory('./dasuhsaiuhdsiaddd/');

  expect(dirListing).toBeUndefined();
});

// @test createObject
test('create file object', async () => {
  const testPath = 'index.js';
  const fileObject = await filesystem.createObject(`./${testPath}`);

  expect(fileObject).toBeDefined();
  expect(fileObject.type).toBe('file');
  expect(fileObject.basename).toBe(testPath);
  expect(fileObject.path).toMatch(RegExp(testPath, 'g'));
});

// @test createObject
test('create directory object', async () => {
  const testPath = 'core';
  const fileObject = await filesystem.createObject(`./${testPath}`);

  expect(fileObject).toBeDefined();
  expect(fileObject.type).toBe('dir');
  expect(fileObject.basename).toBe(testPath);
  expect(fileObject.path).toMatch(RegExp(testPath, 'g'));
});

// @test createObject
test('create nonexistent object', async () => {
  const testPath = 'dasuhsaiuhdsiaddd';
  const fileObject = await filesystem.createObject(`./${testPath}`);

  expect(fileObject).toBeUndefined();
});
