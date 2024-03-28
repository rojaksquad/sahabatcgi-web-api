global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Profil Komunitas', () => {
  describe('Query -- findOne', () => {
    it('should return a single data with valid information', async () => {
      const doc = await db.ProfilKomunitas.findOne();

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('title');
      expect(doc).toHaveProperty('content');
      expect(doc).toHaveProperty('visi');
      expect(doc).toHaveProperty('misi');
      expect(doc).toHaveProperty('image_url');
      expect(doc).toHaveProperty('ig_link');
      expect(doc).toHaveProperty('twitter_link');
      expect(doc).toHaveProperty('fb_link');

      expect(doc.title).not.toBeNull();
      expect(doc.content).not.toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        title: 'Sample Title',
        content: 'Sample Content',
        visi: 'Sample Visi',
        misi: 'Sample Misi',
        image_url: 'uploads/sample.jpg',
        ig_link: 'Sample IG Link',
        twitter_link: 'Sample Twitter Link',
        fb_link: 'Sample FB Link',
      };

      const doc = await db.ProfilKomunitas.create({
        title: data.title,
        content: data.content,
        visi: data.visi,
        misi: data.misi,
        image_url: data.image_url,
        ig_link: data.ig_link,
        twitter_link: data.twitter_link,
        fb_link: data.fb_link
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.title).toEqual(data.title);
      expect(doc.content).toEqual(data.content);
      expect(doc.visi).toEqual(data.visi);
      expect(doc.misi).toEqual(data.misi);
      expect(doc.image_url).toEqual(data.image_url);
      expect(doc.ig_link).toEqual(data.ig_link);
      expect(doc.twitter_link).toEqual(data.twitter_link);
      expect(doc.fb_link).toEqual(data.fb_link);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        title: 123,
        content: 123,
        visi: 123,
        misi: 123,
        image_url: true,
        ig_link: 123,
        twitter_link: 123,
        fb_link: 123,
      };
  
      let error;
      try {
        await db.ProfilKomunitas.create({
          title: invalidData.title,
          content: invalidData.content,
          visi: invalidData.visi,
          misi: invalidData.misi,
          image_url: invalidData.image_url,
          ig_link: invalidData.ig_link,
          twitter_link: invalidData.twitter_link,
          fb_link: invalidData.fb_link
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
        visi: 'Sample Visi',
        misi: 'Sample Misi',
        image_url: 'uploads/sample.jpg',
        ig_link: 'Sample IG Link',
        twitter_link: 'Sample Twitter Link',
        fb_link: 'Sample FB Link',
      };

      const doc = await db.ProfilKomunitas.create({
        title: data.title,
        content: data.content,
        visi: data.visi,
        misi: data.misi,
        image_url: data.image_url,
        ig_link: data.ig_link,
        twitter_link: data.twitter_link,
        fb_link: data.fb_link
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
      expect(doc.visi).toEqual(data.visi);
      expect(doc.misi).toEqual(data.misi);
      expect(doc.image_url).toEqual(data.image_url); 
      expect(doc.ig_link).toEqual(data.ig_link); 
      expect(doc.twitter_link).toEqual(data.twitter_link); 
      expect(doc.fb_link).toEqual(data.fb_link); 
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        title: 'New Sample Title',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.ProfilKomunitas.findByPk(nonExistentDocId);
  
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
        visi: 'Sample Visi',
        misi: 'Sample Misi',
        image_url: 'uploads/sample.jpg',
        ig_link: 'Sample IG Link',
        twitter_link: 'Sample Twitter Link',
        fb_link: 'Sample FB Link',
      };

      const doc = await db.ProfilKomunitas.create({
        title: data.title,
        content: data.content,
        visi: data.visi,
        misi: data.misi,
        image_url: data.image_url,
        ig_link: data.ig_link,
        twitter_link: data.twitter_link,
        fb_link: data.fb_link
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.ProfilKomunitas.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.ProfilKomunitas.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Profil Komunitas not found');
      }
    });
  });
});
