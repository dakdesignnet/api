import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { AppsService } from './apps.service';
export declare class AppsController {
    private readonly appsService;
    constructor(appsService: AppsService);
    findAll(includeDisabled?: string): Promise<import("./app.entity").AppEntity[]>;
    findOne(id: string): Promise<import("./app.entity").AppEntity>;
    create(dto: CreateAppDto): Promise<import("./app.entity").AppEntity>;
    update(id: string, dto: UpdateAppDto): Promise<import("./app.entity").AppEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
        id: string;
    }>;
}
