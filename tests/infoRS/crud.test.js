global.appDir = process.cwd();
const db = require(appDir + '/models/index');

describe('Unit Tests for Info RS', () => {
  describe('Query -- findAll', () => {
    it('should return all data with pagination information', async () => {
      const page = 1;
      const per_page = 10;

      var options = {
          page: page < 1 ? 1 : page,
          paginate: per_page,
          order: [['id', 'desc']],
      };

      const { docs, pages, total } = await db.InfoRS.paginate(options);

      expect(docs).toBeDefined();
      expect(docs).not.toBeNull();

      for (const doc of docs) {
        expect(doc).toHaveProperty('nama_rs');
        expect(doc).toHaveProperty('lokasi_rs');
        expect(doc).toHaveProperty('image_url');
        expect(doc).toHaveProperty('link_maps');
        expect(doc).toHaveProperty('latlong');
        expect(doc).toHaveProperty('info_kontak');

        expect(doc.nama_rs).not.toBeNull();
        expect(doc.link_maps).not.toBeNull();
      }
    });
  });

  describe('Query -- findOne', () => {
    it('should return a single document with valid properties (+)', async () => {
      const existingDocumentId = 1;

      const doc = await db.InfoRS.findOne({
        where: { id: existingDocumentId }
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc).toHaveProperty('nama_rs');
      expect(doc).toHaveProperty('lokasi_rs');
      expect(doc).toHaveProperty('image_url');
      expect(doc).toHaveProperty('link_maps');
      expect(doc).toHaveProperty('latlong');
      expect(doc).toHaveProperty('info_kontak');

      expect(doc.id).toEqual(existingDocumentId);

      expect(doc.nama_rs).not.toBeNull();
      expect(doc.link_maps).not.toBeNull();
    });

    it('should return null for non-existing document (-)', async () => {
      const nonExistingDocumentId = 999;

      const doc = await db.InfoRS.findOne({
        where: { id: nonExistingDocumentId }
      });

      expect(doc).toBeNull();
    });
  });

  describe('Query -- create', () => {
    it('should return the created document with valid properties (+)', async () => {
      const data = {
        nama_rs: 'Sample Name',
        lokasi_rs: 'Sample Location',
        image_url: 'image/sample',
        link_maps: 'http://example.com',
        latlong: '17779123213, -921839138',
        info_kontak: '0812882194846',
      };

      const doc = await db.InfoRS.create({
          nama_rs: data.nama_rs,
          lokasi_rs: data.lokasi_rs,
          image_url: data.image_url,
          link_maps: data.link_maps,
          latlong: data.latlong,
          info_kontak: data.info_kontak,
      });

      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();

      expect(doc.nama_rs).toEqual(data.nama_rs);
      expect(doc.lokasi_rs).toEqual(data.lokasi_rs);
      expect(doc.image_url).toEqual(data.image_url);
      expect(doc.link_maps).toEqual(data.link_maps);
      expect(doc.latlong).toEqual(data.latlong);
      expect(doc.info_kontak).toEqual(data.info_kontak);

      await doc.destroy();
    });

    it('should return an error for invalid data (-)', async () => {
      const invalidData = {
        nama_rs: 123,
        lokasi_rs: 123,
        image_url: 123,
        link_maps: 'http://example.com',
        latlong: '0',
        info_kontak: 'abc',
      };
  
      let error;
      try {
        await db.InfoRS.create({
          nama_rs: invalidData.nama_rs,
          lokasi_rs: invalidData.lokasi_rs,
          image_url: invalidData.image_url,
          link_maps: invalidData.link_maps,
          latlong: invalidData.latlong,
          info_kontak: invalidData.info_kontak,
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
        nama_rs: 'Sample Name',
        lokasi_rs: 'Sample Location',
        image_url: 'image/sample',
        link_maps: 'http://example.com',
        latlong: '17779123213, -921839138',
        info_kontak: '0812882194846',
      };

      const doc = await db.InfoRS.create({
          nama_rs: data.nama_rs,
          lokasi_rs: data.lokasi_rs,
          image_url: data.image_url,
          link_maps: data.link_maps,
          latlong: data.latlong,
          info_kontak: data.info_kontak,
      });
  
      const updateData = {
        nama_rs: 'New Sample Name',
      };
  
      await doc.update(updateData);
  
      await doc.reload();
  
      expect(doc).toBeDefined();
      expect(doc).not.toBeNull();
  
      expect(doc.nama_rs).toEqual(updateData.nama_rs);
      expect(doc.lokasi_rs).toEqual(data.lokasi_rs); 
  
      await doc.destroy();
    });

    it('should return an error when attempting to update a non-existent document (-)', async () => {
      const updateData = {
        nama_rs: 'New Sample Name',
      };
  
      const nonExistentDocId = 99999;
      const doc = await db.InfoRS.findByPk(nonExistentDocId);
  
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
        nama_rs: 'Sample Name',
        lokasi_rs: 'Sample Location',
        image_url: 'image/sample',
        link_maps: 'http://example.com',
        latlong: '17779123213, -921839138',
        info_kontak: '0812882194846',
      };

      const doc = await db.InfoRS.create({
          nama_rs: data.nama_rs,
          lokasi_rs: data.lokasi_rs,
          image_url: data.image_url,
          link_maps: data.link_maps,
          latlong: data.latlong,
          info_kontak: data.info_kontak,
      });
  
      await doc.destroy();
  
      const deletedDoc = await db.InfoRS.findByPk(doc.id);
  
      expect(deletedDoc).toBeNull();
    });

    it('should return an error when attempting to delete a non-existing document (-)', async () => {
      const idToDelete = 9999;
  
      try {
        await db.InfoRS.destroy({ where: { id: idToDelete } });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toContain('Info RS not found');
      }
    });
  });
});
