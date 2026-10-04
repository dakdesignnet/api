"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_entity_1 = require("./app.entity");
const defaultApps = [
    { id: 'chrome', title: 'Chrome', icon: './themes/Dak/apps/chrome.png', favourite: true, desktopShortcut: true, sortOrder: 0 },
    { id: 'invoice', title: 'Create Invoice', icon: './themes/Dak/apps/candy-fiesta.png', favourite: true, desktopShortcut: true, sortOrder: 1 },
    { id: 'typingkeyboard', title: 'Typing Keyboard', icon: './themes/Dak/apps/candy-fiesta.png', favourite: true, desktopShortcut: true, sortOrder: 2 },
    { id: 'nopbai', title: 'Nộp bài', icon: './themes/Dak/apps/candy-fiesta.png', favourite: true, desktopShortcut: true, sortOrder: 3 },
    { id: 'byd', title: 'Build Your Dream', icon: './themes/Dak/apps/cricket_gunda.png', appType: 'external', destination: 'https://byd.dak.edu.vn/', desktopShortcut: true, sortOrder: 4 },
    { id: 'cricket', title: 'Cricket', icon: './themes/Dak/apps/cricket_gunda.png', desktopShortcut: true, sortOrder: 5 },
    { id: 'tuanhoba', title: 'TuanHoba', icon: './themes/Dak/system/user-home.png', favourite: true, desktopShortcut: true, sortOrder: 6 },
    { id: 'vscode', title: 'Visual Studio Code', icon: './themes/Dak/apps/vscode.png', favourite: true, sortOrder: 7 },
    { id: 'terminal', title: 'Terminal', icon: './themes/Dak/apps/bash.png', favourite: true, sortOrder: 8 },
    { id: 'spotify', title: 'Spotify', icon: './themes/Dak/apps/spotify.png', favourite: true, sortOrder: 9 },
    { id: 'candy', title: 'Candy', icon: './themes/Dak/apps/candy-fiesta.png', favourite: true, desktopShortcut: true, sortOrder: 10 },
    { id: 'calc', title: 'Calculator', icon: './themes/Dak/apps/calc.png', favourite: true, sortOrder: 11 },
    { id: 'settings', title: 'Settings', icon: './themes/Dak/apps/gnome-control-center.png', favourite: true, sortOrder: 12 },
    { id: 'safari', title: 'Safari', icon: '', favourite: true, desktopShortcut: true, sortOrder: 13 },
    { id: 'edge', title: 'Microsoft Edge', icon: '', favourite: true, desktopShortcut: true, sortOrder: 14 },
    { id: 'youtube', title: 'YouTube', icon: '', favourite: true, desktopShortcut: true, sortOrder: 15 },
    { id: 'discord', title: 'Discord', icon: '', favourite: true, desktopShortcut: true, sortOrder: 16 },
    { id: 'copilot', title: 'Copilot', icon: '', favourite: true, sortOrder: 17 },
    { id: 'arcade', title: 'Dak Arcade', icon: '', favourite: true, desktopShortcut: true, sortOrder: 18 },
];
let AppsService = class AppsService {
    constructor(apps) {
        this.apps = apps;
    }
    async onModuleInit() {
        const existingApps = await this.apps.find({ select: { id: true } });
        const existingIds = new Set(existingApps.map((app) => app.id));
        const missingApps = defaultApps.filter((app) => !existingIds.has(app.id));
        if (missingApps.length) {
            await this.apps.save(missingApps.map((app) => this.apps.create(app)));
        }
        const dreamApp = await this.apps.findOneBy({ id: 'byd' });
        if (dreamApp) {
            let changed = false;
            if (!dreamApp.destination) {
                dreamApp.appType = 'external';
                dreamApp.destination = 'https://byd.dak.edu.vn/';
                changed = true;
            }
            if (dreamApp.title === 'Buid Dream') {
                dreamApp.title = 'Build Your Dream';
                changed = true;
            }
            if (changed)
                await this.apps.save(dreamApp);
        }
    }
    findAll(includeDisabled = false) {
        return this.apps.find({
            where: includeDisabled ? {} : { disabled: false },
            order: { sortOrder: 'ASC', id: 'ASC' },
        });
    }
    async findOne(id) {
        const app = await this.apps.findOneBy({ id });
        if (!app)
            throw new common_1.NotFoundException(`App "${id}" was not found`);
        return app;
    }
    async create(dto) {
        if (await this.apps.existsBy({ id: dto.id })) {
            throw new common_1.ConflictException(`App "${dto.id}" already exists`);
        }
        return this.apps.save(this.apps.create(dto));
    }
    async update(id, dto) {
        const app = await this.findOne(id);
        Object.assign(app, dto);
        return this.apps.save(app);
    }
    async remove(id) {
        const app = await this.findOne(id);
        await this.apps.remove(app);
        return { deleted: true, id };
    }
};
exports.AppsService = AppsService;
exports.AppsService = AppsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(app_entity_1.AppEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppsService);
//# sourceMappingURL=apps.service.js.map