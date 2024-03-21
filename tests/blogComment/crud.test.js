global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Blog Comment', () => {
  describe('Query -- findByBlogID', () => {
    it('should return a multple documents with the same BlogID (+)', async () => {
      const page = 1;
      const per_page = 10;
      const blogID = 2

      var options = {
        where: {blog_id: blogID},
        page: page < 1 ? 1 : page,
        paginate: per_page,
        order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.BlogComment.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('blog_id');
        expect(doc).toHaveProperty('user_id');
        expect(doc).toHaveProperty('user_name');
        expect(doc).toHaveProperty('content');

        expect(doc.blog_id).toEqual(blogID);

        expect(doc.user_id).not.toBeNull();
        expect(doc.user_name).not.toBeNull();
        expect(doc.content).not.toBeNull();
      }
    });

    it('should return error for documents with invalid BlogID (-)', async () => {
      const page = 1;
      const per_page = 10;
      const blogID = 'test'

      var options = {
        where: {blog_id: blogID},
        page: page < 1 ? 1 : page,
        paginate: per_page,
        order: [['id', 'desc']],
    };

      let error;
      try {
        await db.BlogComment.paginate(options);
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
        blog_id: 2,
        content: 'Sample Content',
        user_id: '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8',
        user_name: 'John Doe',
      };

      const doc = await db.BlogComment.create({
        blog_id: data.blog_id,
        user_id: data.user_id,
        user_name: data.user_name,
        content: data.content,
    });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.user_id).toEqual(data.user_id);
      expect(doc.content).toEqual(data.content);
      expect(doc.blog_id).toEqual(data.blog_id);
      expect(doc.user_name).toEqual(data.user_name);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        blog_id: 'test',
        content: 'Sample Content',
        user_id: '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8',
        user_name: 123,
      };

      let error;
      try {
        await db.BlogComment.create({
          blog_id: invalidData.blog_id,
          content: invalidData.content,
          user_id: invalidData.user_id,
          user_name: invalidData.user_name,
        });
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
    });
  
  });

  describe('Query -- delete', () => {
    it('should delete the document from the database (+)', async () => {
      const data = {
        blog_id: 2,
        content: 'Sample Content',
        user_id: '1bd95b1b-71e4-45cd-9ba6-fcdb8440b0a8',
        user_name: 'John Doe',
      };

      const doc = await db.BlogComment.create({
        blog_id: data.blog_id,
        user_id: data.user_id,
        user_name: data.user_name,
        content: data.content,
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.BlogComment.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.BlogComment.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Blog Comment not found');
      }
    });
  });
});
