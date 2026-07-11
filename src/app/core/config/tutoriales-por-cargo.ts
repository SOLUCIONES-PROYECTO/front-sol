export interface Tutorial {
  titulo: string;
  descripcion: string;
  youtubeId: string; // el código que aparece después de "v=" en la URL de YouTube
}

export const TUTORIALES_POR_CARGO: Record<string, Tutorial[]> = {

  'Administrador': [
    {
      titulo: 'Login y registro',
      descripcion: 'Iniciar Sesion.',
      youtubeId: 'https://youtu.be/rr2PBki3tUk'
    },
    {
      titulo: 'Registrar un ingreso de mercadería',
      descripcion: 'Cómo crear un nuevo ingreso correctamente.',
      youtubeId: 'https://youtu.be/GuMFsIPUsLI'
    },
    {
      titulo: 'Registrar un egreso de mercadería',
      descripcion: 'Cómo crear un nuevo egreso correctamente.',
      youtubeId: 'https://youtu.be/o_D180ZKGcY'
    },
    {
      titulo: 'Registrar un producto',
      descripcion: 'Cómo agregar nuevos productos al catálogo.',
      youtubeId: 'https://youtu.be/TM6T0_egJks'
    },
    {
      titulo: 'Registrar un proveedor',
      descripcion: 'Cómo agregar nuevos proveedores al sistema.',
      youtubeId: 'https://youtu.be/sbS_1xAp3lw'
    },
    {
      titulo: 'Registrar una orden de compra',
      descripcion: 'Registrar una orden de compra correctamente y cómo gestionarla.',
      youtubeId: 'https://youtu.be/dPVk7_i_xCk'
    },
  ],

  'Jefe de Compras': [
    {
      titulo: 'Registrar un ingreso de mercadería',
      descripcion: 'Cómo crear un nuevo ingreso correctamente.',
      youtubeId: 'https://youtu.be/GuMFsIPUsLI'
    },
    {
      titulo: 'Registrar un producto',
      descripcion: 'Cómo agregar nuevos productos al catálogo.',
      youtubeId: 'https://youtu.be/TM6T0_egJks'
    },
    {
      titulo: 'Registrar un proveedor',
      descripcion: 'Cómo agregar nuevos proveedores al sistema.',
      youtubeId: 'https://youtu.be/sbS_1xAp3lw'
    },
    {
      titulo: 'Registrar una orden de compra',
      descripcion: 'Registrar una orden de compra correctamente y cómo gestionarla.',
      youtubeId: 'https://youtu.be/dPVk7_i_xCk'
    },
  ],

  'Almacenero': [
    {
      titulo: 'Registrar un ingreso de mercadería',
      descripcion: 'Cómo crear un nuevo ingreso correctamente.',
      youtubeId: 'https://youtu.be/GuMFsIPUsLI'
    },
    {
      titulo: 'Registrar un egreso de mercadería',
      descripcion: 'Cómo crear un nuevo egreso correctamente.',
      youtubeId: 'https://youtu.be/o_D180ZKGcY'
    },
    {
      titulo: 'Registrar un producto',
      descripcion: 'Cómo agregar nuevos productos al catálogo.',
      youtubeId: 'https://youtu.be/TM6T0_egJks'
    },

  ],

  'Vendedor': [
    {
      titulo: 'Registrar un egreso de mercadería',
      descripcion: 'Cómo crear un nuevo egreso correctamente.',
      youtubeId: 'https://youtu.be/o_D180ZKGcY'
    },
    {
      titulo: 'Registrar un producto',
      descripcion: 'Cómo agregar nuevos productos al catálogo.',
      youtubeId: 'https://youtu.be/TM6T0_egJks'
    },
  ],

};