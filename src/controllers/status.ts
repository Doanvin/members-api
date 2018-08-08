import { Request, Response } from 'express';
import { Client } from 'pg';
import * as Joi from 'joi';


export let members = (req: Request, res: Response) => {
    const query = { name: req.query['q'] };
    const schema = { name: Joi.string().regex(/^[a-z ,.'-]+$/i) };

    // validate user input
    const validation = Joi.validate(query, schema);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    // create new client
    const client = new Client();

    // connect to the db
    client.connect()
    .catch(err => res.status(500).send(`Error connecting to db! \n${err.stack}`));

    // assemble the db query
    const params = {
        text: `SELECT * FROM members WHERE first_name ~* '^${query.name}';`
    };

    // query the db
    client.query(params, (queryError, queryResult) => {
        if (queryError) {
            console.error(queryError.stack);
        } else {
            res.send(queryResult.rows);
        }

        // diconnect from the db
        client.end()
            .then(() => console.log('Client has disconnected'))
            .catch(err => console.error('Error during disconnection', err.stack));
    });
}

export let membersId = (req: Request, res: Response) => {
    console.log(req.body)
    const p = {
        ccid: req.body.ccid,
        fn: req.body.first_name,
        mn: req.body.middle_name,
        ln: req.body.last_name,
        sx: req.body.suffix,
        em: req.body.email,
        ad: req.body.address,
        ci: req.body.city,
        st: req.body.state,
        zc: req.body.zip_code
    };

    const schema = Joi.object().keys({
        ccid: Joi.string().alphanum().min(3).max(15).required(),
        em: Joi.string().email({ minDomainAtoms: 2 }).required(),
        ad: Joi.string().regex(/^[0-9 a-z ,.'-]+$/i).min(3).max(50).required(),
        ci: Joi.string().regex(/^[a-z ,.'-]+$/i).required(),
        st: Joi.string().regex(/^[a-z ,.'-]+$/i).required(),
        zc: Joi.number().min(1000).max(99999999999999).required()
    });

    // validate user input
    const validation = Joi.validate({ccid: p.ccid, em: p.em, ad: p.ad, ci: p.ci, st:p.st, zc:p.zc}, schema);
    if (validation.error) {
        return res.status(400).send(validation.error.details);
    }

    // create new client
    const client = new Client();

    // connect to the db
    client.connect()
    .catch(err => res.status(500).send(`Error connecting to db! \n${err.stack}`));

    // assemble the db query
    const params = {
        text: `INSERT INTO contact_info (ccid, email, address, city, state, zip_code)
               VALUES('${p.ccid}', '${p.em}', '${p.ad}', '${p.ci}', '${p.st}', ${p.zc})
               ON CONFLICT (ccid) DO UPDATE
               SET email='${p.em}', address='${p.ad}', city='${p.ci}', state='${p.st}', zip_code='${p.zc}';
               UPDATE SET valid_address`
    };

    // query the db
    client.query(params, (queryError, queryResult) => {
        if (queryError) {
            console.error(queryError.stack);
            res.status(500).send(queryError.stack);
        } else {
            res.send('Your address was successfully updated!');
        }

        // diconnect from the db
        client.end()
            .then(() => console.log('Client has disconnected'))
            .catch(err => console.error('Error during disconnection', err.stack));
    });
}

export let hi = (req: Request, res: Response) => {
    res.send('HI!!!!');
}