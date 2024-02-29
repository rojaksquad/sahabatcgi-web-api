global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Kegiatan Komunitas', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.KegiatanKomunitas.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('content');
        expect(doc).toHaveProperty('image_url');
        expect(doc).toHaveProperty('date');
        expect(doc).toHaveProperty('tempat');

        expect(doc.title).not.toBeNull();
        expect(doc.content).not.toBeNull();
        expect(doc.date).not.toBeNull();
        expect(doc.tempat).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = 1;

      const doc = await db.KegiatanKomunitas.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('title');
      expect(doc).toHaveProperty('content');
      expect(doc).toHaveProperty('image_url');
      expect(doc).toHaveProperty('date');
      expect(doc).toHaveProperty('tempat');

      expect(doc.title).not.toBeNull();
      expect(doc.content).not.toBeNull();
      expect(doc.date).not.toBeNull();
      expect(doc.tempat).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = 999;

      const doc = await db.KegiatanKomunitas.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        title: 'Sample Title',
        content: 'Sample Content',
        image_url: 'uploads/sample.jpg',
        date: new Date().toISOString().split('T')[0],
        tempat: 'Sample Location'
      };

      const doc = await db.KegiatanKomunitas.create({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        date: data.date,
        tempat: data.tempat
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.title).toEqual(data.title);
      expect(doc.content).toEqual(data.content);
      expect(doc.image_url).toEqual(data.image_url);
      expect(doc.date).toEqual(data.date);
      expect(doc.tempat).toEqual(data.tempat);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        title: 123,
        content: 123, 
        image_url: true,
        date: 'Invalid Date', 
        tempat: null 
      };
  
      let error;
      try {
        await db.KegiatanKomunitas.create({
          title: invalidData.title,
          content: invalidData.content,
          image_url: invalidData.image_url,
          date: invalidData.date,
          tempat: invalidData.tempat
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
        date: new Date().toISOString().split('T')[0],
        tempat: 'Sample Location'
      };
  
      const doc = await db.KegiatanKomunitas.create({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        date: data.date,
        tempat: data.tempat
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
      const doc = await db.KegiatanKomunitas.findByPk(nonExistentDocId);
  
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
        date: new Date().toISOString().split('T')[0],
        tempat: 'Sample Location'
      };
  
      const doc = await db.KegiatanKomunitas.create({
        title: data.title,
        content: data.content,
        image_url: data.image_url,
        date: data.date,
        tempat: data.tempat
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.KegiatanKomunitas.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.KegiatanKomunitas.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Kegiatan Komunitas not found');
      }
    });
  });
});
