import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
export declare class AppsService implements OnModuleInit {
    private readonly apps;
    constructor(apps: Repository<AppEntity>);
    onModuleInit(): Promise<void>;
    findAll(includeDisabled?: boolean): Promise<AppEntity[]>;
    findOne(id: string): Promise<AppEntity>;
    create(dto: CreateAppDto): Promise<AppEntity>;
    update(id: string, dto: UpdateAppDto): Promise<AppEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
        id: string;
    }>;
}
