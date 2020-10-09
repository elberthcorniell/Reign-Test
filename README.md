## REIGN Full Stack Test

### Start project
  
  ```
  docker-compose build
  docker-compose up
  ```
  
  After this, the project should be runing at http://localhost, if docker isn't running at localhost then run;
  
  ```
  docker-machine ip
  ```
  The project should be runing at https://[returned ip]
  
  Remember to wait all components successfully started
  
### Backend Test
  
  ```
  docker exec -it reignserver bash
  npm test
  ```
