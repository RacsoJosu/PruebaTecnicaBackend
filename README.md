# Descripción

La aplicación proporciona un único endpoint que permite calcular y comparar las primas anuales de seguro de vida entre dos aseguradoras. El cálculo se basa en la edad, el género, el hábito de fumar del asegurado y la suma asegurada.

## Instalación

1. Clonar el repositorio:

   ```sh
   git clone https://github.com/RacsoJosu/PruebaTecnicaBackend.git
   cd [nombre-de-carpeta-proyecto]
   ```

2. Instalar las dependencias:
   como dependencia nueva se agrego axios para las peticiones a la otra api
   `sh
    npm install
    `

3. Configurar las variables de entorno.

- API_URL=https://api-dev.medicatel.red/cotizar/vida/seguros_plus
- API_USERNAME=
- API_PASSWORD=

4. Iniciar el servidor:
   ```sh
   npm run start
   ```

## Uso

Para utilizar el servicio de comparación de seguros de vida, realizar una solicitud POST al endpoint `/comparator_service` con un cuerpo JSON que contenga la información requerida.

### Ejemplo de solicitud:

```json
POST /comparator_service
Content-Type: application/json

{
    "age":40,
    "gender":"F",
    "sumAssured":300000 ,
    "smoker":false
}

```

### Ejemplo de respuesta:

```json
{
  "statusCode": 200,
  "title": "Success",
  "message": "Success",
  "success": true,
  "data": {
    "inSureAnnualRate": 531,
    "seguroPlusAnnualRate": 1068,
    "message": "La mejor opción es InSure"
  }
}
```

## Endpoint

## POST /comparator_service

Este endpoint recibe la información del asegurado y retorna la comparación de las primas anuales entre las dos aseguradoras.

### Parámetros del cuerpo de la solicitud:

- age (número, requerido): La edad del asegurado (máximo 100 años).
- gender (cadena, requerido): El género del asegurado ("male" o "female").
- smoker (booleano, requerido): Indica si el asegurado es fumador (true o false).
- sumAssured (número, requerido): La suma asegurada.

### Respuestas:

- 200 OK: La comparación de las primas anuales se realizó exitosamente.
- 404 Not Found: No se encontró una tasa para la edad especificada.
- 401 Credenciales incorrectas: en el caso de que falle la peticion post a la otra api
- 400 Bad Request
- 500 Internal Server Error: Error en la solicitud a la API externa.
