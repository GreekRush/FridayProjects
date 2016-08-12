# Node Powered Job Scheduling  
## • 2016-06-17 • [@carson-drake](https://github.com/carson-drake)

## Intro
A key part of creating automated systems is being able to schedule recurring tasks, and also 
to establish a task que. Cron jobs are often utilized for executing functions on a scheduled
bases, but there are some limitations to crons and they're also not always the best solution for 
handling all routines. I decided to explore an alternative scheduling solution that utilizes 
NodeJS.

## Resources
* [agenda](https://github.com/rschmukler/agenda)  
Agenda is a light-weight job scheduling library for Node.js. It uses a MongoDB connection to 
handle data persistence. This allows for multiple instances to work together as a network. Smaller 
instances can schedule tasks and run fast lightweight tasks, while larger instances can be
dedicated to more processor intensive tasks. It also allows you to spin up/down more instances
depending on schedule load.  

* [mongoLab](https://mlab.com/)  
`<Sales Pitch>`MongoLab makes it dead simple to get a small/free remote hosted mongoDB instance up and running
in minutes. `</Sales Pitch>`

* [agendash](https://github.com/joeframbach/agendash)
A "ready to go" GUI to connect to your agenda network. quick little open source project to help
keep track of scheduled tasks.

## Conclusion 
This is a **VERY** limited example but the concepts learned and implemented will be a great
starting point for any future automating projects I work with. 

## PS 
There's a missing `config.js` file that needs to be included for this to work. Thats where you store your 
MongoDB credentials. 