export declare class CreateAppDto {
    id: string;
    title: string;
    icon?: string | null;
    appType?: 'internal' | 'external';
    destination?: string | null;
    disabled?: boolean;
    favourite?: boolean;
    desktopShortcut?: boolean;
    sortOrder?: number;
}
