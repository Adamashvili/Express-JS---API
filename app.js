import express from "express"
import fs from "fs"
let app = express()
app.use(express.json())

let cars = JSON.parse(fs.readFileSync("./data/cars.json"));


// ?   GET Method
app.get("/api/allCars", (req, res) => {
    res.status(200).json({
        status: "success",
        count: cars.length,
        data: {
            cars: cars
        }

    })
})

// ?  POST Method

app.post("/api/allCars", (req, res) => {
    const newID = cars[cars.length - 1].id + 1;

    const newCar = Object.assign({id: newID}, req.body);
    cars.push(newCar);

    fs.writeFile("./data/cars.json", JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                cars: newCar
            }
        })
    })
    
})

const port = 3000;

app.listen(port, () =>
console.log("Server has Started..."))