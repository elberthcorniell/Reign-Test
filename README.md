## REIGN Full Stack Test

### Inint project
  
  ```
  docker-compose build
  docker-compose up
  ```
  
  After this, the project should be runing at http://localhost, if docker isn't running at localhost then run;
  
  ```
  docker-machine ip
  ```
  The project should be runing at https://[returned ip]
  
### Backend Test
  
  ```
  docker exec -it reignserver bash
  npm test
  ```
