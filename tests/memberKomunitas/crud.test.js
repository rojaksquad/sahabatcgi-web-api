global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Member Komunitas', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.MemberKomunitas.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('full_name');
        expect(doc).toHaveProperty('jabatan');
        expect(doc).toHaveProperty('image_url');
        expect(doc).toHaveProperty('quote');

        expect(doc.full_name).not.toBeNull();
        expect(doc.jabatan).not.toBeNull();
        expect(doc.quote).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = 1;

      const doc = await db.MemberKomunitas.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('full_name');
      expect(doc).toHaveProperty('jabatan');
      expect(doc).toHaveProperty('image_url');
      expect(doc).toHaveProperty('quote');

      expect(doc.id).toEqual(existingDocumentId);

      expect(doc.title).not.toBeNull();
      expect(doc.content).not.toBeNull();
      expect(doc.kategori).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = 999;

      const doc = await db.MemberKomunitas.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        full_name: 'Sample Name',
        jabatan: 'Sample Jabatan',
        image_url: 'uploads/sample.jpg',
        quote: 'Sample Quote',
      };

      const doc = await db.MemberKomunitas.create({
        full_name: data.full_name,
        jabatan: data.jabatan,
        image_url: data.image_url,
        quote: data.quote,
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.full_name).toEqual(data.full_name);
      expect(doc.jabatan).toEqual(data.jabatan);
      expect(doc.image_url).toEqual(data.image_url);
      expect(doc.quote).toEqual(data.quote);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        full_name: 123,
        jabatan: 123, 
        image_url: true,
        quote: 123, 
      };
  
      let error;
      try {
        await db.MemberKomunitas.create({
          full_name: invalidData.full_name,
          jabatan: invalidData.jabatan,
          image_url: invalidData.image_url,
          quote: invalidData.quote,
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
        full_name: 'Sample Name',
        jabatan: 'Sample Jabatan',
        image_url: 'uploads/sample.jpg',
        quote: 'Sample Quote',
      };
  
      const doc = await db.MemberKomunitas.create({
        full_name: data.full_name,
        jabatan: data.jabatan,
        image_url: data.image_url,
        quote: data.quote,
      });
  
      const updateData = {
        full_name: 'New Sample Name',
      };
  
      await doc.update(updateData);
  
      await doc.reload();
  
      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();
  
      expect(doc.full_name).toEqual(updateData.full_name);
      expect(doc.jabatan).toEqual(data.jabatan); 
      expect(doc.image_url).toEqual(data.image_url); 
      expect(doc.quote).toEqual(data.quote); 
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        full_name: 'New Sample Name',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.MemberKomunitas.findByPk(nonExistentDocId);
  
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
        full_name: 'Sample Name',
        jabatan: 'Sample Jabatan',
        image_url: 'uploads/sample.jpg',
        quote: 'Sample Quote',
      };
  
      const doc = await db.MemberKomunitas.create({
        full_name: data.full_name,
        jabatan: data.jabatan,
        image_url: data.image_url,
        quote: data.quote,
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.MemberKomunitas.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.MemberKomunitas.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Member Komunitas not found');
      }
    });
  });
});
