interface NoticiaProps {
  categoria: string;
  titulo: string;
  resumen: string;
  imagenUrl: string;
}

export default function TarjetaNoticia({ categoria, titulo, resumen, imagenUrl }: NoticiaProps) {
  return (
    // <article> define un contenido independiente y autónomo (una noticia)
    <article className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow mb-6 relative">
      
      {/* <figure> es el contenedor semántico correcto para imágenes ilustrativas */}
      <figure className="md:w-1/3 h-48 md:h-auto m-0">
        <img 
          src={imagenUrl} 
          alt={`Ilustración de la noticia: ${titulo}`} 
          className="w-full h-full object-cover"
        />
      </figure>

      {/* <a> envuelve el contenido para que toda la sección sea un enlace clickeable */}
      <a href="#" className="p-6 md:w-2/3 flex flex-col justify-center text-inherit decoration-transparent">
        
        {/* <header> agrupa la introducción de este artículo (etiqueta y título) */}
        <header className="mb-2">
          {/* <strong> resalta la importancia de la categoría sin usar un div o span vacío */}
          <strong className="text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3 font-semibold">
            {categoria}
          </strong>
          
          <h3 className="text-xl font-bold text-gray-900 m-0">{titulo}</h3>
        </header>
        
        {/* <p> para el párrafo del resumen */}
        <p className="text-gray-600 text-sm mb-4">{resumen}</p>

        {/* <footer> para elementos finales de la tarjeta. 
            aria-hidden oculta la flecha a los lectores de pantalla porque es solo decorativa */}
        <footer className="absolute bottom-4 right-6 text-blue-500 font-bold text-2xl" aria-hidden="true">
          →
        </footer>
        
      </a>
    </article>
  );
}