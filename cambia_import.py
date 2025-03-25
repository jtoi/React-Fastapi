import os
import re

def update_imports(old_path, new_path, project_dir):
    # Recorre todos los archivos del directorio del proyecto
    for root, _, files in os.walk(project_dir):
        for file in files:
            if file.endswith(".py"):  # Solo procesa archivos Python
                file_path = os.path.join(root, file)
                
                with open(file_path, "r") as f:
                    content = f.read()
                
                # Actualiza las rutas de importación en el archivo
                updated_content = re.sub(re.escape(old_path), new_path, content)
                
                with open(file_path, "w") as f:
                    f.write(updated_content)
                
                print(f"Actualizado: {file_path}")

# Ejemplo de uso
old_import_path = "src.old_folder.old_file"
new_import_path = "src.new_folder.new_file"
project_directory = "./frontend/src"  # Ruta del directorio raíz del proyecto

update_imports(old_import_path, new_import_path, project_directory)
