export interface Module {
    title: string;
    id: string;
    opened: boolean;
    submodules: Array<Submodule>;
}

export interface Submodule {
    name: string,
    id: string,
    uri: string,
    default: boolean,
    active: boolean
    role: string;
}

export const MODULES: Array<Module> = [
    {
        title: 'Administración',
        id: 'administration',
        submodules: [
            {
                name: 'Usuarios',
                id: 'users',
                uri: '/modules/users',
                default: false,
                role: 'ROLE_ADMIN',
                active: true
            },
            {
                name: 'Cuentas',
                id: 'accounts',
                uri: '/modules/accounts',
                default: false,
                role: 'ROLE_ADMIN',
                active: false
            },
            {
                name: 'Asignaciones',
                id: 'assignments',
                uri: '/modules/assignments',
                default: false,
                role: 'ROLE_ADMIN',
                active: false
            }
        ],
        opened: true
    },
    {
        title: 'Consultas',
        id: 'query',
        submodules: [
            {
                name: 'Consulta de Perfil',
                id: 'profile',
                uri: '/modules/profile',
                default: false,
                role: 'ROLE_ADMIN',
                active: false
            }
        ],
        opened: true
    }
];