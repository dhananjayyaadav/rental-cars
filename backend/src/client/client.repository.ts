import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create.client.dto';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const {
      address,
      dni,
      email,
      firstName,
      lastName,
      nationality,
      phoneNumber,
    } = createClientDto;
    const client = new Client();
    client.address = address;
    client.dni = dni;
    client.email = email;
    client.firstName = firstName;
    client.lastName = lastName;

    client.nationality = nationality;
    client.phoneNumber = phoneNumber;
    await client.save();
    return client;
  }

  async getAllClients(): Promise<Client[]> {
    const query = this.createQueryBuilder('Client');
    return query.getMany();
  }

  async updateClient(
    client: Client,
    updateClientDto: CreateClientDto,
  ): Promise<Client> {
    const {
      address,
      dni,
      email,
      firstName,
      lastName,
      nationality,
      phoneNumber,
    } = updateClientDto;

    client.address = address;
    client.dni = dni;
    client.email = email;
    client.firstName = firstName;
    client.lastName = lastName;
    client.nationality = nationality;
    client.phoneNumber = phoneNumber;
    await client.save();
    return client;
  }
}
