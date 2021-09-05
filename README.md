# facegnition - front-end

## **Sistema _Cloud_ de Identificación Automática de Personas Mediante Comparación Facial.**

<br/>

Este proyecto fue desarrollado como TFM del máster [Ciencia de Datos e Ingeniería de Datos en la Nube 2020-2021](http://www.cidaen.es/) de la Universidad de Castilla-La Mancha.

Se emplea el servicio de análisis de imágenes Rekognition, que permite realizar comparación facial contra rostros previamente registrados en el sistema.  Esta solución se podría aplicar en diversos escenarios, tales como: Registro de usuarios de un hotel, registro a un evento tipo conferencia, control de acceso a áreas restringidas, detección de intrusos, control horario en una empresa, etc.

Además, se ha utilizado el framework [serverless](https://serverless.com/) para definir y desplegar en la nube de AWS toda la infraestructura necesaria por el sistema. 

En este repositorio se mantiene el front-end del sistema y fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

La aplicación web `demo` está alojada en [http://facegnition.ddns.net](http://facegnition.ddns.net)

## Back-end.

Se puede ver el código back-end que del sistema en el repositorio de gitHub [facegnition-back-end](https://github.com/atomWeb/facegnition-back-end).
