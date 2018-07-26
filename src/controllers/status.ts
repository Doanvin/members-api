import { Request, Response } from 'express';
import { Client } from 'pg';


export let members = (req: Request, res: Response) => {
    console.log('post body ', req.params);
    const query = req.params.q;
    const client = new Client();
    client.connect()
    .then( () => {
        console.log('connection completed $1', query);
        // query the database
        const sql = 'SELECT * FROM voting_list WHERE first_name ~* "^$1" UNION SELECT * FROM invalid_address WHERE first_name ~* "^$1" LIMIT 7;'
        const params = [query];
        client.query(sql, params);

    })
    .then( (result) => {
        console.log('result: ', result);
        res.send(result)
    })
    .catch(err => console.log(err))
    
}

export let memberId = (req: Request, res: Response) => {
    res.send('hi');
}

export let hi = (req: Request, res: Response) => {
    res.send('Response!!!');
}