import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class PgService {
  async runQuery(query): Promise<string> {
    const client = new Client({
      user: 'postgres',
      host: '127.0.0.1',
      database: 'postgres',
      // password: '1122',
      port: 5432,
    });

    await client.connect();
    const result = await client.query(query);
    await client.end();
    return result;
  }
}
