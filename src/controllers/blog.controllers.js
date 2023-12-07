import { getConnection } from "./../database/database";

const getPosts = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM blog");
        // Modificar los resultados para mostrar solo los primeros setenta caracteres de 'contenido'
        const posts = result.map(post => ({
            id: post.id,
            titulo: post.titulo,
            autor: post.autor,
            fecha_publicacion: post.fecha_publicacion,
            contenido: post.contenido.substring(0, 70) // Mostrar solo los primeros 70 caracteres
        }));

        res.json(posts);
        
        // res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

 const getPost = async (req, res) => {
     try {
         const { id } = req.params;
         const connection = await getConnection();
         const result = await connection.query("SELECT id, titulo, autor, fecha_publicacion, contenido FROM blog WHERE id = ?", id);
         
         if (result.length === 0) {
             res.status(404);
             res.json({ message: "No se encontró ningún elemento con el ID proporcionado." });
         } else {
             res.json(result);
         }
     } catch (error) {
         res.status(500);
         res.send(error.message);
     }
 };

 const addPost = async (req, res) => {
    try {
        const { titulo, autor, fecha_publicacion, contenido } = req.body;
        const errores = [];

        // Validacion de datos
        if (!titulo) {
            errores.push("El campo 'titulo' es requerido.");
        }
        if (!autor) {
            errores.push("El campo 'autor' es requerido.");
        }
        if (!fecha_publicacion) {
            errores.push("El campo 'fecha_publicacion' es requerido.");
        }
        if (!contenido) {
            errores.push("El campo 'contenido' es requerido.");
        }

        
        if (errores.length > 0) {
            res.status(400).json({ errores });
            return;
        }

        // Si no hay errores, procede con la inserción
        const post = { titulo, autor, fecha_publicacion, contenido };
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO blog SET ?", post);
        res.json({ message: "Agregado correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getBusqueda = async (req, res) => {
    try {
        const { terminoBusqueda } = req.params;
        const connection = await getConnection();

        
        const result = await connection.query(
            "SELECT id, titulo, autor, fecha_publicacion, contenido FROM blog WHERE titulo LIKE ? OR autor LIKE ? OR contenido LIKE ?",
            [`%${terminoBusqueda}%`, `%${terminoBusqueda}%`, `%${terminoBusqueda}%`]
        );

        // Comprueba si se encontraron resultados
        if (result.length === 0) {
            res.status(404);
            res.json({ message: "No se encontraron elementos que coincidan con el término de búsqueda." });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getPosts,
    getPost,
    addPost,
    getBusqueda
}