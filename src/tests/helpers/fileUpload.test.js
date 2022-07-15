import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dnsbxn4fa',
  api_key: '384254775885994',
  api_secret: 'b0p1xk5rd034Myd2TLN12qgx9hM',
  secure: true,
});

describe('pruebas en fileUpload', () => {
  test('Debe de cargar un archivo y retornar un url', async () => {
    const resp = await fetch(
      'https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png'
    );
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
    //borrar imagen por id

    const segments = url.split('/');
    console.log(segments);
    const imageId = segments[segments.length - 1].replace('.png', '');
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      // done();
    });
  });
  test('Debe de retornar un error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
