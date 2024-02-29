global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Berita', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.Berita.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('content');
        expect(doc).toHaveProperty('image_url');
        expect(doc).toHaveProperty('kategori');
        expect(doc).toHaveProperty('doi_link');

        expect(doc.title).not.toBeNull();
        expect(doc.content).not.toBeNull();
        expect(doc.kategori).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = 1;

      const doc = await db.Berita.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('title');
      expect(doc).toHaveProperty('content');
      expect(doc).toHaveProperty('image_url');
      expect(doc).toHaveProperty('kategori');
      expect(doc).toHaveProperty('doi_link');

      expect(doc.id).toEqual(existingDocumentId);

      expect(doc.title).not.toBeNull();
      expect(doc.content).not.toBeNull();
      expect(doc.kategori).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = 999;

      const doc = await db.Berita.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- findMultiple', () => {
    it('should return a multple documents with the same categories (+)', async () => {
      const page = 1;
      const per_page = 10;
      const req_kategori = 'perkembanganKomunitas'

      var options = {
          where: {kategori: req_kategori},
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.Berita.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('content');
        expect(doc).toHaveProperty('image_url');
        expect(doc).toHaveProperty('kategori');
        expect(doc).toHaveProperty('doi_link');

        expect(doc.kategori).toEqual(req_kategori);

        expect(doc.title).not.toBeNull();
        expect(doc.content).not.toBeNull();
        expect(doc.kategori).not.toBeNull();
      }
    });

    it('should return error for documents with invalid categories (-)', async () => {
      const page = 1;
      const per_page = 10;
      const req_kategori = 'invalid_category'

      var options = {
          where: {kategori: req_kategori},
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };


      let error;
      try {
        await db.Berita.paginate(options);
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        title: 'Sample Title',
        content: 'Sample Content',
        image_url: 'uploads/sample.jpg',
        kategori: 'perkembanganCML',
        doi_link: 'Sample DOI Link'
      };

      const doc = await db.Berita.create({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        kategori: data.kategori,
        doi_link: data.doi_link
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.title).toEqual(data.title);
      expect(doc.content).toEqual(data.content);
      expect(doc.image_url).toEqual(data.image_url);
      expect(doc.kategori).toEqual(data.kategori);
      expect(doc.doi_link).toEqual(data.doi_link);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        title: 123,
        content: 123, 
        image_url: true,
        kategori: 'Invalid Category', 
        doi_link: null 
      };
  
      let error;
      try {
        await db.Berita.create({
          title: invalidData.title,
          content: invalidData.content,
          image_url: invalidData.image_url,
          kategori: invalidData.kategori,
          doi_link: invalidData.doi_link
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
        title: 'Sample Title',
        content: 'Sample Content',
        image_url: 'uploads/sample.jpg',
        kategori: 'perkembanganCML',
        doi_link: 'Sample DOI Link'
      };
  
      const doc = await db.Berita.create({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        kategori: data.kategori,
        doi_link: data.doi_link
      });
  
      const updateData = {
        title: 'New Sample Title',
      };
  
      await doc.update(updateData);
  
      await doc.reload();
  
      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();
  
      expect(doc.title).toEqual(updateData.title);
      expect(doc.content).toEqual(data.content); 
      expect(doc.image_url).toEqual(data.image_url); 
      expect(doc.date).toEqual(data.date); 
      expect(doc.tempat).toEqual(data.tempat);
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        title: 'New Sample Title',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.Berita.findByPk(nonExistentDocId);
  
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
        title: 'Sample Title',
        content: 'Sample Content',
        image_url: 'uploads/sample.jpg',
        kategori: 'perkembanganCML',
        doi_link: 'Sample DOI Link'
      };
  
      const doc = await db.Berita.create({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        date: data.date,
        tempat: data.tempat
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.Berita.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.Berita.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Berita not found');
      }
    });
  });
});
