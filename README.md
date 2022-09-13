# API Movil

Esta API tiene como objetivo consultar el esquema de notas record que permita crear, eliminar y visualizar las notas, protegiendo estas rutas con sistema de autenticación.

## Autenticación

Crea y evalua un token JWT para los usuarios.

### Iniciar Sesión

```http
    POST /api/user/login

BODY

{
    "mail": "test@mail.com",
    "password": "H0l4M3d0"
}
```

#### Respuesta Exitosa

```yml
status: 200
{
    "token": "token"
}
```

#### Errores

Caso en que no esté registrado el usuario o la contraseña sea invalida

```yml
status: 422
{
    "error": "Email o contraseña invalida"
}
```

Caso en que el no se esntregue un campo requerido o con validaciones

```yml
status: 412
{
    "success": false,
    "errors": [
        {
            "msg": "El campo es requerido.",
            "param": "campo",
            "location": "body"
        },
        {...}
    ]
}
```

### Registrar usuario

```http
    POST /api/user/signup

BODY

{
    "name": "test name",
    "mail": "test@mail.com",
    "password": "H0l4M3d0"
}
```

| Headers         | tipo     | Descripción             |
| :-------------- | :------- | :---------------------- |
| `authorization` | `string` | **Required**. Su token  |

#### Respuesta Exitosa

```yml
status: 200
{
    "user": {...}
}
```

#### Errores

Caso en que ya esté registrado el usuario

```yml
status: 422
{
    "error": "El usuario ya existe"
}
```

Caso en que el token esté vencido o no haya iniciado sesión 

```yml
status: 401
{
    "msg": "No tiene permisos"
}
```

Caso en que el no se esntregue un campo requerido o con validaciones

```yml
status: 412
{
    "success": false,
    "errors": [
        {
            "msg": "El campo es requerido.",
            "param": "campo",
            "location": "body"
        },
        {...}
    ]
}
```

## Nota

Gestiona las notas almacenados.

### Registrar de una nota

```http
    POST /api/notes/add

BODY

{
    "note":"testNote"
}
```

| Headers         | tipo     | Descripción             |
| :-------------- | :------- | :---------------------- |
| `authorization` | `string` | **Required**. Su token  |

#### Respuesta Exitosa

```yml
status: 200
{
    "note": {...}
}
```

#### Errores

Caso en que el token esté vencido o no haya iniciado sesión

```yml
status: 401
{
    "msg": "No tiene permisos"
}
```

Caso en que el no se esntregue un campo requerido o con validaciones

```yml
status: 412
{
    "success": false,
    "errors": [
        {
            "msg": "El campo es requerido.",
            "param": "campo",
            "location": "body"
        },
        {...}
    ]
}
```

### eliminar estado de cliente

```http
    POST /api/notes/delete/noteId

```

| Headers         | tipo     | Descripción             |
| :-------------- | :------- | :---------------------- |
| `authorization` | `string` | **Required**. Su token  |


| Parametros | tipo     | Descripción                      |
| :--------- | :------- | :------------------------------- |
| noteId  | `string` | **Required**. nota a eliminar |

#### Respuesta Exitosa

```yml
status: 200
{
    "msg": "Se eliminó la nota exitosamente"
}
```

#### Errores

Caso en que el token esté vencido o no haya iniciado sesión

```yml
status: 401
{
    "msg": "No tiene permisos"
}
```

Caso en que la nota no exista

```yml
status: 403
{
    "msg": "No se encontró lo nota"
}
```

### Consultar todas las notas

```http
    GET /api/notes/getPge
```

| Headers         | tipo     | Descripción            |
| :-------------- | :------- | :--------------------- |
| `authorization` | `string` | **Required**. Su token |

#### Respuesta Exitosa

```yml
status: 200
{
    "notes": [
        {...}
    ]
}
```

#### Errores

Caso en que el token esté vencido o no haya iniciado sesión

```yml
status: 401
{
    "msg": "No tiene permisos"
}
```

### Consultar cliente por id

```http
    GET /api/client/get/:noteId
```

| Headers         | tipo     | Descripción            |
| :-------------- | :------- | :--------------------- |
| `authorization` | `string` | **Required**. Su token |

| Parametros | tipo     | Descripción                      |
| :--------- | :------- | :------------------------------- |
| noteId  | `string` | **Required**. nota a buscar |

#### Respuesta Exitosa

```yml
status: 200
{
    "note": {...}
}
```

#### Errores

Caso en que el token esté vencido o no haya iniciado sesión

```yml
status: 401
{
    "msg": "No tiene permisos"
}
```

Caso en que la nota no exista

```yml
status: 403
{
    "msg": "No se encontró la nota"
}
```