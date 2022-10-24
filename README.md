# PruebaNewShore

Este proyecto fue realizado con la versión 14.2.1 de Angular CLI
## Manera correcta de ejecución del proyecto

Para ejecutar el proyecto, se debe realizar la instalación de módulos con el comando `npm install` para luego ejecutarlo con el comando de Angular `ng serve -o` con el fin de desplegar automaticamente la vista de desarrollo. Todo esto navegando bajo la url de pruebas:  `http://localhost:4200/`

## Objetivos logrados

Se implementó solución a los 4 problemas planteados.

1 - Se hace el modelado de clases solicitado. 
2 - Se realiza el consumo de API con método de NGRX (manager state) tomando como API principal "Rutas multiples y de retorno".
3 - Se realizan validaciones en los campos de Origin y Destination y se hace visualización de las rutas posibles para el usuario.
4 - Se implementa por medio de un select la opción de escoger el tipo de moneda. Para este caso se trabajó con dólar, euro y peso colombiano.

## Dificultades

- No se logró implementar test de pruebas unitarias
- Se identificó un error al momento de realizar ciertas combinaciones de rutas. Debido a que no se logró hallar una validación adecuada, en su totalidad no está funcional.

## Herramientas sin utilizar

El uso de interceptores e inyection tokens no se vio necesaria de usar para este proyecto. 


