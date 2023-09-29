import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create.client.dto';
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    return await this.clientService.createClient(createClientDto);
  }

  @Get()
  async getAllClients(): Promise<Client[]> {
    return await this.clientService.getAllClients();
  }

  @Get('/:id')
  async getClientById(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return await this.clientService.getClientById(id);
  }

  @Patch('/:id')
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: CreateClientDto,
  ): Promise<Client> {
    const client = await this.getClientById(id);
    return await this.clientService.updateClient(client, updateClientDto);
  }

  @Delete('/:id')
  async deleteClientById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.clientService.deleteClientById(id);
  }
}
