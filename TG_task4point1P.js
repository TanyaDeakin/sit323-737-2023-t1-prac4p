//This is a simple calculator microservice with error handling and logging capabilities
//It has four endpoints, add, subtract, multiply and divide called using GET requests
//The endpoints take 2 numeric (float) operands as input query parameters - num1 and num2 

//Using Express to host localhost server
const { json } = require('express');
const express = require('express'); 
const app = express(); 
const fs = require('fs');


//importing Express to enable reading body data from the request
app.use(express.json());        
app.use(express.urlencoded());  


//using Winston library to add logging
const winston = require('winston');

//logs messages for calculator-microservice
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
      //logs messages at info level in console
      new winston.transports.Console({ format: winston.format.simple(), }),

      //logs messages of error level or lesser to error.log file
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),

      //logs messages of info level or lesser to combined.ḷog file
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });


//using port 3000 to listen to requests on 
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


// GET request for the home page
// home page path http://localhost:3000/
app.get('/', (req, res) => { 
  console.log('Home page requested');
  logger.info('Home page retrieved successfully');
  res.send("calculator-microservice - Home - successful GET request");
});


//functions for arithmetic operations

//addition
const add= (num1,num2) => {
  return num1+num2;
}

//subtrction
const subtract= (num1,num2) => {
  return num1-num2;
}

//multiplication
const multiply= (num1,num2) => {
  return num1*num2;
}

//division
const divide= (num1,num2) => {
  return num1/num2;
}


//to check for errors in the operands num1 and num2 (detects if an undefined input or NaN is sent)
//returns true if numbers are valid & false if NaN
const check = (num1,num2,req,res) => {
  var flag = false //false stands for numbers being invalid
  try{
    if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
    }
    if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
    }
    if (num1 === NaN || num2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
    }
    flag = true; //flag is set to true for valid numbers
    logger.info('Parameters '+num1+' and '+num2+' are valid numbers ');
    return flag;
    } catch(error) {
      logger.info('Arithmetic operation failed on '+num1+' and '+num2);    
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
      return flag
      }
}


//all the endpoints call check() function first to compute whether operands are valid or NaN
//after check() function returns true, then relevant arithmetic operation is done


//addition endpoint - GET http://localhost:3000/add?num1=1&num2=1
app.get("/add", (req, res) => {
  console.log('Add functionality requested');
  try{
    const num1= parseFloat(req.query.num1);
    const num2= parseFloat(req.query.num2);
    logger.info('Addition operation requested on '+num1+' and '+num2);
    const test = check(num1,num2,req,res);
    if(test == true) {
      const result = add(num1,num2);
      logger.info('Addition operation successful on '+num1+' and '+num2+ '. Result = '+result);
      res.status(200).json({statuscocde:200, data: result });
    } 
  } catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});


//endpoint for subtraction - GET http://localhost:3000/subtract?num1=1&num2=1
app.get("/subtract", (req, res) => {
  console.log('Subtract functionality requested');
  try{
    const num1= parseFloat(req.query.num1);
    const num2= parseFloat(req.query.num2);
    logger.info('Subtract operation requested on '+num1+' and '+num2);
    const test = check(num1,num2,req,res); 
    if(test == true) {
      const result = subtract(num1,num2);
      logger.info('Subtract operation successful on '+num1+' and '+num2+ '. Result = '+result);
      res.status(200).json({statuscocde:200, data: result });
    } 
  } catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});


//endpoint for multiplication - GET http://localhost:3000/multiply?num1=0&num2=1
app.get("/multiply", (req, res) => {
  console.log('Multiply functionality requested');
  try{
    const num1= parseFloat(req.query.num1);
    const num2= parseFloat(req.query.num2);
    logger.info('Multiply operation requested on '+num1+' and '+num2);
    const test = check(num1,num2,req,res);
    if(test == true) {
      const result = multiply(num1,num2);
      logger.info('Multiply operation successful on '+num1+' and '+num2+ '. Result = '+result);
      res.status(200).json({statuscocde:200, data: result });
    } 
  } catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});


//endpoint for division - GET http://localhost:3000/divide?num1=0&num2=1
app.get("/divide", (req, res) => {
  console.log('Divide functionality requested');
  try{
    const num1= parseFloat(req.query.num1);
    const num2= parseFloat(req.query.num2);
    logger.info('Divide operation requested on '+num1+' and '+num2);
    const test = check(num1,num2,req,res);
    if(test == true) {
      const result = divide(num1,num2);
      logger.info('Divide operation successful on '+num1+' and '+num2+ '. Result = '+result);
      res.status(200).json({statuscocde:200, data: result });
    } 
  } catch(error) { 
    console.error(error)
    res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});