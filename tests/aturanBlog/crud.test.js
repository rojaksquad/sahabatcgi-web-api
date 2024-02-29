global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Aturan Blog', () => {
  describe('Query -- findOne', () => {
    it('should return a single data with valid information', async () => {
      const doc = await db.AturanBlog.findOne();

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('title');
      expect(doc).toHaveProperty('content');

      expect(doc.title).not.toBeNull();
      expect(doc.content).not.toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        title: 'Sample Title',
        content: 'Sample Content',
      };

      const doc = await db.AturanBlog.create({
        title: data.title,
        content: data.content,
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.title).toEqual(data.title);
      expect(doc.content).toEqual(data.content);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        title: 123,
        content: 123,
      };
  
      let error;
      try {
        await db.AturanBlog.create({
          title: invalidData.title,
          content: invalidData.content,
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
      };

      const doc = await db.AturanBlog.create({
        title: data.title,
        content: data.content,
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
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        title: 'New Sample Title',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.AturanBlog.findByPk(nonExistentDocId);
  
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
      };

      const doc = await db.AturanBlog.create({
        title: data.title,
        content: data.content,
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.AturanBlog.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.AturanBlog.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Aturan Blog not found');
      }
    });
  });
});
