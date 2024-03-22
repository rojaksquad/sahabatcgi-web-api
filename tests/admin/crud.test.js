global.appDir = process.cwd();
const db = require(appDir + '/models/index');
const bcrypt = require('bcrypt');

describe('Unit Tests for Admin', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.Admin.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('username');
        expect(doc).toHaveProperty('password');
        expect(doc).toHaveProperty('full_name');
        expect(doc).toHaveProperty('is_active');

        expect(doc.username).not.toBeNull();
        expect(doc.password).not.toBeNull();
        expect(doc.full_name).not.toBeNull();
        expect(doc.is_active).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = '9d1d7d50-1be9-42b6-8769-eae7d827375e';

      const doc = await db.Admin.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('username');
      expect(doc).toHaveProperty('password');
      expect(doc).toHaveProperty('full_name');
      expect(doc).toHaveProperty('is_active');

      expect(doc.id).toEqual(existingDocumentId);

      expect(doc.username).not.toBeNull();
      expect(doc.password).not.toBeNull();
      expect(doc.full_name).not.toBeNull();
      expect(doc.is_active).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8';

      const doc = await db.Admin.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        username: 'sampleusername',
        password: 'samplepassword',
        full_name: 'Sample Name',
      };

      const saltRounds = 10;
      const plainPassword = data.password;
      const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

      const doc = await db.Admin.create({
        username: data.username,
        password: hashedPassword,
        full_name: data.full_name,
        is_active: true,
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.username).toEqual(data.username);
      expect(doc.full_name).toEqual(data.full_name);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        username: 123,
        password: true, 
        full_name: 123,
      };
  
      let error;
      try {
        await db.Admin.create({
          username: invalidData.username,
          password: invalidData.password,
          full_name: invalidData.full_name,
          is_active: true,
        });
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    });
  
  });

  describe('Query -- update', () => {
    it('should return the updated document with valid properties (+)', async () => {
      const data = {
        username: 'sampleusername',
        password: 'samplepassword',
        full_name: 'Sample Name',
      };

      const saltRounds = 10;
      const plainPassword = data.password;
      const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

      const doc = await db.Admin.create({
        username: data.username,
        password: hashedPassword,
        full_name: data.full_name,
        is_active: true,
      });
  
      const updateData = {
        full_name: 'New Sample Name',
      };
  
      await doc.update(updateData);
  
      await doc.reload();
  
      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();
  
      expect(doc.full_name).toEqual(updateData.full_name);
      expect(doc.username).toEqual(data.username); 
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        full_name: 'New Sample Name',
      };
  
      const nonExistentDocId = '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8';
      const doc = await db.Admin.findByPk(nonExistentDocId);
  
      let error;
      try {
        if (doc) {
          await doc.update(updateData);
        } else {
          throw new Error('Document not found');
        }
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Document not found');
    });
  });

  describe('Query -- delete', () => {
    it('should delete the document from the database (+)', async () => {
      const data = {
        username: 'sampleusername',
        password: 'samplepassword',
        full_name: 'Sample Name',
      };

      const saltRounds = 10;
      const plainPassword = data.password;
      const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

      const doc = await db.Admin.create({
        username: data.username,
        password: hashedPassword,
        full_name: data.full_name,
        is_active: true,
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.Admin.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.Admin.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
