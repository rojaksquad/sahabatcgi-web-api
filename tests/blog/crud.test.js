global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Blog', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.Blog.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('content');
        expect(doc).toHaveProperty('author_id');
        expect(doc).toHaveProperty('author_name');
        expect(doc).toHaveProperty('isVerified');

        expect(doc.title).not.toBeNull();
        expect(doc.author_id).not.toBeNull();
        expect(doc.author_name).not.toBeNull();
        expect(doc.content).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = 2;

      const doc = await db.Blog.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('title');
      expect(doc).toHaveProperty('content');
      expect(doc).toHaveProperty('author_id');
      expect(doc).toHaveProperty('author_name');
      expect(doc).toHaveProperty('isVerified');

      expect(doc.id).toEqual(existingDocumentId);

      expect(doc.title).not.toBeNull();
      expect(doc.content).not.toBeNull();
      expect(doc.author_name).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = 999;

      const doc = await db.Blog.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- findByUserID', () => {
    it('should return a multple documents with the same UserID (+)', async () => {
      const page = 1;
      const per_page = 10;
      const userID = 'bae75331-9208-406d-ac10-0698bacb61c9'

      var options = {
        where: {author_id: userID},
        page: page < 1 ? 1 : page,
        paginate: per_page,
        order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.Blog.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('title');
        expect(doc).toHaveProperty('content');
        expect(doc).toHaveProperty('author_id');
        expect(doc).toHaveProperty('author_name');
        expect(doc).toHaveProperty('isVerified');

        expect(doc.author_id).toEqual(userID);

        expect(doc.title).not.toBeNull();
        expect(doc.content).not.toBeNull();
        expect(doc.author_name).not.toBeNull();
      }
    });

    it('should return error for documents with invalid categories (-)', async () => {
      const page = 1;
      const per_page = 10;
      const userID = 123

      var options = {
        where: {author_id: userID},
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
        author_id: '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8',
        author_name: 'John Doe',
      };

      const doc = await db.Blog.create({
        title: data.title,
        content: data.content,
        author_id: data.author_id,
        author_name: data.author_name,
        isVerified: false
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.title).toEqual(data.title);
      expect(doc.content).toEqual(data.content);
      expect(doc.author_id).toEqual(data.author_id);
      expect(doc.author_name).toEqual(data.author_name);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        title: 123,
        content: 'Sample Content',
        author_id: 123,
        author_name: 'John Doe',
      };

      let error;
      try {
        await db.Blog.create({
          title: invalidData.title,
          content: invalidData.content,
          author_id: invalidData.author_id,
          author_name: invalidData.author_name,
          isVerified: false
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
        author_id: '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8',
        author_name: 'John Doe',
      };

      const doc = await db.Blog.create({
        title: data.title,
        content: data.content,
        author_id: data.author_id,
        author_name: data.author_name,
        isVerified: false
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
      expect(doc.author_id).toEqual(data.author_id);
      expect(doc.author_name).toEqual(data.author_name);
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        title: 'New Sample Title',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.Blog.findByPk(nonExistentDocId);
  
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
        author_id: '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8',
        author_name: 'John Doe',
      };

      const doc = await db.Blog.create({
        title: data.title,
        content: data.content,
        author_id: data.author_id,
        author_name: data.author_name,
        isVerified: false
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.Blog.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.Blog.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Blog not found');
      }
    });
  });
});
