import { Router } from "express";
 
import locationService from '../../services/locationService';
import { Container } from "typedi";
import auth from "../middlewares/auth";

export default (app:Router) => {

    app.get('/locations', async (req, res, next) => {
        const queryObj = req.query
        const serviceInstance = Container.get(locationService);
        let list =await serviceInstance.get(queryObj);
 		return res.json(list);
    })
    app.get('/locations/:id', async (req, res, next) => {
        const serviceInstance = Container.get(locationService);
        const id = req.params.id;
		const location = await serviceInstance.getById(id);
 		return res.json(location);
    })
    app.put('/locations', async (req, res, next) => {
        const serviceInstance = Container.get(locationService);
		await serviceInstance.update(req.body);
        console.log("finaliza db")
 		return res.status(200).send();
    })
    app.post('/locations', async (req, res, next) => {
        const serviceInstance = Container.get(locationService);
		const list = await serviceInstance.create(req.body);
 		return res.json(list);
    })
    app.delete('/locations/:id', async (req, res, next) => {
        const serviceInstance = Container.get(locationService);
        const id = req.params.id;
		const list = await serviceInstance.delete(id);
 		return res.json(list);
    })
    app.delete('/locations', async (req, res, next) => {
        const serviceInstance = Container.get(locationService);
        const ids = req.body.ids;
		await serviceInstance.deleteCollection(ids);
        return res.status(200).send();
    })

};