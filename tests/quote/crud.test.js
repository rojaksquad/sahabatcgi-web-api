global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Quote', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.Quote.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('author_name');
        expect(doc).toHaveProperty('quote');
        expect(doc).toHaveProperty('image_url');


        expect(doc.author_name).not.toBeNull();
        expect(doc.quote).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = 1;

      const doc = await db.Quote.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('author_name');
      expect(doc).toHaveProperty('quote');
      expect(doc).toHaveProperty('image_url');

      expect(doc.id).toEqual(existingDocumentId);

      expect(doc.author_name).not.toBeNull();
      expect(doc.quote).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = 999;

      const doc = await db.Quote.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        author_name: 'Sample Name',
        quote: 'Sample Quote',
        image_url: 'uploads/sample.jpg',
      };

      const doc = await db.Quote.create({
        author_name: data.author_name,
        quote: data.quote,
        image_url: data.image_url,
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.author_name).toEqual(data.author_name);
      expect(doc.quote).toEqual(data.quote);
      expect(doc.image_url).toEqual(data.image_url);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        author_name: 123,
        quote: 123, 
        image_url: true,
      };
  
      let error;
      try {
        await db.Quote.create({
          author_name: invalidData.author_name,
          quote: invalidData.quote,
          image_url: invalidData.image_url,
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
        author_name: 'Sample Name',
        quote: 'Sample Quote',
        image_url: 'uploads/sample.jpg',
      };

      const doc = await db.Quote.create({
        author_name: data.author_name,
        quote: data.quote,
        image_url: data.image_url,
      });
  
      const updateData = {
        author_name: 'New Sample Name',
      };
  
      await doc.update(updateData);
  
      await doc.reload();
  
      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();
  
      expect(doc.author_name).toEqual(updateData.author_name);
      expect(doc.quote).toEqual(data.quote); 
      expect(doc.image_url).toEqual(data.image_url); 
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        author_name: 'New Sample Name',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.Quote.findByPk(nonExistentDocId);
  
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
        author_name: 'Sample Name',
        quote: 'Sample Quote',
        image_url: 'uploads/sample.jpg',
      };

      const doc = await db.Quote.create({
        author_name: data.author_name,
        quote: data.quote,
        image_url: data.image_url,
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.Quote.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.Quote.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Quote not found');
      }
    });
  });
});
